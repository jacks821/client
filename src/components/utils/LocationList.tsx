import React from "react"
import {
  Box,
} from "@chakra-ui/core";



export const LocationListItem = props => {
    let listLocations = props.locations.map(location => 
        <p>{location.street}</p>    
    )
    return(
        <Box>
            <h2>{props.state}</h2>
            {listLocations}
        </Box>
    )
}