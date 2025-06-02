// src/layouts/components/StandardButton.jsx
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

export default function StandardButton({
  displayText,
  sx,
  disabled,
  onClick,
  type,
}) {
  return (
    <Button
      variant="outlined"
      type={type}
      disabled={disabled}
      onClick={onClick}
      sx={{
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.7)",
        color: "#fff",
        backgroundColor: "transparent",
        borderRadius: 2,
        textTransform: "none",
        px: 5,
        py: 2,
        
        "@keyframes shine": {
          "0%":   { left: "-150%" },
          "100%": { left: "150%" },
        },

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-150%",
          width: "50%",
          height: "100%",
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
          transform: "skewX(-20deg)",
        },

        "&:hover::before": {
          animation: "shine 1.2s infinite ease-out",
        },

        // 4) остальные эффекты
        "&:active": {
          backgroundColor: "rgba(255,255,255,0.1)",
        },
        "&.Mui-disabled": {
          borderColor: "rgba(255,255,255,0.3)",
          color: "rgba(255,255,255,0.3)",
        },

        ...sx,
      }}
    >
      {displayText}
    </Button>
  );
}

StandardButton.propTypes = {
  displayText: PropTypes.string.isRequired,
  sx: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

StandardButton.defaultProps = {
  sx: {},
  disabled: false,
  onClick: undefined,
  type: "button",
};
