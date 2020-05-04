import React from "react";
import {Container} from "../utils/Container"
import {
    Box,
    Heading,
  } from "@chakra-ui/core";

const About = () => {
    return (
            <Box as="section" pt={40} pb={24} color="#142850">
                <Container h="300px">
                    <Box maxW="xl" mx="auto" textAlign="center">
                        <Heading as="h1" size="xl" fontWeight="semibold">About</Heading>
                    </Box>
                </Container>
            </Box>
    )
}

export default About