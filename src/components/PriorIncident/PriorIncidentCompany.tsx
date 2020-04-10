import React from "react";

interface PriorIncidentCompanyProps {
    drizzle: any,
    drizzleState: any,
    priorIncidentId: any,
}
interface PriorIncidentCompanyState {
    dataKey: any,
}

class PriorIncidentCompany extends React.Component<PriorIncidentCompanyProps, PriorIncidentCompanyState> {
    state = { dataKey: "None"};

    componentDidMount() {
        const drizzle = this.props.drizzle;
        const contract = drizzle.contracts.PriorIncidents;
        const id = this.props.priorIncidentId;
        const dataKey = contract.methods["getCompanyByPriorIncident"].cacheCall(id);
        this.setState({dataKey});
    }

    render() {
        const {PriorIncidents} = this.props.drizzleState.contracts;
        const company = PriorIncidents.getCompanyByPriorIncident[this.state.dataKey];
        if (company) {
            console.log(company);
            return (
                <h2>{company.value}</h2>
            )
        }
        return (
            <li>Could not get Company Information for this Prior</li>
        )
    }
}

export default PriorIncidentCompany;