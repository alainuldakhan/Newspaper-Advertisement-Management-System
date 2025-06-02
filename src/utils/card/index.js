import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";


const AdImage = ({ file }) =>
  file ? (
    <Box
      component="img"
      src={URL.createObjectURL(file)}
      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  ) : null;

export function NewspaperAdCard({ rect, ad, pvSize }) {
  const { business_name, title, description, product_name, product_image } = ad;

  return (
    <Box
      sx={{
        position: "absolute",
        top: rect.yPct * pvSize.h,
        left: rect.xPct * pvSize.w,
        width: rect.wPct * pvSize.w,
        height: rect.hPct * pvSize.h,
        bgcolor: "#ddd",
        border: "none",
        borderRadius: 0,
        boxShadow: "none",
        p: 1.5,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700}}>
          {business_name.toUpperCase()}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "serif", mt: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.4, fontFamily: "serif", mt: 0.5 }}>
          {description}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontStyle: "italic", fontFamily: "serif", mt: 0.5 }}>
          {product_name}
        </Typography>
      </Box>

      <Box
        sx={{
          height: "50%",
          mt: 1,
          overflow: "hidden",
          borderRadius: 4,
          "&img":{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "0.3s",
            filter: "grayscale(1)",
            "&:hover": {
              transform: "scale(1.05)",
              filter: "grayscale(0)",
            },
          },
        }}
      >
        <AdImage file={product_image} />
      </Box>
    </Box>
  );
}

NewspaperAdCard.propTypes = {
  rect: PropTypes.shape({
    xPct: PropTypes.number,
    yPct: PropTypes.number,
    wPct: PropTypes.number,
    hPct: PropTypes.number,
  }).isRequired,
  pvSize: PropTypes.shape({ w: PropTypes.number, h: PropTypes.number }).isRequired,
  ad: PropTypes.object.isRequired,
};