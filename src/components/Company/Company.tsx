import React from "react";
import {
    withRouter,
} from "react-router-dom";
import {Box} from "@chakra-ui/core"
import CreateLocation from "./createLocation"
import {LocationListItem} from "../utils/LocationList"

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
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            let locationItems;
            let locationsByState = {};
            if (company.locations == null) {
                locationItems = <h2>This Company has no Locations.  Add a location below</h2>
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
                locationItems = Object.keys(locationsByState).map(key => 
                    <LocationListItem state={key} locations={locationsByState[key]}/>

                )
            }
        return (
                <Box maxW="xl" mx="auto" textAlign="center">
                    <h1>{company.name}</h1>
                    <div>
                        <h1> Here are {company.name} Locations </h1>
                        <ul>
                            {locationItems}
                        </ul>
                    </div>
                    <div>
                        <CreateLocation companyId={company.id} />
                    </div>
                </Box>
            )
        }
    }
}

export default withRouter(Company) as Company;