import React from "react";
import {Box, Text} from "@chakra-ui/core";
import {Provider, Heading, Subhead, Hero} from "react-landing-page";

const Home = () => {

    return (
        <Box>
                <Text
                    left={0}
                    line-height={"200px"}
                    marginTop={'-100px'}
                    position={"absolute"}
                    textAlign={"center"}
                    top="50%"
                    width={"100%"}
                >
                    Home
                </Text>
        </Box>
    )
}

export default Home