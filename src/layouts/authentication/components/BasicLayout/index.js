import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/authentication/components/Footer";

function BasicLayout({
  title,
  description,
  image,
  textColor,
  backgroundType,
  backgroundVideo,
  gradient,
  children,
}) {
  const getBackgroundStyle = ({ functions: { linearGradient, rgba }, palette: { gradients } }) => {
    if (backgroundType === "gradient" && gradient) {
      return linearGradient(
        rgba(gradients[gradient]?.main || gradients.dark.main, 0.6),
        rgba(gradients[gradient]?.state || gradients.dark.state, 0.6)
      );
    }
    if (backgroundType === "image" && image) {
      return `${linearGradient(
        rgba(gradients.dark.main, 0.6),
        rgba(gradients.dark.state, 0.6)
      )}, url(${image})`;
    }
    return "none";
  };

  return (
    <PageLayout>
      <DefaultNavbar transparent light />

      <VuiBox
        width="calc(100% - 2rem)"
        minHeight="50vh"
        borderRadius="lg"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        position="relative"
        sx={({ functions, palette }) => ({
          background: getBackgroundStyle({ functions, palette }),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        })}
      >
        {backgroundType === "video" && backgroundVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
            src={backgroundVideo}
          />
        )}

        <Grid container spacing={3} justifyContent="center" sx={{ textAlign: "center" }}>
          <Grid item xs={10} lg={4}>
            <VuiBox mt={6} mb={1}>
              <VuiTypography variant="h1" color={textColor} fontWeight="bold">
                {title}
              </VuiTypography>
            </VuiBox>
            <VuiBox mb={2}>
              <VuiTypography variant="body2" color={textColor} fontWeight="regular">
                {description}
              </VuiTypography>
            </VuiBox>
          </Grid>
        </Grid>
      </VuiBox>

      <VuiBox mt={{ xs: -26, lg: -24 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </VuiBox>
    </PageLayout>
  );
}

BasicLayout.defaultProps = {
  title: "",
  description: "",
  textColor: "white",
  backgroundType: "image",
  backgroundVideo: "",
  gradient: "dark",
};

BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  textColor: PropTypes.string,
  backgroundType: PropTypes.oneOf(["image", "gradient", "video"]),
  backgroundVideo: PropTypes.string,
  gradient: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
