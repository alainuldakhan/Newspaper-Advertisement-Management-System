import React from "react";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";
import { IoLogoReact } from "react-icons/io5";
import { motion } from "framer-motion";

const MotionBox = motion(VuiBox);

export default function ReactDocs() {
  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        display="flex"
        alignItems="center"
        mb={2}
      >
        <IoLogoReact size={26} color="#61dafb" style={{ marginRight: 8 }} />
        <VuiTypography variant="h4" color="white" fontWeight="bold">
          Front-end Stack Overview
        </VuiTypography>
      </MotionBox>

      <VuiTypography variant="body2" color="text" mb={2}>
        <strong>Key technologies and patterns used in Paper Verse UI:</strong>
      </VuiTypography>

      <VuiBox component="ul" pl={3} mb={3} sx={{ listStyleType: '"▸  "', "& li": { mb: 1 } }}>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>React 18</strong> with functional components and hooks.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Vision UI</strong> Design System (MUI v5 + custom theme).
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Framer Motion</strong> – micro-animations for cards, buttons and route transitions.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>React Router 6</strong> – nested routing with lazy loading.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Axios</strong> & <em>React Query (soon)</em> for data-fetching and caching.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>ESLint + Prettier</strong> – consistent code style.
          </VuiTypography>
        </li>
      </VuiBox>

      <VuiTypography variant="body2" color="text" mb={1}>
        <strong>Project structure (front-end):</strong>
      </VuiTypography>

      <VuiBox
        component="pre"
        sx={{
          color: "rgba(255,255,255,0.8)",
          background: "rgba(255,255,255,0.04)",
          p: 2,
          borderRadius: 2,
          fontSize: 12,
          overflowX: "auto",
        }}
      >
{`src/
 ┣ assets/               # images, icons, theme
 ┣ components/           # shared UI pieces (VuiBox, VuiButton…)
 ┣ layouts/              # page templates (documentation, dashboard…)
 ┣ pages/                # routed leaf pages
 ┣ hooks/                # custom React hooks
 ┣ routes.js             # navigation config
 ┗ main.jsx              # app entry point`}
      </VuiBox>

      <VuiTypography variant="body2" color="text" mt={3}>
        For smooth motion, keep element trees shallow and prefer <code>layout</code> props in Framer Motion. 
        Theme overrides live in <code>src/assets/theme</code>; use them instead of inline colors to stay consistent.
      </VuiTypography>
    </>
  );
}
