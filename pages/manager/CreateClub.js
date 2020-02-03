import React, { useState } from "react";
import { Button, Form, Input, Message, Icon } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import Layout from "../../components/Layout";
import { Link, Router } from "../../routes";

import manager from "../../ethereum/manager";
const CreateClub = props => {
    const [presidentAddress, setPresidentAddress] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async event => {
        event.preventDefault();
        setErrMsg("");
        setLoading(true);
        const accounts = await web3.eth.getAccounts();
        try {
            await manager.methods.createClub(presidentAddress).send({
                from: accounts[0]
            });
            setLoading(false);
            Router.pushRoute(`/manager/`);
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
            <Form error={!!errMsg}>
                <Form.Field>
                    <label>President Address</label>
                    <Input
                        onChange={event =>
                            setPresidentAddress(event.target.value)
                        }
                        placeholder="President"
                    />
                </Form.Field>
                {errMsg ? (
                    <Message
                        error={!!errMsg}
                        header="Error Occured"
                        content={errMsg}
                    />
                ) : null}
                <Button onClick={submitHandler} type="submit">
                    Submit
                </Button>
            </Form>
            {loading ? (
                <Message icon>
                    <Icon name="circle notched" loading={loading} />
                    <Message.Content>
                        <Message.Header>Wait for 15s</Message.Header>
                        transactioon is being mined
                    </Message.Content>
                </Message>
            ) : null}
        </Layout>
    );
};

export default CreateClub;
