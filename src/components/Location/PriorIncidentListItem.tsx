import React from "react";
import {
    Link,
} from "react-router-dom";

interface PriorIncidentItemProps {
    drizzle: any,
    drizzleState: any,
    id: any,
    locationId: any,
}
interface PriorIncidentItemState {
    dataKey: any,
}

class PriorIncidentListItem extends React.Component<PriorIncidentItemProps, PriorIncidentItemState> {
    state = { dataKey: "None"};

    componentDidMount() {
        const drizzle = this.props.drizzle;
        const contract = drizzle.contracts.PriorIncidents;
        const id = this.props.id;
        const dataKey = contract.methods["getPriorIncidentByIndex"].cacheCall(id);
        this.setState({dataKey});
    }

    render() {
        const {PriorIncidents} = this.props.drizzleState.contracts;
        const prior = PriorIncidents.getPriorIncidentByIndex[this.state.dataKey];
        if (prior) {
            console.log(prior.value.date);
            return (
                <div>
                    <li>
                        <Link to={{
                            pathname: `/priorIncident/${this.props.id}`,
                            }
                        } id={this.props.id} date={prior.value.date} attorneyname={prior.value.attorneyName} falltype={prior.value.fallType} locationid={this.props.locationId}>
                            {prior.value.date}
                        </Link>
                    </li>
                </div>
            )
        }
        return (
            <li>Could not get Prior Incident Information</li>
        )
    }
}

export default PriorIncidentListItem;