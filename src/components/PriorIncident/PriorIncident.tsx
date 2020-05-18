import React from "react";
import {
    withRouter
} from "react-router-dom";
import PriorIncidentCompany from "./PriorIncidentCompany";
import PriorIncidentLocation from "./PriorIncidentLocation";
import {AddReportModal} from "../utils/AddReportModal"
import {ReportsModal} from "../utils/ReportsModal";
import {Box, Text} from "@chakra-ui/core"

interface PriorIncidentProps {
    match: any,
}

interface PriorIncidentState {
    error: any,
    isLoaded: boolean,
    incident: any,
}

export class PriorIncident extends React.Component<PriorIncidentProps, PriorIncidentState> {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          incident: null
        };
      }

      componentDidMount() {
        let id = this.props.match.params.id;
        fetch(`/companies/location/priorIncident/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        incident: result
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
        let {error, isLoaded, incident} = this.state;
        if (error) {
            return <Box>Error: {error.message}</Box>;
        } else if (!isLoaded) {
            return <Box>Loading...</Box>
        } else {
        return (
            <Box textAlign="center">
                <Text fontSize="xl">The Prior Incident Component</Text>
                <PriorIncidentCompany locationId={incident.location_id}/>
                <PriorIncidentLocation locationId={incident.location_id}/>
                <Box>
                    <Text fontSize="l">{incident.date}</Text>
                </Box>
                <AddReportModal reportedId={incident.id} reportType={"prior"}/>
                <ReportsModal reports={incident.reports} />
            </Box>
        )
        }
    }
}

export default withRouter(PriorIncident) as PriorIncident;