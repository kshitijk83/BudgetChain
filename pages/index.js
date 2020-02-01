import React from "react";
import { Grid, Card } from "semantic-ui-react";
import Layout from "../components/Layout";

const App = props => {
    return (
        <Layout>
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Card.Header>Manager panel</Card.Header>
                                <Card.Meta>
                                    <span className="date">Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description>
                                    Matthew is a musician living in Nashville.
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
};

export default App;
