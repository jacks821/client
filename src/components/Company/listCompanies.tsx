import React from "react";
import {Link, withRouter} from "react-router-dom";

interface ListCompaniesProps {
    drizzle: any,
    drizzleState: any,
    match: any,
}

class ListCompanies extends React.Component<ListCompaniesProps> {
    state = { dataKey: "1"};

    componentDidMount() {
        const drizzle = this.props.drizzle;
        const contract = drizzle.contracts.PriorIncidents;

        const dataKey = contract.methods["listAllCompanies"].cacheCall();
        this.setState({dataKey})
    }
    render() {
        const {PriorIncidents} = this.props.drizzleState.contracts;
        const listAllCompanies = PriorIncidents.listAllCompanies[this.state.dataKey];
        if (listAllCompanies) {
            const companies = listAllCompanies.value;
            const companyList = companies.map((company, index) =>
            <li key={index}>
            <Link to={{
                pathname: `/company/${index}`,
                }
            } id={index}>{company}</Link> {index}
            </li>
            );
            return (
                <div>
                    <div>
                      <h1> List the Companies </h1>
                        <ul>
                            {companyList}
                        </ul>
                      </div>
                </div>
            )
        }
        return (
            <p>Could Not Get Companies</p>
        )
    }
}

export default withRouter(ListCompanies) as ListCompanies;