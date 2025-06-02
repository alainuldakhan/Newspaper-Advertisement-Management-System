// src/layouts/user/advertiser/choose-ad-type/index.jsx
import React, { useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container, Grid, Box, Typography, Stepper,
  Step, StepLabel, StepConnector
} from "@mui/material";

import HomeLayout from "examples/LayoutContainers/HomeLayout";
import HomeNavbar from "examples/Navbars/HomeNavbar";
import AnimatedPage from "layouts/components/pages";
import StandardButton from "layouts/components/button";
import AdOptionBox from "examples/AdOption";

import NewsPaperAdImg from "assets/images/ads/types/NewsPaperAdImg.png";
import MediaAdImg     from "assets/images/ads/types/MediaAdImg.png";

const STEPS = ["Choose Plan", "Choose Category", "Choose Ad Type", "Create Ad"];
const CONNECTOR = (
  <StepConnector sx={{
    "& .MuiStepConnector-line":{borderColor:"rgba(255,255,255,0.3)",borderWidth:2},
    "&.Mui-active .MuiStepConnector-line,&.Mui-completed .MuiStepConnector-line":{borderColor:"#fff",borderWidth:3},
  }}/>
);
const iconSx  = { color:"rgba(255,255,255,0.5)", "&.Mui-active,&.Mui-completed":{color:"#fff"} };
const labelSx = {
  "& .MuiStepLabel-label":{color:"rgba(255,255,255,0.5)"},
  "&.Mui-active .MuiStepLabel-label,&.Mui-completed .MuiStepLabel-label":{color:"#fff"}
};

const OPTIONS = [
  { type: "newspaper", img: NewsPaperAdImg, label: "Newspaper Ad", desc: "A classic print advertisement." },
  { type: "media",     img: MediaAdImg,     label: "Media Ad",     desc: "A digital multimedia advertisement." },
];

export default function ChooseAdType() {
  const { plan, category } = useParams();
  const [adType, setAdType] = useState(null);
  const navigate = useNavigate();

  const handleSelect = useCallback((value) =>
    setAdType(prev => prev === value ? null : value)
  , []);

  const handleNext = useCallback(() => {
    if (adType) navigate(`/ads/create/${plan}/${category}/${adType}`);
  }, [plan, category, adType, navigate]);

  const options = useMemo(() => OPTIONS, []);

  return (
    <HomeLayout>
      <HomeNavbar />
      <AnimatedPage>
        <Container maxWidth="md" sx={{ my:4 }}>
          <Stepper activeStep={2} alternativeLabel connector={CONNECTOR} sx={{ mb:4 }}>
            {STEPS.map(label => (
              <Step key={label}>
                <StepLabel StepIconProps={{ sx:iconSx }} sx={labelSx}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={4} justifyContent="center">
            {options.map(opt => (
              <Grid key={opt.type} item xs={12} sm={6} sx={{ display:"flex",flexDirection:"column" }}>
                <AdOptionBox
                  type={opt.type}
                  checked={adType === opt.type}
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

          <Box display="flex" justifyContent="flex-end" gap={2} mt={6}>
            <StandardButton displayText="Back" onClick={() => navigate(-1)} />
            <StandardButton displayText="Next" disabled={!adType} onClick={handleNext} />
          </Box>
        </Container>
      </AnimatedPage>
    </HomeLayout>
  );
}
