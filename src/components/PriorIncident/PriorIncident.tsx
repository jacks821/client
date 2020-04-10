import React from "react";
import {
    withRouter
} from "react-router-dom";
import PriorIncidentCompany from "./PriorIncidentCompany";
import PriorIncidentLocation from "./PriorIncidentLocation";
import PriorIncidentDisplay from "./PriorIncidentDisplay";

interface PriorIncidentProps {
    drizzle: any,
    drizzleState: any,
    match: any,
}

export class PriorIncident extends React.Component<PriorIncidentProps> {
    render() {
        return (
            <div>
                <h1>The Prior Incident Component</h1>
                <PriorIncidentCompany drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} priorIncidentId={this.props.match.params.id}/>
                <PriorIncidentLocation drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} priorIncidentId={this.props.match.params.id}/>
                <div>
                    <PriorIncidentDisplay drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} priorIncidentId={this.props.match.params.id}/>
                </div>
            </div>
        )
    }
}

export default withRouter(PriorIncident) as PriorIncident;