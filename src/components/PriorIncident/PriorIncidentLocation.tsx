import React from "react";

interface PriorIncidentLocationProps {
    drizzle: any,
    drizzleState: any,
    priorIncidentId: any,
}
interface PriorIncidentLocationState {
    dataKey: any,
}

class PriorIncidentLocation extends React.Component<PriorIncidentLocationProps, PriorIncidentLocationState> {
    state = { dataKey: "None"};

    componentDidMount() {
        const drizzle = this.props.drizzle;
        const contract = drizzle.contracts.PriorIncidents;
        const id = this.props.priorIncidentId;
        const dataKey = contract.methods["getLocationByPriorIncident"].cacheCall(id);
        this.setState({dataKey});
    }

    render() {
        const {PriorIncidents} = this.props.drizzleState.contracts;
        const location = PriorIncidents.getLocationByPriorIncident[this.state.dataKey];
        if (location) {
            return (
                <h3>{location.value.storeNumber}</h3>
            )
        }
        return (
            <li>Could not get Location Information for this Prior</li>
        )
    }
}

export default PriorIncidentLocation;