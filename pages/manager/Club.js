import React, { useState } from "react";
import Layout from "../../components/Layout";
import Clubs from "../../ethereum/clubs";
import manager from "../../ethereum/manager";
import web3 from "../../ethereum/web3";
import { Form, Input, Button, Grid, Header, Message } from "semantic-ui-react";

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
                        <Header as="h3">Balance</Header>
                        <Header as="h1" style={{ fontSize: "4rem" }}>
                            {web3.utils.fromWei(props.balance, "ether")}
                        </Header>
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
    const clubs = Clubs(clubAddress);
    const balance = await clubs.methods.getBalance().call();
    console.log(balance);
    return { clubAddress, balance, clubIndex };
};

export default Club;
