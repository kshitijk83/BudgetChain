import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import clubs from "../ethereum/clubs";

const TableContainer = props => {
    const [orderCount, setOrderCount] = useState(0);
    const [orders, setOrders] = useState([{}]);
    const tableRows = orders
        ? orders.map((item, i) => {
              return (
                  <Table.Row disabled={item._paid} key={i}>
                      <Table.Cell>{item._vendorName}</Table.Cell>
                      <Table.Cell>{item._orderName}</Table.Cell>
                      <Table.Cell>{item._orderAmount}</Table.Cell>
                      <Table.Cell center="true" aligned="true">
                          <Button
                              loading={loading}
                              disabled={item._paid}
                              onClick={() => props.pay(item._venderAddress, i)}
                              primary
                              type="submit"
                          >
                              {item._paid ? "Paid" : "Pay"}
                          </Button>
                      </Table.Cell>
                  </Table.Row>
              );
          })
        : null;

    useEffect(async () => {
        const Clubs = clubs(props.clubAddress);
        const orderCount = await Clubs.methods.getOrderCount().call();
        const orders = await Promise.all(
            Array(parseInt(orderCount))
                .fill()
                .map((el, index) => Clubs.methods.getOrder(index).call())
        );
        setOrderCount(orderCount);
        setOrders(orders);
    }, []);

    return (
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
    );
};

export default TableContainer;
