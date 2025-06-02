// src/pages/Home.jsx
import React from 'react';
import HomeLayout from 'examples/LayoutContainers/HomeLayout';
import HomeNavbar from 'examples/Navbars/HomeNavbar';
import HomeGreeting from './components/Greeting';
import VuiBox from 'components/VuiBox';
import AnimatedPage from 'layouts/components/pages';

function Home() {
  return (
    <HomeLayout>
      <AnimatedPage>
        <HomeNavbar />
          <VuiBox
            component="main"
            px={{ xs: 2, md: 4 }}
            py={{ xs: 4, md: 6 }}
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          <HomeGreeting />
        </VuiBox>
      </AnimatedPage>
    </HomeLayout>
  );
}

export default Home;
