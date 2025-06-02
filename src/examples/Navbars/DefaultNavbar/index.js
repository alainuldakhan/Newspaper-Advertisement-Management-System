import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import DefaultNavbarLink from "./DefaultNavbarLink";
import DefaultNavbarMobile from "./DefaultNavbarMobile";
import breakpoints from "assets/theme/base/breakpoints";
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import { motion } from "framer-motion";

export default function DefaultNavbar({
  transparent = false,
  light = false,
  action = false,
}) {
  const location = useLocation();
  const isLogoActive = location.pathname === "/";

  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openMobileNavbar = ({ currentTarget }) =>
    setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  const links = [
    { name: "Documentation", route: "/documentation" },
    { name: "Sign In",       route: "/authentication/sign-in" },
    { name: "Sign Up",       route: "/authentication/sign-up" },
  ];

  const linkStyle = {
    margin: "0 12px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.1s ease, filter 0.1s ease",
  };

  const logoVariants = {
    default: { scale: 1, filter: "none" },
    active:  { scale: 1.1, filter: "drop-shadow(0 0 8px #0ff)" },
    hover:   { scale: 1.1, filter: "drop-shadow(0 0 6px #0ff)" },
  };

  return (
    <Container disableGutters maxWidth={false}>
      <VuiBox
        py={2}
        px={{ xs: transparent ? 4 : 3, sm: transparent ? 2 : 3, lg: transparent ? 0 : 3 }}
        my={2}
        width="calc(100% - 48px)"
        borderRadius="xl"
        shadow="none"
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
        left="50%"
        zIndex={3}
        maxWidth="1044px"
        mx="auto"
        sx={{
          background: "transparent",
          backdropFilter: "none",
          transform: "translate(-50%, 0)",
        }}
      >
        <VuiBox
          component={Link}
          to="/"
          aria-label="home"
          sx={({ spacing }) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: transparent ? spacing(1.5) : spacing(0.75),
            px: spacing(2),
            cursor: "pointer",
          })}
        >
          <motion.div
            variants={logoVariants}
            initial="default"
            animate={isLogoActive ? "active" : "default"}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <VuiTypography
              variant="button"
              color="white"
              sx={{
                fontSize: 14,
                letterSpacing: 2,
                fontWeight: "medium",
                textTransform: "uppercase",
              }}
            >
              Paper Verse
            </VuiTypography>
          </motion.div>
        </VuiBox>

        <VuiBox color="inherit" display={{ xs: "none", lg: "flex" }}>
          {links.map((link) => {
            const isActive = location.pathname === link.route;
            return (
              <VuiBox
                key={link.name}
                component={Link}
                to={link.route}
                mx={1}
                p={1}
                display="flex"
                alignItems="center"
                sx={{
                  ...linkStyle,
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  filter: isActive
                    ? "drop-shadow(0 0 8px #0ff)"
                    : "none",
                  "&:hover": {
                    transform: "scale(1.1)",
                    filter: "drop-shadow(0 0 8px #0ff)",
                  },
                }}
              >
                <DefaultNavbarLink
                  name={link.name.toLowerCase()}
                  route={link.route}
                />
              </VuiBox>
            );
          })}
        </VuiBox>

        {action && (
          <VuiBox display={{ xs: "none", lg: "inline-block" }}>
            {action.type === "internal" ? (
              <VuiButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color || "info"}
                size="small"
              >
                {action.label}
              </VuiButton>
            ) : (
              <VuiButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                color={action.color || "info"}
                sx={({ typography: { size }, functions: { pxToRem } }) => ({
                  fontSize: pxToRem(size.sm),
                })}
              >
                {action.label}
              </VuiButton>
            )}
          </VuiBox>
        )}

        <VuiBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon sx={({ palette: { white } }) => ({ color: white.main })} fontSize="default">
            {mobileNavbar ? "close" : "menu"}
          </Icon>
        </VuiBox>
      </VuiBox>

      {mobileView && (
        <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />
      )}
    </Container>
  );
}

DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light:       PropTypes.bool,
  action:      PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type:  PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary", "secondary", "info", "success",
        "warning", "error",   "dark",  "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};
