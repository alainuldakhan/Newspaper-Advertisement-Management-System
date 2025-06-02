import React from "react";
import { motion } from "framer-motion";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

const MotionBox = motion(VuiBox);

export default function DocIntro() {
  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        mb={2}
      >
        <VuiTypography variant="h4" color="white" fontWeight="bold">
          Welcome to Paper Verse Docs
        </VuiTypography>
      </MotionBox>

      <VuiTypography variant="body2" color="text" lineHeight={1.7} mb={2}>
        Here you’ll find everything required to build, run and extend the
        Paper Verse newspaper-advertisement platform:
      </VuiTypography>

      <VuiBox component="ul" pl={3} sx={{ listStyleType: '"• "', "& li": { mb: 1 } }}>
        <li>
          <VuiTypography variant="body2" color="text">
            Front-end integration with React JS
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            ASP .NET Core backend &amp; Clean Architecture
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            Database and migrations
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            Local installation &amp; deployment notes
          </VuiTypography>
        </li>
      </VuiBox>
    </>
  );
}