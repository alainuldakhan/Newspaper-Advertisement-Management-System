import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Box, Typography, useTheme } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check";
import { motion, AnimatePresence } from 'framer-motion';

const MotionButton = motion(ButtonBase);

function AdOptionBox({
  type,
  checked,
  onChecked,
  AdOptionImg,
  AdOptionText,
  disabled = false,
}) {
  const theme = useTheme();

  const handleToggle = () => {
    if (!disabled) onChecked(type);
  };

  const indicatorPosition = {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
  };

  return (
    <MotionButton
      onClick={handleToggle}
      onKeyDown={e => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          handleToggle();
        }
      }}
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      initial={false}
      animate={{
        boxShadow: checked
          ? '0 0 8px 2px rgba(255,255,255,0.8)'
          : theme.shadows[1],
      }}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        bgcolor: 'transparent',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        '&:hover': { transform: disabled ? 'none' : 'scale(1.03)' },
        transition: theme.transitions.create(['transform','opacity'], {
          duration: theme.transitions.duration.short,
        }),
      }}
    >
      <AnimatePresence>
        {checked && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              ...indicatorPosition,
              width: 32,
              height: 32,
              backgroundColor: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckIcon sx={{ color: theme.palette.success.main, fontSize: 20 }} />
          </motion.div>
        )}
      </AnimatePresence>

      <Box sx={{ flexGrow: 1, textAlign: 'center', px: 2, py: 1 }}>
        <Box
          component="img"
          src={AdOptionImg}
          alt={AdOptionText}
          sx={{ width: '80%', display: 'block', mx: 'auto' }}
        />
      </Box>

      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" color="#fff">
          {AdOptionText}
        </Typography>
      </Box>
    </MotionButton>
  );
}

AdOptionBox.propTypes = {
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChecked: PropTypes.func.isRequired,
  AdOptionImg: PropTypes.string.isRequired,
  AdOptionText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default React.memo(AdOptionBox);
