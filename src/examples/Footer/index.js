import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { Stack } from "@mui/material";

function Footer() {
  return (
    <VuiBox
      component="footer"
      py={2}
      pb={0}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
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
    </VuiBox>
  );
}

export default Footer;
