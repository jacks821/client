import React from "react";
import {
    withRouter
} from "react-router-dom";
import PriorIncidentsList from "./PriorIncidentsList"
import CreatePriorIncident from "./createPriorIncident"

interface LocationProps {
    drizzle: any,
    drizzleState: any,
    match: any,
}

const Location = (props) => {

        return (
            <div>
                <h1>The Location Component</h1>
                <div>
                    <PriorIncidentsList drizzle={props.drizzle} drizzleState={props.drizzleState} locationId={props.match.params.id}/>
                </div>
                <div>
                    <CreatePriorIncident drizzle={props.drizzle} drizzleState={props.drizzleState} locationId={props.match.params.id} />
                </div>
            </div>
        )
 }


export default withRouter(Location) as Location;