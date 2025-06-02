// src/layouts/documentation/Documentation.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Card } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import AnimatedPage from "layouts/components/pages";
import VuiBox from "components/VuiBox";
import DocumentationSideBarCard from "layouts/documentation/component/sidebar";
import glassStylesDark from "./component/styles";

const MotionCard = motion(Card);

export default function Documentation() {
  const location = useLocation();

  return (
    <PageLayout>
      <AnimatedPage>
        <DefaultNavbar transparent light />

        <VuiBox
          component="section"
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={{ xs: 6, md: 3 }}
          px={{ xs: 2, md: 6 }}
          mt="var(--navbar-h, 96px)"
          sx={{ minHeight: "calc(100vh - var(--navbar-h, 96px))" }}
        >
          <VuiBox width={260} minWidth={260} mr={{ md: 3 }}>
            <DocumentationSideBarCard />
          </VuiBox>

          <MotionCard
            key={location.pathname}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: -24, scale: 0.98 }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            sx={{
              ...glassStylesDark,
              flexGrow: 1,
              p: 4,
              display: "flex",
              flexDirection: "column",
              maxHeight: "calc(100vh - var(--navbar-h, 96px) - 48px)",
              overflowY: "auto",

              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: "3px",
                transition: "background-color 0.3s ease",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(255,255,255,0.4)",
              },
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.2) transparent",}}>
                
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0,  scale: 1 }}
                exit={{    opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </MotionCard>
        </VuiBox>
      </AnimatedPage>
    </PageLayout>
  );
}
