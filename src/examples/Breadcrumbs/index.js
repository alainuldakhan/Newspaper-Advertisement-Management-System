// src/examples/Breadcrumbs/index.jsx
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@mui/material/Icon';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import { motion } from 'framer-motion';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';

function Breadcrumbs({ icon, light }) {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  return (
    <VuiBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        separator='/'
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& .MuiBreadcrumbs-separator': {
            mx: 1,
            color: light ? 'rgba(255,255,255,0.8)' : 'rgba(96,96,96,0.6)',
          },
        }}
      >
        {/* Home icon */}
        <Link to='/home' style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ display: 'inline-block', cursor: 'pointer' }}
          >
            <VuiTypography
              component='span'
              variant='body2'
              color={light ? 'white' : 'dark'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                opacity: light ? 0.8 : 0.5,
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 1 }
              }}
            >
              <Icon sx={{ verticalAlign: 'middle', mr: 0.5 }}>{icon}</Icon>
            </VuiTypography>
          </motion.div>
        </Link>

        {/* Dynamic segments */}
        {segments.map((seg, idx) => {
          const path = `/${segments.slice(0, idx + 1).join('/')}`;
          const isLast = idx === segments.length - 1;

          return (
            <Link key={path} to={path} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{ display: 'inline-block', cursor: 'pointer' }}
              >
                <VuiTypography
                  variant={isLast ? 'button' : 'body2'}
                  fontWeight={isLast ? 'bold' : 'regular'}
                  textTransform='capitalize'
                  color={light ? 'white' : 'dark'}
                  sx={{
                    opacity: light ? 0.8 : 0.5,
                    transition: 'opacity 0.2s, color 0.2s',
                    '&:hover': { opacity: 1, color: light ? 'white' : 'rgba(255,255,255,0.8)' }
                  }}
                >
                  {seg.replace('-', ' ')}
                </VuiTypography>
              </motion.div>
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </VuiBox>
  );
}

Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  light: PropTypes.bool,
};

Breadcrumbs.defaultProps = {
  light: false,
};

export default Breadcrumbs;
