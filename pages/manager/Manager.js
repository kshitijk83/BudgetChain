import React from "react";
import { Button, Card } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link } from "../../routes";
import manager from "../../ethereum/manager";

const Manager = props => {
    const { clubs } = props;
    const clubsComponent = clubs.map((item, i) => {
        return {
            header: "Club Address",
            description: item,
            style: { overflowWrap: "break-word" }
        };
    });
    // console.log(clubsComponent);
    return (
        <Layout>
            <Link route="/manager/createClub">
                <Button>Create Club</Button>
            </Link>
            Manager: {props.budgetManager}
            <Card.Group items={clubsComponent} />
        </Layout>
    );
};

Manager.getInitialProps = async () => {
    const clubs = await manager.methods.getAllClubs().call();
    const budgetManager = await manager.methods.manager().call();
    return { clubs, budgetManager };
};

export default Manager;
