// src/layouts/user/advertiser/MyAds.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeLayout from "examples/LayoutContainers/HomeLayout";
import HomeNavbar from "examples/Navbars/HomeNavbar";
import Footer from "examples/Footer";
import { Grid, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";

export default function MyAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/ads`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAds(data);
      } catch (err) {
        console.error("Failed to load ads:", err);
        setError("Unable to load your ads.");
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  return (
    <HomeLayout>
      <HomeNavbar />
      <Box p={3}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : ads.length === 0 ? (
          <Typography align="center">You have no ads yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {ads.map(({ id, title, description, businessName, createdAt }) => (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom noWrap>
                      {description}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Business: {businessName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </HomeLayout>
  );
}
