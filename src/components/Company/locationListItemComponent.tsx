import React from "react";
import {
    Link,
} from "react-router-dom";

interface LocationItemProps {
    drizzle: any,
    drizzleState: any,
    id: any,
}
interface LocationItemState {
    dataKey: any,
}

class LocationListItemComponent extends React.Component<LocationItemProps, LocationItemState> {
    state = { dataKey: "None"};

    componentDidMount() {
        const drizzle = this.props.drizzle;
        const contract = drizzle.contracts.PriorIncidents;
        const id = this.props.id;
        const dataKey = contract.methods["getLocationByIndex"].cacheCall(id);
        this.setState({dataKey});
    }

    render() {
        const {PriorIncidents} = this.props.drizzleState.contracts;
        const location = PriorIncidents.getLocationByIndex[this.state.dataKey];
        if (location) {
            console.log(location.value.storeNumber);
            return (
                <div>
                    <li>
                    <Link to={{
                        pathname: `/location/${this.props.id}`,
                        }
                    } id={this.props.id}>{location.value.storeNumber}</Link></li>
                </div>
            )
        }
        return (
            <li>Could not get Location Information</li>
        )
    }
}

export default LocationListItemComponent;