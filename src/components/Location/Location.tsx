import React from "react";
import {
    Link,
    withRouter
} from "react-router-dom";
import CreatePriorIncident from "./createPriorIncident"
import {AddReportModal} from "../utils/AddReportModal"
import {ReportsModal} from "../utils/ReportsModal";

interface LocationProps {
    match: any,
}

interface LocationState {
    error: any,
    isLoaded: boolean,
    location: any,
}


class Location extends React.Component<LocationProps, LocationState> {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          location: null
        };
      }

      componentDidMount() {
        let id = this.props.match.params.id;
        fetch(`/companies/location/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        location: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error});
                }
            )
    }

    render() {
        let {error, isLoaded, location} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            let priorIncidentItems;
            if (location.prior_incidents == null) {
                priorIncidentItems = <h2>This Location has no Prior Incidents.  Add an Incident below</h2>
            } else {
                priorIncidentItems = location.prior_incidents.map((pi, index) =>
                    <p key={index}>
                        <Link to={{
                            pathname: `/priorincident/${pi.id}`,
                        }
                    } id={pi.id} key={pi.id}>
                        {pi.fall_type}
                        </Link>
                    </p>
                )
            }

        return (
            <div>
                <h1>{location.store_number}</h1>
                <div>
                    <h1> List Incidents </h1>
                    <ul>
                        {priorIncidentItems}
                    </ul>
                </div>
                <div>
                    <CreatePriorIncident locationId={location.id} />
                </div>
                <AddReportModal reportedId={location.id} reportType={"location"}/>
                <ReportsModal reports={location.reports} />
            </div>
        )};        
    }
 }


export default withRouter(Location) as Location;