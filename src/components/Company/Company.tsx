import React from "react";
import {
    withRouter
} from "react-router-dom";
import CompanyLocationsList from "./CompanyLocationsList"
import CreateLocation from "./createLocation"

interface CompanyProps {
    drizzle: any,
    drizzleState: any,
    match: any,
}

class Company extends React.Component<CompanyProps> {

    componentDidMount() {
    }
    render () {
        return (
            <div>
                <h1>The Company Component</h1>
                <div>
                    <CompanyLocationsList drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} id={this.props.match.params.id}/>
                </div>
                <div>
                    <CreateLocation drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} companyId={this.props.match.params.id} />
                </div>
            </div>
        )
    }
}

export default withRouter(Company) as Company;