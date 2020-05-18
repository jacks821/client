import React from "react";
import {
    withRouter,
} from "react-router-dom";
import {Box, Text} from "@chakra-ui/core"
import {LocationListItem} from "../utils/LocationList"
import { AddLocationModal } from "../utils/AddLocationModal";

interface CompanyProps {
    match: any,
}

interface CompanyState {
    error: any,
    isLoaded: boolean,
    company: any,
}

class Company extends React.Component<CompanyProps, CompanyState> {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          company: null
        };
      }

      componentDidMount() {
        let id = this.props.match.params.id;
        fetch(`/companies/${id}`)
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

    render () {
        let {error, isLoaded, company} = this.state;
        if (error) {
            return <Box>Error: {error.message}</Box>;
        } else if (!isLoaded) {
            return <Box>Loading...</Box>
        } else {
            let locationItems;
            let locationsByState = {};
            if (company.locations == null) {
                locationItems = <Text fontSize="xl">This Company has no Locations.  Add a location below</Text>
            } else {
                company.locations.map(location => {
                    if (!locationsByState[location.state]) {
                        locationsByState[location.state] = [location]
                        return true
                    } else {
                        locationsByState[location.state].push(location)
                        return true
                    }
                });
                locationItems = Object.keys(locationsByState).sort().map(key =>
                    <LocationListItem state={key} locations={locationsByState[key]} companyName={company.name}/>

                )
            }
        return (
                <Box maxW="xl" mx="auto" textAlign="center">
                    <Text fontSize="xl">{company.name}</Text>
                    <Box>
                        <Text fontSize="l"> Here are {company.name} Locations </Text>
                        <Box>
                            {locationItems}
                        </Box>
                    </Box>
                    <Box>
                        <AddLocationModal companyId={company.id} />
                    </Box>
                </Box>
            )
        }
    }
}

export default withRouter(Company) as Company;