import React from "react";
import {
    withRouter
} from "react-router-dom";
interface ExternalProps {
    match: any,
    location: any,
}


class External extends React.Component<ExternalProps> {

    constructor(props) {
        super(props);
        window.location.href = this.props.location.state.url;
      }
    

    render() {
        return(
        <>
        </>
        )
    }
 }


export default withRouter(External) as External;