// src/layouts/user/advertiser/choose-plan/index.jsx
import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Grid, Typography, Box, Stepper,
  Step, StepLabel, StepConnector
} from "@mui/material";

import HomeLayout from "examples/LayoutContainers/HomeLayout";
import HomeNavbar from "examples/Navbars/HomeNavbar";
import AnimatedPage from "layouts/components/pages";
import StandardButton from "layouts/components/button";
import AdOptionBox from "examples/AdOption";

import BasicPlanImg from "assets/images/ads/plans/BasicPlanImg.png";
import Basic2PlanImg from "assets/images/ads/plans/Basic2PlanImg.png";
import PremiumPlanImg from "assets/images/ads/plans/PremiumPlanImg.png";

const STEPS = ["Choose Plan", "Choose Category", "Choose Ad Type", "Create Ad"];
const CONNECTOR = (
  <StepConnector sx={{
    "& .MuiStepConnector-line": { borderColor:"rgba(255,255,255,0.3)", borderWidth:2 },
    "&.Mui-active .MuiStepConnector-line,&.Mui-completed .MuiStepConnector-line": {
      borderColor:"#fff", borderWidth:3
    },
  }}/>
);
const iconSx  = { color:"rgba(255,255,255,0.5)", "&.Mui-active,&.Mui-completed":{color:"#fff"} };
const labelSx = {
  "& .MuiStepLabel-label":{color:"rgba(255,255,255,0.5)"},
  "&.Mui-active .MuiStepLabel-label,&.Mui-completed .MuiStepLabel-label":{color:"#fff"}
};

const OPTIONS = [
  { type: "basic",    img: BasicPlanImg,    label: "Basic",    desc: "One Newspaper Ad" },
  { type: "basic2", img: Basic2PlanImg, label: "Basic II", desc: "One Media Ad"    },
  { type: "premium",  img: PremiumPlanImg,  label: "Premium",  desc: "Unlimited Ads"   },
];

export default function ChoosePlan() {
  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();

  const handleSelect = useCallback((value) =>
    setPlan(prev => prev === value ? null : value)
  , []);

  const handleNext = useCallback(() => {
    if (plan) navigate(`/ads/create/${plan}`);
  }, [plan, navigate]);

  const options = useMemo(() => OPTIONS, []);

  return (
    <HomeLayout>
      <HomeNavbar />
      <AnimatedPage>
        <Container maxWidth="md" sx={{ my:4 }}>
          <Stepper activeStep={0} alternativeLabel connector={CONNECTOR} sx={{ mb:4 }}>
            {STEPS.map(label => (
              <Step key={label}>
                <StepLabel StepIconProps={{ sx:iconSx }} sx={labelSx}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={4} justifyContent="center">
            {options.map(opt => (
              <Grid key={opt.type} item xs={12} sm={4} sx={{ display:"flex",flexDirection:"column" }}>
                <AdOptionBox
                  type={opt.type}
                  checked={plan === opt.type}
                  onChecked={handleSelect}
                  AdOptionImg={opt.img}
                  AdOptionText={opt.label}
                />
                <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ mt:1, textAlign:"center" }}>
                  {opt.desc}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="right" mt={6}>
            <StandardButton
              displayText="Next"
              disabled={!plan}
              onClick={handleNext}
              sx={{ border:"1px solid rgba(255,255,255,0.7)", background:"transparent", color:"#fff" }}
            />
          </Box>
        </Container>
      </AnimatedPage>
    </HomeLayout>
  );
}
