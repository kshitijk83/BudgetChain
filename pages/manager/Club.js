import React, { useState } from "react";
import Layout from "../../components/Layout";
import clubs from "../../ethereum/clubs";
import manager from "../../ethereum/manager";
import web3 from "../../ethereum/web3";
import {
    Form,
    Input,
    Button,
    Grid,
    Header,
    Message,
    Table
} from "semantic-ui-react";

const Club = props => {
    const [sendEth, setSendEth] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const sendEthHandler = async () => {
        setErrMsg("");
        setLoading(true);
        try {
            const accounts = await web3.eth.getAccounts();
            await manager.methods.sendEth(props.clubIndex).send({
                from: accounts[0],
                value: web3.utils.toWei(sendEth, "ether")
            });
            setLoading(false);
            setSendEth("");
        } catch (err) {
            setLoading(false);
            setErrMsg(err.message);
            const clear = setTimeout(() => {
                setErrMsg("");
            }, 2000);
        }
    };

    const acceptHandler = async index => {
        setErrMsg("");
        setLoading(true);
        const Club = clubs(props.clubAddress);
        try {
            const account = await web3.eth.getAccounts();
            await Club.methods.acceptOrder(index).send({
                from: account[0]
            });
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setErrMsg(err.message);
            const clear = setTimeout(() => {
                setErrMsg("");
            }, 2000);
        }
    };
    const tableRows = props.orders.map((item, i) => {
        return (
            <Table.Row disabled={item._accepted} key={i}>
                <Table.Cell>{item._vendorName}</Table.Cell>
                <Table.Cell>{item._orderName}</Table.Cell>
                <Table.Cell>{item._orderAmount}</Table.Cell>
                <Table.Cell center="true" aligned="true">
                    <Button
                        loading={loading}
                        disabled={item._paid}
                        onClick={() => acceptHandler(i)}
                        primary
                        type="submit"
                    >
                        {item._accepted ? "Accepted" : "Accept Order"}
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <Layout>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column"
                        }}
                    >
                        <Header as="h3">Balance (ether)</Header>
                        <Header as="h1" style={{ fontSize: "4rem" }}>
                            {props.balance}
                        </Header>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        Vendor Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Order Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Amount</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Send Order
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>{tableRows}</Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                        <Form onSubmit={sendEthHandler}>
                            <Form.Field>
                                <Header as="h3">
                                    Send Ether To Club: {props.clubAddress}
                                </Header>
                                <Input
                                    label="Ether"
                                    labelPosition="right"
                                    value={sendEth}
                                    onChange={event =>
                                        setSendEth(event.target.value)
                                    }
                                />
                            </Form.Field>
                            <Button loading={loading} primary type="submit">
                                Send Ether
                            </Button>
                        </Form>
                        {errMsg ? (
                            <Message
                                error={!!errMsg}
                                header="Error Occured"
                                content={errMsg}
                            />
                        ) : null}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
};

Club.getInitialProps = async props => {
    const clubAddress = props.query.clubAddress;
    const clubIndex = +props.query.index;
    const Clubs = clubs(clubAddress);
    const [balance, orderCount, president] = await Promise.all([
        Clubs.methods.getBalance().call(),
        Clubs.methods.getOrderCount().call(),
        Clubs.methods.president().call()
    ]);
    const orders = await Promise.all(
        Array(parseInt(orderCount))
            .fill()
            .map((el, index) => Clubs.methods.getOrder(index).call())
    );
    return {
        clubAddress,
        balance: web3.utils.fromWei(balance, "ether"),
        orderCount,
        clubIndex,
        president,
        orders
    };
};

export default Club;
