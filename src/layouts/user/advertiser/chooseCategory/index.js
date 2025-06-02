import React, { useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container, Grid, Box, Stepper,
  Step, StepLabel, StepConnector
} from "@mui/material";

import HomeLayout from "examples/LayoutContainers/HomeLayout";
import HomeNavbar from "examples/Navbars/HomeNavbar";;
import AnimatedPage from "layouts/components/pages";
import StandardButton from "layouts/components/button";
import AdOptionBox from "examples/AdOption";

import PropertyImg  from "assets/images/ads/category/PropertyImg.png";
import JobCareerImg from "assets/images/ads/category/JobCareerImg.png";
import ProductImg   from "assets/images/ads/category/ProductImg.png";
import EventImg     from "assets/images/ads/category/EventImg.png";
import OtherImg     from "assets/images/ads/category/OtherImg.png";

const STEPS = ["Choose Plan", "Choose Category", "Choose Ad Type", "Create Ad"];
const CONNECTOR = (
  <StepConnector sx={{
    "& .MuiStepConnector-line": { borderColor: "rgba(255,255,255,0.3)", borderWidth: 2 },
    "&.Mui-active .MuiStepConnector-line, &.Mui-completed .MuiStepConnector-line": {
      borderColor: "#fff", borderWidth: 3
    },
  }}/>
);
const iconSx = { color: "rgba(255,255,255,0.5)", "&.Mui-active,&.Mui-completed": { color: "#fff" } };
const labelSx = {
  "& .MuiStepLabel-label": { color: "rgba(255,255,255,0.5)" },
  "&.Mui-active .MuiStepLabel-label, &.Mui-completed .MuiStepLabel-label": { color: "#fff" }
};

const OPTIONS = [
  { type: "property",   img: PropertyImg,   label: "Property"   },
  { type: "job-career", img: JobCareerImg, label: "Job/Career" },
  { type: "product",    img: ProductImg,    label: "Product"    },
  { type: "event",      img: EventImg,      label: "Event"      },
  { type: "other",      img: OtherImg,      label: "Other"      },
];

function ChooseCategory() {
  const { plan } = useParams();
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const handleSelect = useCallback((value) =>
    setCategory(prev => prev === value ? null : value)
  , []);

  const handleNext = useCallback(() => {
    if (category) navigate(`/ads/create/${plan}/${category}`);
  }, [plan, category, navigate]);

  const handleBack = useCallback(() => navigate(-1), [navigate]);

  const options = useMemo(() => OPTIONS, []);

  return (
    <HomeLayout>
      <HomeNavbar />
      <AnimatedPage>
        <Container maxWidth="md" sx={{ my: 4 }}>
          <Stepper activeStep={1} alternativeLabel connector={CONNECTOR} sx={{ mb: 4 }}>
            {STEPS.map(label => (
              <Step key={label}>
                <StepLabel StepIconProps={{ sx: iconSx }} sx={labelSx}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={4} justifyContent="center">
            {options.map(opt => (
              <Grid key={opt.type} item xs={12} sm={4} sx={{ display: "flex", flexDirection: "column" }}>
                <AdOptionBox
                  type={opt.type}
                  checked={category === opt.type}
                  onChecked={handleSelect}
                  AdOptionImg={opt.img}
                  AdOptionText={opt.label}
                />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="flex-end" gap={2} mt={6}>
            <StandardButton
              displayText="Back"
              onClick={handleBack}
              sx={{ border: "1px solid rgba(255,255,255,0.7)", background: "transparent", color: "#fff" }}
            />
            <StandardButton
              displayText="Next"
              disabled={!category}
              onClick={handleNext}
              sx={{ border: "1px solid rgba(255,255,255,0.7)", background: "transparent", color: "#fff" }}
            />
          </Box>
        </Container>
      </AnimatedPage>
    </HomeLayout>
  );
}

export default React.memo(ChooseCategory);

// Можно добавить: анимации перехода между шагами, hover-эффекты и skeleton-заглушки для улучшения UX
