import React from "react";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { GlobalStyles } from "@mui/material";
import { motion } from "framer-motion";

import HeroSection from "./components/HeroSection";
import ImageCarouselSection from "./components/ImageCarouselSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import GlowDivider from "./components/Divider";

const appearVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Main() {
  return (
    <>
      <GlobalStyles
        styles={{
          "*::-webkit-scrollbar": { display: "none" },
          "*": {
            scrollbarWidth: "none",      
            "-ms-overflow-style": "none" 
          },
        }}
      />

      <PageLayout>
        <DefaultNavbar transparent light />

        <motion.div
          variants={appearVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSection />
        </motion.div>

        <GlowDivider sx={{ width: "60%", mx: "auto", my: 4, mt: 1 }} />

        <motion.div
          variants={appearVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ImageCarouselSection />
        </motion.div>

        <GlowDivider sx={{ width: "80%", mx: "auto", my: 4 }} />

        <motion.div
          variants={appearVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FeaturesSection />
        </motion.div>

        <GlowDivider sx={{ width: "80%", mx: "auto", my: 4 }} />

        <motion.div
          variants={appearVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <HowItWorksSection />
        </motion.div>
      </PageLayout>
    </>
  );
}
