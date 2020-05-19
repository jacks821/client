import React from "react";
import {Box, Text} from "@chakra-ui/core"

interface PriorIncidentLocationProps {
    locationId: any,
}
interface PriorIncidentLocationState {
    error: any,
    isLoaded: boolean,
    location: any,
}

class PriorIncidentLocation extends React.Component<PriorIncidentLocationProps, PriorIncidentLocationState> {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          location: null
        };
      }

    componentDidMount() {
        const locationId = this.props.locationId;
        fetch(`/companies/location/${locationId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        location: result
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
        let {error, isLoaded, location} = this.state;
        if (error) {
            return <Box>Error: {error.message}</Box>;
        } else if (!isLoaded) {
            return <Box>Loading...</Box>
        } else {
            return <Text>Store Number: {location.store_number}<br/>{location.street_number} {location.street} <br/> {location.city}, {location.state} {location.zip_code} <br/> Number of Incidents at Location: {location.prior_incidents.length}</Text>;
        }
    }
}

export default PriorIncidentLocation;