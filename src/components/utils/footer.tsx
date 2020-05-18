import React from "react"
import {DiGithubBadge} from "react-icons/di";
import {MdEmail} from "react-icons/md";
import { IoLogoTwitter } from "react-icons/io";
import {Link} from "react-router-dom";
import {
  Box,
  Stack,
  Text,
} from "@chakra-ui/core";
import {Container} from "../utils/Container"


const FooterLink = ({ icon, href }) => (
    <Link display="inline-block" to={{pathname: '/external', state: {url: href}}}>
      <Box as={icon} size="6" color="gray.400" />
    </Link>
  );

export const Footer =() => {
    return(
    <Container borderTop="1px" borderTopColor="#DAE1E7" >
        <Box as="footer" mt={12} textAlign="center" borderTopColor="#DAE1E7" >
          <Text fontSize="sm">Designed & Developed by <Link to={{
                            pathname: `/about`,
                        }
                    } color="#00909E">Charles Jackson, Esq.</Link></Text>
          <Stack
            shouldWrapChildren
            mt={4}
            isInline
            spacing="12px"
            justify="center"
          >
            <FooterLink
              href="https://github.com/jacks821"
              icon={DiGithubBadge}
            />
            <FooterLink
              href="https://twitter.com/arebelspartan"
              icon={IoLogoTwitter}
            />
            <FooterLink href="mailto:charlesjackson88@gmail.com" icon={MdEmail} />
          </Stack>
        </Box>
        </Container>
    )
}

export default Footer