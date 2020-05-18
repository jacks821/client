import React from "react";
import {Box, Text} from "@chakra-ui/core";
import {Link, withRouter} from "react-router-dom";
import {Container} from "../utils/Container"
import { AddCompanyModal } from "../utils/AddCompanyModal";

interface ListCompaniesProps {
    match: any,
}

interface ListCompaniesState {
    error: any,
    isLoaded: boolean,
    companies: any,
}

class ListCompanies extends React.Component<ListCompaniesProps, ListCompaniesState> {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          companies: []
        };
      }

    componentDidMount() {
        fetch("/companies")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        companies: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error});
                }
            )
    }
    render() {
        let {error, isLoaded, companies} = this.state;
        if (error) {
            return <Box>Error: {error.message}</Box>;
        } else if (!isLoaded) {
            return <Box>Loading...</Box>
        } else {
            return (
                <Box>
                    <Box color="#142850">
                        <Container>
                            <Box maxW="xl" mx="auto" textAlign="center">
                                <Box>
                                    {companies.map(company => (
                                        <Text fontSize="lg" key={company.id}>
                                            <Link to={{
                                        pathname: `/company/${company.id}`,
                                        }
                                    } id={company.id}>{company.name}</Link>
                                        </Text>
                                    ))}
                                    <AddCompanyModal/>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            );
        }

    }
}

export default withRouter(ListCompanies) as ListCompanies;