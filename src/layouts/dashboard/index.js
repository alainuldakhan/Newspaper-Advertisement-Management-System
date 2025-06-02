// src/pages/Dashboard.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, Stack } from "@mui/material";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import HomeLayout from "examples/LayoutContainers/HomeLayout";
import HomeNavbar from "examples/Navbars/HomeNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import AdvertisementTable from "layouts/dashboard/components/AdTable";
import AdsOverview from "layouts/dashboard/components/AdOrderOverview";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  const safeLineChartData =
    Array.isArray(lineChartDataDashboard) &&
    lineChartDataDashboard.some((item) => Array.isArray(item.data) && item.data.length > 0)
      ? lineChartDataDashboard
      : [{ name: "No Data", data: [0] }];

  const safeBarChartData =
    Array.isArray(barChartDataDashboard) &&
    barChartDataDashboard.length > 0 &&
    Array.isArray(barChartDataDashboard[0]?.data) &&
    barChartDataDashboard[0].data.length > 0
      ? barChartDataDashboard
      : [{ name: "No Data", data: [0] }];

  return (
    <HomeLayout>
      <HomeNavbar />
      <VuiBox py={3}>
        {/* Cards */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ad Revenue Today", fontWeight: "regular" }}
                count="$53,000"
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Active Ads", fontWeight: "regular" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "New Advertisers", fontWeight: "regular" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Ad Revenue", fontWeight: "regular" }}
                count="$103,430"
                percentage={{ color: "success", text: "+10%" }}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>

        {/* Charts */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Sales Overview
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    {/* Optional description */}
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={safeLineChartData}
                      lineChartOptions={lineChartOptionsDashboard()}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>

            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    <BarChart
                      barChartData={safeBarChartData}
                      barChartOptions={barChartOptionsDashboard()}
                    />
                  </VuiBox>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Ad Status Overview
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    {/* Optional summary */}
                  </VuiBox>
                  {/* Status Cards */}
                  <Grid container spacing="50px">
                    {[
                      { label: "Pending Ads", icon: <IoIosRocket />, count: 120, progress: 40 },
                      { label: "Approved Ads", icon: <IoDocumentText />, count: 150, progress: 75 },
                      { label: "Paid Ads", icon: <FaShoppingCart />, count: 200, progress: 100 },
                      { label: "Rejected Ads", icon: <IoBuild />, count: 15, progress: 10 },
                    ].map((item, i) => (
                      <Grid item xs={6} md={3} lg={3} key={i}>
                        <Stack
                          direction="row"
                          spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                          mb="6px"
                        >
                          <VuiBox
                            bgColor="info"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                          >
                            {item.icon}
                          </VuiBox>
                          <VuiTypography color="text" variant="button" fontWeight="medium">
                            {item.label}
                          </VuiTypography>
                        </Stack>
                        <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                          {item.count}
                        </VuiTypography>
                        <VuiProgress value={item.progress} color="info" sx={{ background: "#2D2E5F" }} />
                      </Grid>
                    ))}
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>

        {/* Tables */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <AdvertisementTable />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AdsOverview />
          </Grid>
        </Grid>
      </VuiBox>

      <Footer />
    </HomeLayout>
  );
}

export default Dashboard;
