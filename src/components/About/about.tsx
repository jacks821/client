import React from "react";
import {Container} from "../utils/Container"
import {Link} from "react-router-dom";
import {
    Box,
    Heading,
    Text,
  } from "@chakra-ui/core";

const About = () => {
    return (
            <Box as="section" pt={40} pb={24} color="#142850">
                <Container>
                    <Box maxW="xl" mx="auto" textAlign="center">
                        <Heading as="h1" size="xl" fontWeight="semibold">Purpose</Heading>
                        <Text justifyContent="center" color="#142850">
                            I am an attorney with <Link to={{pathname: '/external', state: {url: "https://richardharrislaw.com/attorneys/charlie-jackson/"}}} style={{color: "#274E37", textDecoration: "none"}}>the Richard Harris Law Firm</Link>.
                            I created this website because I wanted an anonymous central repository for attorneys to share information without fear of reprisal or violating confidentiality orders.
                        </Text>
                    </Box>
                </Container>
            </Box>
    )
}

export default About