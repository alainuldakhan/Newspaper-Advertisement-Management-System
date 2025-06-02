import PropTypes from "prop-types";
import Fade from "@mui/material/Fade";
import useTheme from "@mui/material/styles/useTheme";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/authentication/components/Footer";
import AnimatedPage from "layouts/components/pages";

import colors from "assets/theme/base/colors";
import tripleLinearGradient from "assets/theme/functions/tripleLinearGradient";

function CoverLayout({
  color,
  header,
  title,
  description,
  motto,
  premotto,
  image,
  top,
  cardContent,
  children,
}) {
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";
  const { gradients } = colors;

  return (
    <PageLayout
      background={tripleLinearGradient(
        gradients.cover.main,
        gradients.cover.state,
        gradients.cover.stateSecondary,
        gradients.cover.angle
      )}
    >
      <AnimatedPage>

      <DefaultNavbar transparent light />

      {/* Illustration / left side */}
      <VuiBox
        height="100%"
        width="50vw"
        display={{ xs: "none", md: "block" }}
        position="absolute"
        top={0}
        left={0}
        zIndex={0}
        sx={({ breakpoints }) => ({
          overflow: "hidden",
          [breakpoints.down("lg")]: {
            display: "none",
          },
        })}
      >
        <VuiBox
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backdropFilter: "blur(2px)",
          }}
        >
          <Fade in timeout={800}>
            <VuiBox textAlign="center">
              {premotto && (
                <VuiTypography
                  variant="subtitle1"
                  fontWeight="medium"
                  color="white"
                  mb={1}
                  sx={{ letterSpacing: "6px" }}
                >
                  {premotto}
                </VuiTypography>
              )}
              {motto && (
                <VuiTypography
                  variant="h2"
                  fontWeight="bold"
                  color="logo"
                  textGradient
                  sx={{ letterSpacing: "6px" }}
                >
                  {motto}
                </VuiTypography>
              )}
            </VuiBox>
          </Fade>
        </VuiBox>
      </VuiBox>

      <VuiBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        maxWidth="1044px"
        minHeight="75vh"
        mx="auto"
      >
        <Fade in timeout={700}>
          <VuiBox
            mt={top}
            ml="auto !important"
            sx={({ breakpoints }) => ({
              [breakpoints.down("xl")]: { mr: cardContent ? "50px" : "100px" },
              [breakpoints.down("lg")]: { ml: "auto !important", mr: "auto" },
              [breakpoints.down("md")]: { maxWidth: "90%", px: 1 },
            })}
          >
            <VuiBox pt={3} px={3} mx="auto" maxWidth={cardContent ? "450px" : "360px"}>
              {!header && (
                <VuiBox mb={4}>
                  <VuiTypography variant="h3" fontWeight="bold" color={color} mb={1}>
                    {title}
                  </VuiTypography>
                  <VuiTypography
                    variant="body2"
                    color="white"
                    sx={({ typography: { size } }) => ({ fontSize: size.sm })}
                  >
                    {description}
                  </VuiTypography>
                </VuiBox>
              )}
              {header}
            </VuiBox>

            <VuiBox px={3} mb={6} mx="auto" maxWidth={cardContent ? "450px" : "360px"}>
              {children}
            </VuiBox>
            <Footer />
          </VuiBox>
        </Fade>
      </VuiBox>
      </AnimatedPage>
    </PageLayout>
  );
}

CoverLayout.defaultProps = {
  header: null,
  title: "",
  description: "",
  color: "info",
  top: 20,
  motto: "",
  premotto: "",
  cardContent: false,
};

CoverLayout.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  motto: PropTypes.string,
  premotto: PropTypes.string,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
  cardContent: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
};

export default CoverLayout;
