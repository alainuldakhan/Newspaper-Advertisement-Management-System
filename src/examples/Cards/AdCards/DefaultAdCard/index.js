import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon, CircularProgress } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import { toast } from "react-toastify";

function AdCard({
  id,
  image,
  category,
  categoryIcon,
  title,
  description,
  price,
  datePosted,
  status,
  isPromo,
  action,
  onDelete,
  deleteUrl,
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this ad?");
    if (!confirm) return;

    setDeleting(true);
    try {
      const res = await fetch(`${deleteUrl}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Ad deleted successfully.");
      if (onDelete) onDelete(id);
    } catch (err) {
      toast.error("Error deleting ad.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <VuiBox
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        overflow: "visible",
        position: "relative",
        border: "1px solid #444",
        borderRadius: "15px",
        p: 2,
      }}
    >
      {isPromo && (
        <VuiBox
          position="absolute"
          top="10px"
          right="10px"
          px={1}
          py={0.5}
          borderRadius="lg"
          bgcolor="warning.main"
        >
          <VuiTypography variant="caption" color="white" fontWeight="bold">
            PROMO
          </VuiTypography>
        </VuiBox>
      )}

      <VuiBox
        component="img"
        src={image}
        alt={title}
        loading="lazy"
        mb="8px"
        borderRadius="10px"
        height="200px"
        sx={{ objectFit: "cover" }}
      />

      <VuiBox mb={1} display="flex" alignItems="center" gap={1}>
        {categoryIcon && <Icon>{categoryIcon}</Icon>}
        <VuiTypography variant="button" color="text" textTransform="capitalize">
          {category}
        </VuiTypography>
      </VuiBox>

      <VuiTypography
        component={action.type === "internal" ? Link : "a"}
        to={action.type === "internal" ? action.route : undefined}
        href={action.type === "external" ? action.route : undefined}
        variant="h5"
        color="white"
        textTransform="capitalize"
        rel={action.type === "external" ? "noreferrer" : undefined}
        target={action.type === "external" ? "_blank" : undefined}
      >
        {title}
      </VuiTypography>

      <VuiTypography variant="button" color="text" mt={1}>
        {description}
      </VuiTypography>

      <VuiBox mt={2} display="flex" flexDirection="column" gap={0.5}>
        {price && (
          <VuiTypography variant="caption" color="text">
            Price: <strong>{price} ₸</strong>
          </VuiTypography>
        )}
        {status && (
          <VuiTypography variant="caption" color="text">
            Status:{" "}
            {status === "active"
              ? "Active"
              : status === "archived"
              ? "Archived"
              : "Under moderation"}
          </VuiTypography>
        )}
        {datePosted && (
          <VuiTypography variant="caption" color="text">
            Published: {datePosted}
          </VuiTypography>
        )}
      </VuiBox>

      <VuiBox mt={2} display="flex" gap={1}>
        <VuiButton
          component={action.type === "internal" ? Link : "a"}
          to={action.type === "internal" ? action.route : undefined}
          href={action.type === "external" ? action.route : undefined}
          variant="outlined"
          size="small"
          color={action.color}
          rel={action.type === "external" ? "noreferrer" : undefined}
          target={action.type === "external" ? "_blank" : undefined}
        >
          {action.label}
        </VuiButton>
        <VuiButton variant="text" size="small" color="error" onClick={handleDelete} disabled={deleting}>
          {deleting ? <CircularProgress size={16} color="inherit" /> : "Delete"}
        </VuiButton>
      </VuiBox>
    </VuiBox>
  );
}

AdCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  categoryIcon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  datePosted: PropTypes.string,
  status: PropTypes.oneOf(["active", "archived", "moderation"]),
  isPromo: PropTypes.bool,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
  deleteUrl: PropTypes.string.isRequired,
};

AdCard.defaultProps = {
  isPromo: false,
  status: "active",
};

export default AdCard;
