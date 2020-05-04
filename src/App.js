import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Box} from "@chakra-ui/core";

import Home from "./components/Home/home"
import About from "./components/About/about";
import CreateCompany from "./components/Company/createCompany";
import ListCompanies from "./components/Company/listCompanies";
import Company from "./components/Company/Company"
import Header from "./components/utils/header";
import Footer from "./components/utils/footer";
import Location from "./components/Location/Location";
import PriorIncident from "./components/PriorIncident/PriorIncident"


const App = () => {

  return (
    <Box>
    <Header siteTitle={"PriorIncidents"} />
            <Router>
            <Box 
                px={4}
                py={6}
                backgroundSize={'cover'}
                color={'#142850'}
                backgroundColor={'#FFFFFF'}
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
                            <CreateCompany />
                        </Route>
                        <Route path="/listCompanies">
                            <ListCompanies />
                        </Route>
                        <Route path="/company/:id">
                            <Company />
                        </Route>
                        <Route path="/location/:id">
                            <Location />
                        </Route>
                        <Route path="/priorIncident/:id">
                            <PriorIncident />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                    <Box>
                        <Footer />
                    </Box>
                </Box>
            </Router>
    </Box>
  );
}

export default App;
