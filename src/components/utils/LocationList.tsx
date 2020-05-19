import React from "react"
import {
  Box,
  Text,
} from "@chakra-ui/core";
import {
    Link,
} from "react-router-dom";

function compare(a, b) {
    const locationA = a.city.toUpperCase();
    const locationB = b.city.toUpperCase();

    let comparison = 0;
    if (locationA > locationB) {
        comparison = 1;
    } else if (locationA < locationB) {
        comparison = -1;
    }
    return comparison;
}

export const LocationListItem = props => {
    let listLocations = props.locations.sort(compare).map(location => 
        <Text fontSize="xl">
            <Link to={{
                            pathname: `/location/${location.id}`,
                            state: {
                                id: location.id,
                                companyName: props.companyName
                            }
                        }
                    } key={location.id} style={{color: "#00909E", textDecoration: "none"}}>
            
            <b>Store Number: {location.store_number}</b><br/>{location.street_number} {location.street}<br/>{location.city}, {location.state} {location.zip_code}
            </Link>
        </Text>    
    )
    return(
        <Box>
            <Text fontSize="2xl" m={"-4px"} color="#27496d"><b>{props.state}</b></Text>
            {listLocations}
        </Box>
    )
}