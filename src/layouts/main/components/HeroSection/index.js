import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const phrases = ['Create', 'Manage', 'Take a break'];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    let timer;

    if (!deleting && subIndex < phrases[index].length) {
      timer = setTimeout(() => {
        setSubIndex(subIndex + 1);
        setText(phrases[index].slice(0, subIndex + 1));
      }, 100);
    } else if (!deleting && subIndex === phrases[index].length) {
      timer = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && subIndex > 0) {
      timer = setTimeout(() => {
        setSubIndex(subIndex - 1);
        setText(phrases[index].slice(0, subIndex - 1));
      }, 80);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [subIndex, index, deleting]);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{ py: 10, textAlign: 'center', bgcolor: 'transparent' }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" sx={{ color: '#fff', mb: 2 }}>
          Welcome to Paper Verse
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: '#fff',
            animation: 'glowText 3s ease-in-out infinite',
          }}
        >
          {text}
          <Box
            component="span"
            sx={{
              borderLeft: '2px solid currentColor',
              ml: 0.5,
              animation: 'blink 1s step-end infinite',
            }}
          />
        </Typography>
      </Container>
      <style>{`
        @keyframes blink {
          0%,100% { border-color: transparent; }
          50% { border-color: currentColor; }
        }
        @keyframes glowText {
          0%,100% { text-shadow: 0 0 8px rgba(255,255,255,0.5); }
          50% { text-shadow: 0 0 16px rgba(255,255,255,0.8); }
        }
      `}</style>
    </Box>
  );
}
