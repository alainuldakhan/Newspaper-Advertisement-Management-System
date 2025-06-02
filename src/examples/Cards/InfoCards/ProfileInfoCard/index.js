import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import typography from "assets/theme/base/typography";

function ProfileInfoCard({ title, description, info, social, onEdit }) {
  const { size } = typography;

  const renderInfo = Object.entries(info).map(([label, value]) => (
    <VuiBox key={label} display="flex" py={1} pr={2} sx={{ wordBreak: "break-word" }}>
      <VuiTypography
        variant="button"
        color="text"
        fontWeight="regular"
        textTransform="capitalize"
        sx={{ minWidth: "100px" }}
      >
        {label.replace(/([A-Z])/g, " $1").trim()}:
      </VuiTypography>
      <VuiTypography variant="button" fontWeight="regular" color="white" ml={1}>
        {value || "—"}
      </VuiTypography>
    </VuiBox>
  ));

  const renderSocial = social?.length > 0 && (
    <VuiBox display="flex" py={1} pr={2} color="white" alignItems="center">
      <VuiTypography
        variant="button"
        fontWeight="regular"
        color="text"
        textTransform="capitalize"
        sx={{ minWidth: "100px" }}
      >
        Social:
      </VuiTypography>
      {social.map(({ link, icon }, index) => (
        <VuiBox
          key={index}
          component="a"
          href={link}
          target="_blank"
          rel="noreferrer"
          fontSize={size.lg}
          color="white"
          pr={1}
          pl={0.5}
          lineHeight={1}
        >
          {icon}
        </VuiBox>
      ))}
    </VuiBox>
  );

  return (
    <Card sx={{ height: "100%", backgroundColor: "#1E1E2F", p: 2 }}>
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          {title}
        </VuiTypography>
        {onEdit && (
          <IconButton onClick={onEdit} sx={{ color: "white" }} size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </VuiBox>

      <VuiBox mb={2}>
        <VuiTypography variant="button" color="text" fontWeight="regular">
          {description}
        </VuiTypography>
      </VuiBox>

      <Divider sx={{ opacity: 0.3, mb: 2 }} />

      {renderInfo}
      {renderSocial}
    </Card>
  );
}

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      color: PropTypes.string,
    })
  ),
  onEdit: PropTypes.func,
};

ProfileInfoCard.defaultProps = {
  social: [],
  onEdit: null,
};

export default ProfileInfoCard;
