import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function Separator({ text = "or", size = "button", color = "text" }) {
  return (
    <VuiBox position="relative" py={0.5}>
      <Divider role="separator" aria-orientation="horizontal" />
      <VuiBox
        position="absolute"
        top="50%"
        left="50%"
        px={2}
        lineHeight={1}
        sx={({ palette }) => ({
          backgroundColor: palette.background.paper,
          transform: "translate(-50%, -50%)",
        })}
      >
        <VuiTypography variant={size} fontWeight="medium" color={color}>
          {text}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

Separator.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf(["caption", "button", "body1", "body2"]),
  color: PropTypes.string,
};

export default Separator;
