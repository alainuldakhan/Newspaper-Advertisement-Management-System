// src/components/StandardContainer.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function StandardContainer({ children }) {
  return (
    <Box
      sx={{
        minHeight: '85vh',
        m: '30px',
        border: '1px solid #dadada',
        borderRadius: '5px',
        p: '20px',
      }}
    >
      {children}
    </Box>
  );
}

StandardContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
