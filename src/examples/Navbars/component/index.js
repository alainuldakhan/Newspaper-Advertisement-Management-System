import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import VuiTypography from "components/VuiTypography";
import { navbarConfig } from "../config";

export default function RoleNavbar({ role }) {
  const navigate = useNavigate();
  const items = navbarConfig[role] || [];

  const [anchorEl, setAnchorEl] = useState(null);
  const [openIdx, setOpenIdx] = useState(null);
  const isOpen = (idx) => openIdx === idx;

  const handleOpen = (e, idx) => {
    setAnchorEl(e.currentTarget);
    setOpenIdx(idx);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenIdx(null);
  };

  // Универсальная логика клика по пункту
  const handleItemClick = (item) => {
    handleClose();
    if (typeof item.onClick === "function") {
      item.onClick();
      // после logout ведём на страницу входа
      navigate("/authentication/sign-in");
    } else if (item.to) {
      navigate(item.to);
    }
  };

  return (
    <Box component="nav" sx={{ display: "flex", gap: 3 }}>
      {items.map((item, idx) => {
        const hasChildren = Array.isArray(item.children);

        return (
          <Box key={item.label}>
            <Button
              onClick={(e) =>
                hasChildren
                  ? handleOpen(e, idx)
                  : handleItemClick(item)
              }
              endIcon={
                hasChildren && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    animate={{ rotate: isOpen(idx) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex" }}
                  >
                    <KeyboardArrowDownIcon sx={{ fontSize: 14, color: "#fff" }} />
                  </motion.div>
                )
              }
              sx={{
                color: "#fff",
                background: "transparent",
                textTransform: "none",
                px: 1,
                "&:hover": { background: "rgba(255,255,255,0.1)" },
                "&:focus": { background: "rgba(255,255,255,0.2)" },
              }}
            >
              <VuiTypography variant="button" sx={{ color: "#fff" }}>
                {item.label}
              </VuiTypography>
            </Button>

            {hasChildren && (
              <AnimatePresence>
                {isOpen(idx) && (
                  <Menu
                    anchorEl={anchorEl}
                    open
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 200 }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    PaperProps={{
                      sx: {
                        backgroundColor: "transparent",
                        backgroundImage: "none",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        p: 0,
                        borderRadius: 0,
                      },
                    }}
                    MenuListProps={{
                      sx: { p: 0, background: "transparent" },
                      autoFocus: false,
                    }}
                  >
                    {item.children.map((sub) => (
                      <MenuItem
                        key={sub.label}
                        component={motion.li}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleItemClick(sub)}
                        sx={{
                          color: "#fff",
                          py: 1,
                          px: 2,
                          background: "transparent",
                          "&:hover": { background: "rgba(255,255,255,0.1)" },
                          "&.Mui-focusVisible": { background: "rgba(255,255,255,0.2)" },
                        }}
                      >
                        <VuiTypography variant="body2" sx={{ color: "#fff" }}>
                          {sub.label}
                        </VuiTypography>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </AnimatePresence>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

RoleNavbar.propTypes = {
  role: PropTypes.oneOf(["administrator", "editor", "advertiser"]).isRequired,
};
