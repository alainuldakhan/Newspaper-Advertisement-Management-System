// src/components/DefaultNavbarLink.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

const DefaultNavbarLink = React.forwardRef(function DefaultNavbarLink(
  { name, route, sx, ...rest },
  ref
) {
  return (
    <VuiBox
      ref={ref}
      component={Link}
      to={route}
      mx={1}
      p={1}
      display="flex"
      alignItems="center"
      sx={{ cursor: "pointer", ...sx }}
      {...rest}
    >
      <VuiTypography
        variant="button"
        fontWeight="regular"
        color="white"
        textTransform="capitalize"
      >
        {name}
      </VuiTypography>
    </VuiBox>
  );
});

DefaultNavbarLink.propTypes = {
  name:  PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  sx:    PropTypes.object,
};

export default DefaultNavbarLink;
