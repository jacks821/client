import React from "react";
import PriorIncidentListItem from "./PriorIncidentListItem";

interface PriorIncidentListProps {
    drizzle: any,
    drizzleState: any,
    locationId: any,
}
interface PriorIncidentState {
    dataKey: any,
}

class PriorIncidentsList extends React.Component<PriorIncidentListProps, PriorIncidentState> {
    state = { dataKey: "None"};

    componentDidMount() {
        const drizzle= this.props.drizzle;
        const contract = drizzle.contracts.PriorIncidents;
        const id = this.props.locationId;
        const dataKey = contract.methods["getPriorIncidentsByLocation"].cacheCall(id);
        this.setState({dataKey})
    }

    render() {
        const {PriorIncidents} = this.props.drizzleState.contracts;
        const priorIncidentIndices = PriorIncidents.getPriorIncidentsByLocation[this.state.dataKey];
        if (priorIncidentIndices) {
            if (priorIncidentIndices.value.length === 0) {
                return (
                    <div>
                        <p>No Prior Incidents</p>
                    </div>
                )
            }
            console.log(priorIncidentIndices.value)
            const priorIncidentList = priorIncidentIndices.value.map((pi, index) =>
                <PriorIncidentListItem drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} id={pi} locationId={this.props.locationId}/>
            )
            return (
                <div>
                    <div>
                      <h1> List Prior Incidents </h1>
                        <ul>
                            {priorIncidentList}
                        </ul>
                      </div>
                </div>
            )
        }
        return (
            <div>
                <p>Could Not Find Prior Incidents</p>
            </div>
        )
    }
}

export default PriorIncidentsList;