import React from "react";
import { Grid, Card, Image } from "semantic-ui-react";
import { Link } from "../routes";
import Layout from "../components/Layout";
// import managerImg from "../images/manager.png";
// import clubImg from "../images/club.png";

const items = [
    {
        header: "Manager panel",
        description: "Manager Panel to distribute eth along clubs."
    },
    {
        header: "Clubs panel",
        description: "Club Panel to buy products from vendor shops."
    }
];

const App = props => {
    return (
        <Layout>
            {/* <Card.Group centered items={items} /> */}
            <Grid columns={2}>
                <Grid.Row style={{ margin: "8rem 0" }} stretched>
                    <Grid.Column>
                        <Link route="/manager">
                            <Card>
                                {/* <Image src={managerImg} wrapped ui={false} /> */}
                                <Card.Content>
                                    <Card.Header>Manager panel</Card.Header>
                                    <Card.Description>
                                        Manager Panel to distribute eth along
                                        clubs.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Link>
                    </Grid.Column>
                    <Grid.Column>
                        <Link route="/club">
                            <Card>
                                {/* <Image src={clubImg} wrapped ui={false} /> */}
                                <Card.Content>
                                    <Card.Header>Clubs panel</Card.Header>
                                    <Card.Description>
                                        Club Panel to buy products from vendor
                                        shops.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
};

export default App;
