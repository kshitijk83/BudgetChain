import React from "react";
import { Button, Card, Grid, Label, Header } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link } from "../../routes";
import manager from "../../ethereum/manager";

const Manager = props => {
    const { clubs } = props;
    const clubsComponent = clubs.map((item, i) => {
        return {
            header: "Club Address",
            description: item,
            style: { overflowWrap: "break-word" },
            href: `/manager/club/${item}?index=${i}`
        };
    });

    return (
        <Layout>
            <Grid columns={2} style={{ margin: "3rem 0" }}>
                <Grid.Row>
                    <Grid.Column>
                        <Card.Group items={clubsComponent} />
                    </Grid.Column>
                    <Grid.Column>
                        <Header as="h4">Manager Address:</Header>
                        {props.budgetManager}
                        <Link route="/manager/createClub">
                            <Button style={{ margin: "1rem 0" }} fluid primary>
                                Create Club
                            </Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
};

Manager.getInitialProps = async () => {
    const clubs = await manager.methods.getAllClubs().call();
    const budgetManager = await manager.methods.manager().call();
    return { clubs, budgetManager };
};

export default Manager;
