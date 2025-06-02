// src/components/Welcome.jsx
import React, { useState, useEffect } from "react";
import { Card, Icon } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import welcome from "assets/images/welcome-profile.png";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";

export default function Welcome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => setUser(data))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);


  return (
    <Card
      sx={({ breakpoints }) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: `url(${welcome})`,
        backgroundSize: "cover",
        borderRadius: "20px",
        height: "100%",
        [breakpoints.only("xl")]: {
          gridArea: "1 / 1 / 2 / 2",
        },
      })}
    >
      <VuiBox sx={{ p: 3 }}>
        <VuiTypography
          component={Link}
          to="/ads/create"
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: "translate(2px, -0.5px)",
              transition: "transform 0.2s",
            },
            "&:hover .material-icons-round": {
              transform: "translate(6px, -0.5px)",
            },
          }}
        >
          Create a new ad
          <Icon sx={{ fontWeight: "bold", ml: 1 }}>arrow_forward</Icon>
        </VuiTypography>
      </VuiBox>
    </Card>
  );
}
