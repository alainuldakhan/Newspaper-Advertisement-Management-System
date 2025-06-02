// src/components/SucessBackDrop.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SucessBackDrop() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={999}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      <Box
        bgcolor="#fff"
        p={3}
        width={{ xs: '80%', sm: '50%', md: '30%' }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        boxShadow="0 0 10px rgba(0,0,0,0.3)"
      >
        <CheckCircleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6">Submitted</Typography>
      </Box>
    </Box>
  );
}

SucessBackDrop.propTypes = {};
