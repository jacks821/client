import PropTypes from "prop-types"
import React from "react";
import { Heading, Flex, Link } from "@chakra-ui/core";

const Header = props => {

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#171923"
      color="#142850"
      height="50px"
      backgroundColor="#FFFFFF"
      borderBottom="1px"
      borderColor="#DAE1E7"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}><Link href="/" color="#00909E">
          {props.siteTitle}
          </Link>
        </Heading>
      </Flex>

    </Flex>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,

}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
