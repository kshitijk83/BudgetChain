import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Header, Form, Button, Message } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
// import ClubDetails from "./ClubDetails";

const EnterClub = props => {
    const [input, setInput] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [validAddress, setValidAddress] = useState(false);
    const [loading, setLoading] = useState(false);

    const enterClubHandler = async event => {
        event.preventDefault();
        setErrMsg("");
        setLoading(true);
        try {
            let isValidAddress = await web3.utils.isAddress(input);
            if (isValidAddress) {
                setValidAddress(true);
            } else {
                throw new Error("Invalid Address");
            }
            setLoading(false);
            Router.pushRoute(`/club/${input}`);
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
            <Container>
                <Header as="h1">Enter Club Address</Header>
                <Form onSubmit={enterClubHandler}>
                    <Form.Input
                        disabled={loading}
                        value={input}
                        placeholder="Club Address"
                        onChange={event => setInput(event.target.value)}
                    />
                    <Button loading={loading} primary type="submit">
                        Enter
                    </Button>
                </Form>
                {errMsg ? (
                    <Message
                        error={!!errMsg}
                        header="Error Occured"
                        content={errMsg}
                    />
                ) : null}
            </Container>
        </Layout>
    );
};

export default EnterClub;
