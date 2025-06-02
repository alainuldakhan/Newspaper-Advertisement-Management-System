import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Card, Divider } from "@mui/material";
import { motion } from "framer-motion";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import glassStylesDark from "../styles";

const MotionCard = motion(Card);
const MotionBox  = motion(VuiBox);

const defaultItems = [
  { name: "Frontend",           to: "/documentation/react" },
  { name: "Backend",            to: "/documentation/asp.net" },
  { name: "Clean Architecture", to: "/documentation/clean-architecture" },
  { name: "Database",           to: "/documentation/database" },
  { name: "Installation",       to: "/documentation/installation" },
];

function DocumentationSideBarCard({ title = "Documentation", items = defaultItems }) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      whileHover={{ scale: 1.02 }}
      sx={glassStylesDark}
    >
      <MotionBox
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0,   opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        mb={1}
      >
        <VuiBox
          component={NavLink}
          to="/documentation"
          end
          sx={{
            textDecoration: "none",
            display: "inline-block",
            "&.active > span": { color: "purple" },
            "&:hover > span":  { color: "purple" },
          }}
        >
          <VuiTypography variant="lg" fontWeight="bold" color="white">
            {title}
          </VuiTypography>
        </VuiBox>
      </MotionBox>

      <Divider
        sx={{
          opacity: 1,
          mb: 1,
          borderBottomWidth: 2,
          borderColor: "rgba(255,255,255,0.15)",
        }}
      />

      {items.map(({ name, to }, idx) => (
        <MotionBox
          key={to}
          component={NavLink}
          to={to}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0,   opacity: 1 }}
          transition={{ delay: 0.2 + idx * 0.05, duration: 0.4 }}
          whileHover={{ x: 6, scale: 1.04 }}
          sx={{
            display: "block",
            py: 0.75,
            textDecoration: "none",
            "& span":        { color: "white" },
            "&.active span": { color: "purple" },
            "&:hover span":  { color: "purple" },
          }}
        >
          <VuiTypography variant="button" fontWeight="regular" color="inherit">
            {name}
          </VuiTypography>
        </MotionBox>
      ))}
    </MotionCard>
  );
}

DocumentationSideBarCard.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired, to: PropTypes.string.isRequired })
  ),
};

export default DocumentationSideBarCard;
