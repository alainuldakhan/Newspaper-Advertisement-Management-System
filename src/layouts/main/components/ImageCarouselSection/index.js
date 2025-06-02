import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image1 from 'assets/images/img1.png';

const images = [Image1, Image1, Image1, Image1];

export default function ImageCarouselSection() {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [page]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.8 }),
    center:    { x: 0, opacity: 1, scale: 1 },
    exit:  (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0, scale: 0.8 }),
  };

  return (
    <Box sx={{ py: 8, position: 'relative', background: 'transparent' }}>
      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <Box
          sx={{
            overflow: 'hidden',
            borderRadius: 9,
            position: 'relative',
            mx: 'auto',
            width: '100%',
            maxWidth: 800,
            height: 600,
            boxShadow: '0 8px 42px rgba(0,0,0,0.6)',      
          }}
        >
        <AnimatePresence initial={false} exitBeforeEnter>
          <motion.img
            key={page}
            src={images[imageIndex]}
            variants={{
              enter:  { opacity: 0 },
              center: { opacity: 1 },
              exit:   { opacity: 0 },
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' }
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </AnimatePresence>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {images.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => setPage([idx, idx > imageIndex ? 1 : -1])}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: idx === imageIndex ? 'white.main' : 'dark.main',
                m: '0 5px',
                cursor: 'pointer',
                boxShadow: idx === imageIndex
                  ? '0 0 8px rgba(255,255,255,0.8)'
                  : 'none',
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
