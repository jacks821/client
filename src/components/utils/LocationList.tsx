import React from "react"
import {
  Box,
  Text,
} from "@chakra-ui/core";
import {
    Link,
} from "react-router-dom";



export const LocationListItem = props => {
    let listLocations = props.locations.map(location => 
        <Text fontSize="xl">
            <Link to={{
                            pathname: `/location/${location.id}`,
                            state: {
                                id: location.id,
                                companyName: props.companyName
                            }
                        }
                    } key={location.id}>
            
            {location.street_number} {location.street}<br/>{location.city}, {location.state} {location.zip_code}
            </Link>
        </Text>    
    )
    return(
        <Box>
            <Text fontSize="2xl"><b>{props.state}</b></Text>
            {listLocations}
        </Box>
    )
}