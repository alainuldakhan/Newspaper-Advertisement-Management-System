import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function Footer() {
  return (
    <VuiBox
      component="footer"
      py={6}
      sx={({ breakpoints }) => ({
        maxWidth: "480px",
        mx: "auto",
        textAlign: "center",
        [breakpoints.down("sm")]: {
          px: 2,
        },
      })}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <VuiTypography
            variant="button"
            color="text"
            fontWeight={400}
            sx={{ opacity: 0.8, fontSize: "14px" }}
          >
            © 2025, Developed with ❤️ by
          </VuiTypography>

          <Stack
            direction="row"
            justifyContent="center"
            spacing={1.5}
            mt={1}
            flexWrap="wrap"
          >
            {["Annel", "Alain"].map((name) => (
              <VuiTypography
                key={name}
                component="a"
                variant="button"
                href="https://github.com/alainuldakhan/Newspaper-Advertisement-Management-System"
                target="_blank"
                rel="noopener noreferrer"
                fontWeight={500}
                color="info"
                sx={{
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00ffff",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {name}
              </VuiTypography>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </VuiBox>
  );
}

export default Footer;
