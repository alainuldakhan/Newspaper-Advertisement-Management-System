import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import HomeLayout from "examples/LayoutContainers/HomeLayout";
import HomeNavbar from "examples/Navbars/HomeNavbar";
import AnimatedPage from "layouts/components/pages";
import StandardContainer from "layouts/components/container";
import SuccessBackDrop from "layouts/components/drop";
import FormComponent from "layouts/components/form";
import StandardButton from "layouts/components/button";

import NewspaperSlotSelector from "utils/slotSelector";
import NewspaperPreview from "utils/preview/newspaper";
import MediaPreview from "utils/preview/media";
import adsService from "services/adsService";

const STEPS = [
  "Choose Plan",
  "Choose Category",
  "Choose Ad Type",
  "Create Ad",
];

const CONNECTOR = (
  <StepConnector
    sx={{
      "& .MuiStepConnector-line": { borderColor: "rgba(0,0,0,0.2)", borderWidth: 2 },
      "&.Mui-active .MuiStepConnector-line, &.Mui-completed .MuiStepConnector-line": {
        borderColor: "#000",
        borderWidth: 3,
      },
    }}
  />
);

const iconSx = { color: "rgba(0,0,0,0.2)", "&.Mui-active, &.Mui-completed": { color: "#000" } };
const labelSx = {
  "& .MuiStepLabel-label": { color: "rgba(0,0,0,0.4)" },
  "&.Mui-active .MuiStepLabel-label, &.Mui-completed .MuiStepLabel-label": { color: "#000" },
};

const initialValuesFactory = () => ({
  title: "",
  description: "",
  business_name: "",
  product_name: "",
  product_image: null,
  slot: null,
  media_url: "",
});

const validationSchemaFactory = (adType) =>
  adType === "newspaper"
    ? Yup.object({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        business_name: Yup.string().required("Required"),
        product_name: Yup.string().required("Required"),
        product_image: Yup.mixed().required("Required"),
        slot: Yup.object().required("Select ad area"),
      })
    : Yup.object({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        business_name: Yup.string().required("Required"),
        media_url: Yup.string().url("Invalid URL").required("Required"),
      });

function CreateAdForm() {
  const { plan, category, adType } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [rect, setRect] = useState(null);
  const [preview, setPreview] = useState(false);

  const validationSchema = useMemo(() => validationSchemaFactory(adType), [adType]);
  const initialValues = useMemo(() => initialValuesFactory(), []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        if (val != null && val !== "") {
          formData.append(key, key === "slot" ? JSON.stringify(val) : val);
        }
      });
      formData.append("plan", plan);
      formData.append("adType", adType);

      try {
        await adsService.createAd(formData);
        setSuccess(true);
        setTimeout(() => navigate("/ads/mine"), 800);
      } catch (err) {
        console.error(err);
        const code = err.response?.status;
        if (code === 403) {
          alert("Plan limit reached. Upgrade or delete an old ad.");
          navigate("/ads/choose-plan");
        } else {
          alert(`Error: ${err.response?.data?.message || err.message}`);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("slot", rect);
  }, [rect]);

  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const togglePreview = useCallback(() => setPreview((p) => !p), []);

  return (
    <HomeLayout>
      <HomeNavbar />
      <AnimatedPage>
        <StandardContainer>
          {success && <SuccessBackDrop />}

          <Stepper activeStep={3} alternativeLabel connector={CONNECTOR} sx={{ mb: 4 }}>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel StepIconProps={{ sx: iconSx }} sx={labelSx}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {preview ? (
            adType === "newspaper" ? (
              <NewspaperPreview rect={rect} ad={formik.values} onBack={togglePreview} />
            ) : (
              <MediaPreview ad={formik.values} onBack={togglePreview} />
            )
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                {/* Title */}
                <Grid item xs={12} md={6}>
                  <FormComponent
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={!!formik.errors.title}
                    helperText={formik.errors.title}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <FormComponent
                    fullHeight
                    rows={6}
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={!!formik.errors.description}
                    helperText={formik.errors.description}
                  />
                </Grid>

                {/* Company Name */}
                <Grid item xs={12} md={4}>
                  <FormComponent
                    label="Company Name"
                    name="business_name"
                    value={formik.values.business_name}
                    onChange={formik.handleChange}
                    error={!!formik.errors.business_name}
                    helperText={formik.errors.business_name}
                  />
                </Grid>

                {/* Newspaper-specific fields */}
                {adType === "newspaper" && (
                  <>
                    <Grid item xs={12} md={6}>
                      <FormComponent
                        label="Product Name"
                        name="product_name"
                        value={formik.values.product_name}
                        onChange={formik.handleChange}
                        error={!!formik.errors.product_name}
                        helperText={formik.errors.product_name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormComponent
                        type="file"
                        label="Product Image"
                        name="product_image"
                        onChange={(e) =>
                          formik.setFieldValue("product_image", e.currentTarget.files[0])
                        }
                        error={!!formik.errors.product_image}
                        helperText={formik.errors.product_image}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <NewspaperSlotSelector rect={rect} onChange={setRect} />
                      {!!formik.errors.slot && (
                        <Typography color="error" sx={{ mt: 1 }}>
                          {formik.errors.slot}
                        </Typography>
                      )}
                    </Grid>
                  </>
                )}

                {/* Media-specific field */}
                {adType === "media" && (
                  <Grid item xs={12} md={8}>
                    <FormComponent
                      label="Media URL (YouTube, Vimeo …)"
                      name="media_url"
                      value={formik.values.media_url}
                      onChange={formik.handleChange}
                      error={!!formik.errors.media_url}
                      helperText={formik.errors.media_url}
                    />
                  </Grid>
                )}
              </Grid>

              <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                <StandardButton displayText="Back" onClick={handleBack} />
                <Button variant="outlined" onClick={togglePreview}>
                  Preview
                </Button>
                <StandardButton
                  type="submit"
                  displayText={formik.isSubmitting ? "Submitting…" : "Create"}
                />
              </Box>
            </form>
          )}
        </StandardContainer>
      </AnimatedPage>
    </HomeLayout>
  );
}

export default React.memo(CreateAdForm);

