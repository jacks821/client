import { Box } from "@chakra-ui/core";
import React from "react";

const GitHubButton = () => (
  <Box
    as="a"
    className="github-button"
    data-icon="octicon-star"
    data-size="large"
    data-show-count="true"
    aria-label="Star Chakra UI on GitHub"
  >
    Star
  </Box>
);

export default GitHubButton;