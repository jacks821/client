import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Box} from "@chakra-ui/core";

import Home from "./Home/home"
import About from "./About/about";
import CreateCompany from "./Company/createCompany";
import ListCompanies from "./Company/listCompanies";
import Company from "./Company/Company"
import Layout from "./utils/layout";
import Location from "./Location/Location";
import PriorIncident from "./PriorIncident/PriorIncident";

export default class PriorIncidents extends React.Component {

    render () {
        const { drizzle, drizzleState } = this.props;
        return(
        <Layout>
            <Router>
            <Box 
                px={4}
                py={6}
                backgroundSize={'cover'}
                color={'black'}
                backgroundColor={'#fff5f5'}
                h={'100vh'}
                w={'100vw'}
                margin={0}
                padding={0}
                position={'fixed'}
            >
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/addCompany">
                            <CreateCompany drizzle={drizzle} drizzleState={drizzleState}/>
                        </Route>
                        <Route path="/listCompanies">
                            <ListCompanies drizzle={drizzle} drizzleState={drizzleState}/>
                        </Route>
                        <Route path="/company/:id">
                            <Company drizzle={drizzle} drizzleState={drizzleState}/>
                        </Route>
                        <Route path="/location/:id">
                            <Location drizzle={drizzle} drizzleState={drizzleState}/>
                        </Route>
                        <Route path="/priorIncident/:id">
                            <PriorIncident drizzle={drizzle} drizzleState={drizzleState}/>
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Box>
            </Router>
        </Layout>
        )
    }
}