import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import { RiMastercardFill } from "react-icons/ri";

import billingCard from "assets/images/billing-background-card.png";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function MasterCard({ number, valid, cvv, masked = false }) {
  const isValidNumber = typeof number === "string" && /^\d{16}$/.test(number);
  const isValidDate = typeof valid === "string" && /^\d{2}\/\d{2}$/.test(valid);
  const isValidCVV = typeof cvv === "string" && /^\d{3,4}$/.test(cvv);

  if (!isValidNumber || !isValidDate || !isValidCVV) {
    return (
      <Card sx={{ background: `url('${billingCard}')`, backdropFilter: "blur(31px)" }}>
        <VuiBox p={3}>
          <VuiTypography variant="h6" color="error">
            Invalid card data
          </VuiTypography>
        </VuiBox>
      </Card>
    );
  }

  const displayNumber = masked
    ? number.replace(/\d{12}(\d{4})/, "•••• •••• •••• $1")
    : number.match(/.{1,4}/g).join("   ");

  return (
    <Card sx={{ background: `url('${billingCard}')`, backdropFilter: "blur(31px)" }}>
      <VuiBox p={3} pt={2}>
        <VuiBox
          color="white"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <VuiTypography color="white" variant="lg" fontWeight="bold">
            Paper Verse
          </VuiTypography>
          <RiMastercardFill size="48px" color="white" />
        </VuiBox>

        <VuiTypography
          variant="h4"
          color="white"
          fontWeight="medium"
          sx={{ mt: 8, pb: 1, fontSize: { sm: "22px", md: "26px" } }}
        >
          {displayNumber}
        </VuiTypography>

        <VuiBox display="flex" justifyContent="space-between">
          <VuiBox>
            <VuiTypography variant="xxs" color="white" fontWeight="medium" opacity={0.8}>
              VALID THRU
            </VuiTypography>
            <VuiTypography variant="h6" color="white" fontWeight="medium">
              {valid}
            </VuiTypography>
          </VuiBox>
          <VuiBox>
            <VuiTypography variant="xxs" color="white" fontWeight="medium" opacity={0.8}>
              CVV
            </VuiTypography>
            <VuiTypography variant="h6" color="white" fontWeight="medium">
              {masked ? "***" : cvv}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

MasterCard.propTypes = {
  number: PropTypes.string.isRequired,
  valid: PropTypes.string.isRequired,
  cvv: PropTypes.string.isRequired,
  masked: PropTypes.bool,
};

export default MasterCard;
