import React from "react";

interface PriorIncidentCompanyProps {
    locationId: any,
}
interface PriorIncidentCompanyState {
    error: any,
    isLoaded: boolean,
    company: any,
}

class PriorIncidentCompany extends React.Component<PriorIncidentCompanyProps, PriorIncidentCompanyState> {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          company: null
        };
      }

      componentDidMount() {
        let id = this.props.locationId;
        console.log(id);
        fetch(`/company/location=${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        company: result
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
        let {error, isLoaded, company} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <h2>{company.name}</h2>
            )
        }
    }
}

export default PriorIncidentCompany;