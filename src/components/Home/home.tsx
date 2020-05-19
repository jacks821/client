import React from "react"
import {DiGithubBadge} from "react-icons/di";
import {Link} from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
} from "@chakra-ui/core";
import {Container} from "../utils/Container"


const Home = () => {
  return (
    <Box as="section" pt={40} pb={24} color="#142850">
      <Container>
        <Box maxW="xl" mx="auto" textAlign="center">
            <Heading as="h1" size="xl" fontWeight="semibold" letterSpacing={"-.1rem"}>PriorIncidents</Heading>
            <Text opacity={0.7} fontSize="xl" color="#142850" mt="6">Share Your Prior Incidents For <Box as="span" color="#00909E">Everyone To Find</Box></Text>   
            <Box mt="4">
              <Link to={{
                          pathname: `/listCompanies`,
                        }
                    }>
                <Button as="button" size="lg" m={2} style={{color: "#142850", backgroundColor: "#dae1e7"}}>
                  Start Here
                </Button>
              </Link>
              <Link to={{pathname: '/external', state: {url: "https://www.github.com/jacks821/client"}}} style={{color: "#142850"} }>
              <Button
                as="a"
                size="lg"
                backgroundColor=""
                m={2}
                leftIcon={props => <DiGithubBadge size="1.5em" {...props} />}
              >
                GitHub
              </Button>
              </Link>
            </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home