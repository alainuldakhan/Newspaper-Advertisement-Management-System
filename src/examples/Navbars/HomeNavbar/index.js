// src/examples/Navbars/HomeNavbar/index.jsx
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import VuiBox from "components/VuiBox";
import Breadcrumbs from "examples/Breadcrumbs";
import { motion } from "framer-motion";

import RoleNavbar from "../component";
import { useAuth } from "hooks/useAuth";

import {
  navbar,
  navbarContainer,
  navbarRow,
} from "./styles";

import { useVisionUIController } from "context";

function HomeNavbar({ absolute, light, isMini }) {
  const { role } = useAuth();
  const [controller] = useVisionUIController();
  const { transparentNavbar } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  return (
    <AppBar
      // Меняем поведение: если не абсолютный, то статический
      position={absolute ? "absolute" : "static"}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <VuiBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) =>
            navbarRow(theme, { isMini, justifyContent: "flex-start" })
          }
        >
          <motion.div
            style={{ display: "inline-block" }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Breadcrumbs icon="home" light={light} />
          </motion.div>
        </VuiBox>

        <VuiBox
          sx={(theme) =>
            navbarRow(theme, {
              isMini,
              justifyContent: "flex-end",
              width: "100%",
            })
          }
        >
          <RoleNavbar role={role} />
        </VuiBox>
      </Toolbar>
    </AppBar>
  );
}

HomeNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

HomeNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default HomeNavbar;
