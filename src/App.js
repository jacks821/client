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
import ListCompanies from "./components/Company/listCompanies";
import Company from "./components/Company/Company"
import Header from "./components/utils/header";
import Footer from "./components/utils/footer";
import Location from "./components/Location/Location";
import PriorIncident from "./components/PriorIncident/PriorIncident"
import External from "./components/utils/External"


const App = () => {

  return (
    <Box mb={20}>
    <Header siteTitle={"PriorIncidents"} />
            <Router>
            <Box 
                px={4}
                py={6}
                backgroundSize={'cover'}
                color={'#142850'}
                backgroundColor={'#FFFFFF'}
                margin={0}
                width={"100vw"}
                padding={0}
            >
                    <Switch>
                        <Route path="/external" component={External}/>
                        <Route path="/about">
                            <About />
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
