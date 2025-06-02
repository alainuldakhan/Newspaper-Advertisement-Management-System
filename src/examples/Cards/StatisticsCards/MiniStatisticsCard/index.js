import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function MiniStatisticsCard({ bgColor, title, count, percentage, icon, direction }) {
  const iconBox = (
    <VuiBox
      bgColor={icon.color || "info"}
      color="#fff"
      width="3rem"
      height="3rem"
      borderRadius="lg"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ boxShadow: 3 }}
    >
      {typeof icon.component === "string" ? (
        <Icon fontSize="small">{icon.component}</Icon>
      ) : (
        icon.component
      )}
    </VuiBox>
  );

  return (
    <Card
      sx={{
        padding: "17px",
        backgroundColor: bgColor === "white" ? "white" : "background.paper",
        color: bgColor === "white" ? "text.primary" : "white",
      }}
    >
      <Grid container alignItems="center">
        {direction === "left" && <Grid item>{iconBox}</Grid>}
        <Grid item xs>
          <VuiBox ml={direction === "left" ? 2 : 0}>
            <VuiTypography
              variant="caption"
              color={bgColor === "white" ? "text" : "white"}
              opacity={bgColor === "white" ? 1 : 0.7}
              fontWeight={title.fontWeight}
              textTransform="capitalize"
            >
              {title.text}
            </VuiTypography>
            <VuiTypography variant="subtitle1" fontWeight="bold" color="white">
              {count}{" "}
              {percentage.text && (
                <VuiTypography variant="button" color={percentage.color} fontWeight="bold">
                  {percentage.text}
                </VuiTypography>
              )}
            </VuiTypography>
          </VuiBox>
        </Grid>
        {direction === "right" && <Grid item>{iconBox}</Grid>}
      </Grid>
    </Card>
  );
}

MiniStatisticsCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

MiniStatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.string,
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default MiniStatisticsCard;
