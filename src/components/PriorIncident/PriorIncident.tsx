import React from "react";
import {
    withRouter
} from "react-router-dom";
import PriorIncidentCompany from "./PriorIncidentCompany";
import PriorIncidentLocation from "./PriorIncidentLocation";
import {AddReportModal} from "../utils/AddReportModal"
import {ReportsModal} from "../utils/ReportsModal";

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
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
        return (
            <div>
                <h1>The Prior Incident Component</h1>
                <PriorIncidentCompany locationId={incident.location_id}/>
                <PriorIncidentLocation locationId={incident.location_id}/>
                <div>
                    <h3>{incident.date}</h3>
                </div>
                <AddReportModal reportedId={incident.id} reportType={"prior"}/>
                <ReportsModal reports={incident.reports} />
            </div>
        )
        }
    }
}

export default withRouter(PriorIncident) as PriorIncident;