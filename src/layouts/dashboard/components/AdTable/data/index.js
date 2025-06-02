// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";

export default function data() {
  const clientAvatar = (image, name) => (
    <Tooltip title={name} placeholder="bottom">
      <VuiAvatar
        src={image}
        alt={name}
        size="sm"
        sx={{
          border: ({ borders: { borderWidth }, palette: { dark } }) =>
            `${borderWidth[2]} solid ${dark.focus}`,
        }}
      />
    </Tooltip>
  );

  return {
    columns: [
      { name: "title", align: "left" },
      { name: "category", align: "left" },
      { name: "client", align: "left" },
      { name: "price", align: "center" },
      { name: "status", align: "center" },
    ],

    rows: [
      {
        title: (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            Apartment for Rent
          </VuiTypography>
        ),
        category: (
          <VuiTypography color="text" variant="button">
            Real Estate
          </VuiTypography>
        ),
        client: (
          <VuiBox display="flex" alignItems="center" gap="8px">
            {clientAvatar(avatar1, "Ryan Tompson")}
            <VuiTypography color="white" variant="button">Ryan Tompson</VuiTypography>
          </VuiBox>
        ),
        price: (
          <VuiTypography color="white" variant="button" fontWeight="bold">
            $120
          </VuiTypography>
        ),
        status: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              Approved
            </VuiTypography>
            <VuiProgress value={100} color="success" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        title: (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            Hiring Java Developer
          </VuiTypography>
        ),
        category: (
          <VuiTypography color="text" variant="button">
            Jobs
          </VuiTypography>
        ),
        client: (
          <VuiBox display="flex" alignItems="center" gap="8px">
            {clientAvatar(avatar2, "Romina Hadid")}
            <VuiTypography color="white" variant="button">Romina Hadid</VuiTypography>
          </VuiBox>
        ),
        price: (
          <VuiTypography color="white" variant="button" fontWeight="bold">
            $300
          </VuiTypography>
        ),
        status: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              Pending
            </VuiTypography>
            <VuiProgress value={50} color="warning" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        title: (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            Plumbing Services
          </VuiTypography>
        ),
        category: (
          <VuiTypography color="text" variant="button">
            Services
          </VuiTypography>
        ),
        client: (
          <VuiBox display="flex" alignItems="center" gap="8px">
            {clientAvatar(avatar3, "Alexander Smith")}
            <VuiTypography color="white" variant="button">Alexander Smith</VuiTypography>
          </VuiBox>
        ),
        price: (
          <VuiTypography color="white" variant="button" fontWeight="bold">
            $180
          </VuiTypography>
        ),
        status: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              Paid
            </VuiTypography>
            <VuiProgress value={100} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
    ],
  };
}
