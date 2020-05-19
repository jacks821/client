import React from "react";
import {Box, Text} from "@chakra-ui/core"

interface PriorIncidentCompanyProps {
    locationId: any,
}
interface PriorIncidentCompanyState {
    error: any,
    isLoaded: boolean,
    company: any,
}

class PriorIncidentCompany extends React.Component<PriorIncidentCompanyProps, PriorIncidentCompanyState> {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          company: null
        };
      }

      componentDidMount() {
        let id = this.props.locationId;
        fetch(process.env.PUBLIC_ENDPOINT + `/company/location=${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        company: result
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
        let {error, isLoaded, company} = this.state;
        if (error) {
            return <Box>Error: {error.message}</Box>;
        } else if (!isLoaded) {
            return <Box>Loading...</Box>
        } else {
            return (
                <Text fontSize="xl">{company.name}</Text>
            )
        }
    }
}

export default PriorIncidentCompany;