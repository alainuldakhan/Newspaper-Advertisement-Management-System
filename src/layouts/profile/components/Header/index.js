// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import DashboardNavbar from "examples/Navbars/HomeNavbar";
import defaultAvatar from "assets/images/default-avatar.png";
import { IoCube, IoDocument, IoBuild } from "react-icons/io5";
import breakpoints from "assets/theme/base/breakpoints";

const API = process.env.REACT_APP_API_URL;

export default function Header() {
  const [user, setUser] = useState(null);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  // 1. Пробрасываем новый эндпоинт /api/v1/Auth/me
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get(`${API}/api/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setUser({
          fullName: data.fullName, // если хотите отдельно fullName, храните его в state
          email:    data.email,      // если хотите отдельно role, храните его в state
          avatarUrl: null,          // или data.avatarUrl, если возвращаете из бэка
        });
      })
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const resize = () => {
      setTabsOrientation(
        window.innerWidth < breakpoints.values.lg ? "vertical" : "horizontal"
      );
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  const displayName  = user?.fullName  || "Guest";
  const displayEmail = user?.email     || "guest@example.com";
  const avatar       = user?.avatarUrl || defaultAvatar;

  return (
    <VuiBox position="relative">
      <DashboardNavbar light />
      <Card sx={{ px:3, mt:2 }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} md={1.7} lg={1.5} xl={1.2} xxl={0.8} display="flex" justifyContent="center">
            <VuiAvatar src={avatar} alt="profile-image" variant="rounded" size="xl" shadow="sm" />
          </Grid>
          <Grid item xs={12} md={4.3} lg={4} xl={3.8} xxl={7}>
            <VuiBox display="flex" flexDirection="column" mt={0.5} lineHeight={1}>
              <VuiTypography variant="lg" color="white" fontWeight="bold">
                {displayName}
              </VuiTypography>
              <VuiTypography variant="button" color="text" fontWeight="regular">
                {displayEmail}
              </VuiTypography>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6.5} xl={6} xxl={4} sx={{ ml:"auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={(_,v)=>setTabValue(v)}
                sx={{ background:"transparent", justifyContent:"flex-end" }}
              >
                <Tab label="OVERVIEW" icon={<IoCube color="white" size="16px"/>}/>
                <Tab label="SETTINGS" icon={<IoBuild color="white" size="16px"/>}/>
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}
