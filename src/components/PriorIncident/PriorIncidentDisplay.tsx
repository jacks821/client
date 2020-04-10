import React from "react";

interface PriorIncidentDisplayProps {
    drizzle: any,
    drizzleState: any,
    priorIncidentId: any,
}
interface PriorIncidentDisplayState {
    dataKey: any,
}

class PriorIncidentDisplay extends React.Component<PriorIncidentDisplayProps, PriorIncidentDisplayState> {
    state = { dataKey: "None"};

    componentDidMount() {
        const drizzle = this.props.drizzle;
        const contract = drizzle.contracts.PriorIncidents;
        const id = this.props.priorIncidentId;
        const dataKey = contract.methods["getPriorIncidentByIndex"].cacheCall(id);
        this.setState({dataKey});
    }

    render() {
        const {PriorIncidents} = this.props.drizzleState.contracts;
        const prior = PriorIncidents.getPriorIncidentByIndex[this.state.dataKey];
        if (prior) {
            return (
                <h3>{prior.value.date}</h3>
            )
        }
        return (
            <li>Could not get Information Prior</li>
        )
    }
}

export default PriorIncidentDisplay;