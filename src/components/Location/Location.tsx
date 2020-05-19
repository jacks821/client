import React from "react";
import {
    Link,
    withRouter
} from "react-router-dom";
import {
    Box,
    Text,
} from "@chakra-ui/core";
import moment from "moment"
import {AddPriorIncidentModal} from "../utils/AddPriorIncidentModal"
import {AddReportModal} from "../utils/AddReportModal"
import {ReportsModal} from "../utils/ReportsModal";

interface LocationProps {
    match: any,
    location: any,
}

interface LocationState {
    error: any,
    isLoaded: boolean,
    location: any,
    companyName: any,
}


class Location extends React.Component<LocationProps, LocationState> {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          location: null,
          companyName: this.props.location.state.companyName,
        };
      }

      componentDidMount() {
        let id = this.props.match.params.id;
        fetch(`/companies/location/${id}`)
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
        let {error, isLoaded, location, companyName} = this.state;
        if (error) {
            return <Box>Error: {error.message}</Box>;
        } else if (!isLoaded) {
            return <Box>Loading...</Box>
        } else {
            let priorIncidentItems;
            if (location.prior_incidents == null) {
                priorIncidentItems = <Text fontSize={"3xl"}>This Location has no Prior Incidents.  Add an Incident below</Text>
            } else {
                priorIncidentItems = location.prior_incidents.map((pi, index) =>
                    <Text fontSize={"xl"} key={index}>
                        <Link to={{
                            pathname: `/priorincident/${pi.id}`,
                        }
                    } id={pi.id} key={pi.id} style={{color: "#00909E", textDecoration: "none"}}>
                        {moment(pi.date).add(1, "day").format('M/D/YYYY')}
                        </Link>
                    </Text>
                )
            }

        return (
            <Box textAlign="center">
                <Text fontSize="2xl" color="#142850">{companyName} Location Number: {location.store_number}</Text>
                <Text fontSize="l" color="#142850">{location.street_number} {location.street} <br/> {location.city}, {location.state} {location.zip_code}</Text>

                <Box>
                    <Text fontSize="xl" color="#142850"> List of Incidents </Text>
                </Box>
                <Box>
                    {priorIncidentItems}
                </Box>
                <Box>
                    <AddPriorIncidentModal locationId={location.id} />
                </Box>
                <Box>
                    <AddReportModal reportedId={location.id} reportType={"location"}/>
                </Box>
                <Box>
                    <ReportsModal reports={location.reports}/>
                </Box>
                
            </Box>
        )};        
    }
 }


export default withRouter(Location) as Location;