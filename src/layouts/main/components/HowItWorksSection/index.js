import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const steps = [
  {
    numberIcon: <LooksOneIcon fontSize="large" />,
    title: 'Registration',
    description: '3 Roles: Admin, Advertiser and Editor.',
  },
  {
    numberIcon: <LooksTwoIcon fontSize="large" />,
    title: 'Create Slot',
    description: 'Add an ad slot with your desired parameters.',
  },
  {
    numberIcon: <Looks3Icon fontSize="large" />,
    title: 'Launch Campaign',
    description: 'Start your ad and monitor its status.',
  },
  {
    numberIcon: <Looks4Icon fontSize="large" />,
    title: 'Analytics',
    description: 'Review stats and optimize campaigns.',
  },
];

export default function HowItWorksSection() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ color: '#fff', mb: 6 }}>
          How It Works
        </Typography>
        <Grid container spacing={4} alignItems="stretch">
          {steps.map((step, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Tilt
                  glareEnable
                  glareMaxOpacity={0.15}
                  glareColor="#ffffff"
                  glarePosition="all"
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={700}
                  style={{ height: '100%', width: '100%' }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',          
                      minHeight: 270,          
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                      textAlign: 'center',
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          color: 'dark.main',
                          flexDirection: 'column',
                          alignItems: 'center',
                          mb: 3,
                        }}
                      >
                        {step.numberIcon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ color: '#fff', mb: 1, fontWeight: 500 }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}
                      >
                        {step.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Tilt>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
