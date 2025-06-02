import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 4px rgba(255,255,255,0.5); }
  50%   { box-shadow: 0 0 8px rgba(255,255,255,0.9); }
`;

export default function GlowDivider({ sx = {} }) {
  return (
    <Box
      sx={{
        height: '0.1px',
        width: '100%',
        backgroundColor: '#fff',
        animation: `${pulse} 2s ease-in-out infinite`,
        ...sx,
      }}
    />
  );
}
