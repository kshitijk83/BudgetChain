import React, { useReducer, useState } from "react";
import { Header, Form, Button, Input, Message } from "semantic-ui-react";
import clubs from "../ethereum/clubs";
import web3 from "../ethereum/web3";

const VENDOR_ADDRESS = "VENDOR_ADDRESS";
const VENDOR_NAME = "VENDOR_NAME";
const ORDER_NAME = "ORDER_NAME";
const ORDER_AMOUNT = "ORDER_AMOUNT";

const initialState = {
    vendorAddress: "",
    vendorName: "",
    orderName: "",
    orderAmount: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case VENDOR_ADDRESS:
            return { ...state, vendorAddress: action.value };
        case VENDOR_NAME:
            return { ...state, vendorName: action.value };
        case ORDER_NAME:
            return { ...state, orderName: action.value };
        case ORDER_AMOUNT:
            return { ...state, orderAmount: +action.value };

        default:
            throw Error("Unexpected Action");
    }
};

const AddOrder = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const onSubmitHandler = async () => {
        event.preventDefault();
        setErrMsg("");
        setLoading(true);
        try {
            const account = await web3.eth.getAccounts();
            let { vendorAddress, vendorName, orderName, orderAmount } = state;
            await clubs(props.clubAddress)
                .methods.addOrder(
                    vendorAddress,
                    vendorName,
                    orderName,
                    orderAmount
                )
                .send({
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
    return (
        <>
            <Header as="h1" style={{ textAlign: "center", fontSize: "3rem" }}>
                Add Order
            </Header>
            <Form onSubmit={onSubmitHandler}>
                <Form.Field>
                    <label>Vendor Name</label>
                    <Input
                        onChange={e =>
                            dispatch({
                                type: VENDOR_NAME,
                                value: e.target.value
                            })
                        }
                        placeholder="Vendor Name"
                    />
                </Form.Field>
                <Form.Field>
                    <label>Vendor Address</label>
                    <Input
                        onChange={e =>
                            dispatch({
                                type: VENDOR_ADDRESS,
                                value: e.target.value
                            })
                        }
                        placeholder="Vendor Address"
                    />
                </Form.Field>
                <Form.Field>
                    <label>Order Name</label>
                    <Input
                        onChange={e =>
                            dispatch({
                                type: ORDER_NAME,
                                value: e.target.value
                            })
                        }
                        placeholder="Order Name"
                    />
                </Form.Field>
                <Form.Field>
                    <label>Amount</label>
                    <Input
                        label="Wei"
                        labelPosition="right"
                        onChange={e =>
                            dispatch({
                                type: ORDER_AMOUNT,
                                value: e.target.value
                            })
                        }
                        placeholder="Amount"
                    />
                </Form.Field>
                <Button loading={loading} primary type="submit">
                    Add
                </Button>
            </Form>
            {errMsg ? (
                <Message
                    error={!!errMsg}
                    header="Error Occured"
                    content={errMsg}
                />
            ) : null}
        </>
    );
};

export default AddOrder;
