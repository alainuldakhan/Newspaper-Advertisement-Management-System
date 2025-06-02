import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import VuiBox from "components/VuiBox";
import HomeLayout from "examples/LayoutContainers/HomeLayout";
import Header from "layouts/profile/components/Header";

const mockUser = null;
const mockAds = [];

function Overview() {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    setUser(mockUser);
    setAds(mockAds);
  }, []);

  return (
    <HomeLayout>
      <Header />
    </HomeLayout>
  );
}

export default Overview;
