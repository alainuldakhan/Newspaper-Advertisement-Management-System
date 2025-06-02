import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "hooks/useAuth";
import { Card, LinearProgress, Icon } from "@mui/material";
import { motion } from "framer-motion";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import gif from "assets/images/cardimgfree.png";
import { roleContentGreeting } from "../../config";

/**
 * HomeGreeting shows personalized welcome, fetching userName from server.
 */
const HomeGreeting = () => {
  const { role } = useAuth();
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { description, cta } = roleContentGreeting[role] || roleContentGreeting.advertiser;

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/Auth/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserName(data.userName || userName);
      } catch {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card
      sx={{
        height: "340px",
        position: "relative",
        backgroundImage: `url(${gif})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loading && (
        <LinearProgress
          color="info"
          sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}
        />
      )}

      <VuiBox
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        px={3}
        py={2}
      >
        {error ? (
          <VuiTypography color="error" variant="button">
            {error}
          </VuiTypography>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }}>
            <VuiTypography
              color="text"
              variant="button"
              fontWeight="regular"
              mb="8px"
            >
              Hi, 👋
            </VuiTypography>
            <VuiTypography
              color="white"
              variant="h3"
              fontWeight="bold"
              mb="16px"
            >
              {userName}
            </VuiTypography>
          </motion.div>
        )}

        <VuiTypography color="text" variant="h6" fontWeight="regular" mb={2}>
          {description.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </VuiTypography>

        <VuiTypography
          component="a"
          href={cta.href}
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: "translate(2px, -0.5px)",
              transition: "transform 0.2s ease",
            },
            "&:hover .material-icons-round, &:focus .material-icons-round": {
              transform: "translate(6px, -0.5px)",
            },
          }}
        >
          {cta.text}
          <Icon className="material-icons-round" sx={{ ml: 0.5 }}>
            arrow_forward
          </Icon>
        </VuiTypography>
      </VuiBox>
    </Card>
  );
};

export default HomeGreeting;
