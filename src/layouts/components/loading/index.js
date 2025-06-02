import React from 'react';
import { Box, Typography, CircularProgress, Fade } from '@mui/material';

export default function Loading() {
  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'background.default',
          px: 2,
        }}
      >
        <CircularProgress
          size={64}
          thickness={4}
          color="primary"
        />

        <Typography
          variant="h4"
          color="primary.main"
          sx={{ mt: 2, fontWeight: 500 }}
        >
          Loading…
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1, maxWidth: 300, textAlign: 'center' }}
        >
          Please wait while the page is loading
        </Typography>
      </Box>
    </Fade>
  );
}
