import React from "react";
import LocationListItemComponent from "./locationListItemComponent";

interface CompanyLocationsProps {
    drizzle: any,
    drizzleState: any,
    id: any,
}
interface CompanyLocationState {
    dataKey: any,
}

class CompanyLocationsList extends React.Component<CompanyLocationsProps, CompanyLocationState> {
    state = { dataKey: "None"};

    componentDidMount() {
        const drizzle = this.props.drizzle;
        const contract = drizzle.contracts.PriorIncidents;
        const id = this.props.id;
        const dataKey = contract.methods["getLocationsByCompany"].cacheCall(id);
        this.setState({dataKey})
    }

    render() {
        const {PriorIncidents} = this.props.drizzleState.contracts;
        const locationIndices = PriorIncidents.getLocationsByCompany[this.state.dataKey];
        if (locationIndices) {
            console.log(locationIndices.value)
            const locationsList = locationIndices.value.map((location, index) =>
                <LocationListItemComponent drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} id={location}/>
            )
            return (
                <div>
                    <div>
                      <h1> List Company's Locations </h1>
                        <ul>
                            {locationsList}
                        </ul>
                      </div>
                </div>
            )
        }
        return (
            <div>
                <p>Nothing Here</p>
            </div>
        )
    }
}

export default CompanyLocationsList;