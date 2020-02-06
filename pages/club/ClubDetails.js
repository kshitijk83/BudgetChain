import React, { useState } from "react";
import Layout from "../../components/Layout";
import clubs from "../../ethereum/clubs";
import web3 from "../../ethereum/web3";
import { Grid, Table, Header, Button, Form, Message } from "semantic-ui-react";
import AddOrder from "../../components/AddOrder";

const ClubDetails = props => {
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const payHandler = async (vendorAddress, index) => {
        setErrMsg("");
        setLoading(true);
        const Club = clubs(props.clubAddress);
        try {
            const account = await web3.eth.getAccounts();
            await Club.methods.sendOrder(index).send({
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
            <Table.Row disabled={item._paid} key={i}>
                <Table.Cell>{item._vendorName}</Table.Cell>
                <Table.Cell>{item._orderName}</Table.Cell>
                <Table.Cell>{item._orderAmount}</Table.Cell>
                <Table.Cell center="true" aligned="true">
                    {item._accepted ? (
                        <Button
                            loading={loading}
                            disabled={item._paid}
                            onClick={() => payHandler(item._venderAddress, i)}
                            primary
                            type="submit"
                        >
                            {item._paid ? "Paid" : "Pay"}
                        </Button>
                    ) : (
                        "manager persmission required"
                    )}
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <Layout>
            <Header as="h2">President: {props.president}</Header>
            <Header as="h2">Balance: {props.balance}</Header>
            <Grid columns={2} style={{ margin: "4rem 0" }} divided>
                <Grid.Column>
                    <Header
                        as="h1"
                        style={{ textAlign: "center", fontSize: "3rem" }}
                    >
                        Orders
                    </Header>
                    {errMsg ? (
                        <Message
                            error={!!errMsg}
                            header="Error Occured"
                            content={errMsg}
                        />
                    ) : null}
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Vendor Name</Table.HeaderCell>
                                <Table.HeaderCell>Order Name</Table.HeaderCell>
                                <Table.HeaderCell>Amount</Table.HeaderCell>
                                <Table.HeaderCell>Send Order</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>{tableRows}</Table.Body>
                    </Table>
                </Grid.Column>
                <Grid.Column>
                    <AddOrder clubAddress={props.clubAddress} />
                </Grid.Column>
            </Grid>
        </Layout>
    );
};

ClubDetails.getInitialProps = async props => {
    const clubAddress = props.query.clubAddress;
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
        president,
        orders
    };
};

export default ClubDetails;
