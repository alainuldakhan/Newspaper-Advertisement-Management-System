import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <AddBoxIcon fontSize="large" />,
    title: 'Create Ads',
    description: 'Design and create an ad slot yourself.',
  },
  {
    icon: <BarChartIcon fontSize="large" />,
    title: 'View Analytics',
    description: 'Monitor performance with real-time statistics.',
  },
  {
    icon: <PersonIcon fontSize="large" />,
    title: 'Manage Profile',
    description: 'Customize your account settings and preferences.',
  },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ color: '#fff', mb: 4 }}>
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.25, duration: 0.7 }}
              >
                <Tilt
                  glareEnable
                  glareMaxOpacity={0.25}
                  glareColor="#ffffff"
                  glarePosition="all"
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  perspective={800}
                  style={{ height: '100%', width: '100%' }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      p: 4,
                      textAlign: 'center',
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(12px)',
                      transformStyle: 'preserve-3d',
                      transition: 'box-shadow 0.3s ease',
                      boxShadow: '0 0 0 rgba(0,0,0,0)',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                      },
                    }}
                  >
                    <Box sx={{ mb: 2, color: 'dark.main', transform: 'translateZ(40px)' }}>
                      {f.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ color: '#fff', mb: 1, transform: 'translateZ(30px)' }}
                    >
                      {f.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255,255,255,0.75)', transform: 'translateZ(20px)' }}
                    >
                      {f.description}
                    </Typography>
                  </Box>
                </Tilt>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
