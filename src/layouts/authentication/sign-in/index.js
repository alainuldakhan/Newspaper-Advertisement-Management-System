import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../services/authService";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signInImage.png";

import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

export default function SignIn() {
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const gradient = radialGradient(
    palette.gradients.borderLight.main,
    palette.gradients.borderLight.state,
    palette.gradients.borderLight.angle
  );
  const inputBox = {
    borderRadius: borders.borderRadius.lg,
    padding: "1px",
    backgroundImage: gradient,
    transition: "0.3s ease",
    "&:hover": { boxShadow: "0 0 8px #00e0ff" },
    "&:focus-within": { boxShadow: "0 0 12px #00ffff" },
    position: 'relative'
  };
  const inputStyle = {
    px: 2,
    py: 1.5,
    fontSize: "14px",
    color: "#fff",
    "::placeholder": { color: "#ccc" },
    pr: '40px'
  };

  const validate = () => {
    const e = {};
    if (!identifier.trim()) e.identifier = "Email or username is required";
    if (!password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setLoading(true);
    try {
      const { accessToken, refreshToken, expiresAt } = await login({ identifier, password });
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("accessToken", accessToken);
      storage.setItem("refreshToken", refreshToken);
      storage.setItem("expiresAt", expiresAt);
      navigate("/home");
    } catch (err) {
      setErrors({ form: err.response?.data?.message || err.message || "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CoverLayout
      title="Nice to see you!"
      color="info"
      description="Enter your ad dimension and get started"
      premotto="EMPOWERING DIGITAL PUBLICATIONS:"
      motto="PAPER VERSE – YOUR ADVERTISING UNIVERSE"
      image={bgSignIn}
    >
      <VuiBox
        component="form"
        role="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 400,
          mx: 'auto',
          py: 4
        }}
      >
        <VuiBox mb={2}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium" mb={1}>
            Email or Username
          </VuiTypography>
          <GradientBorder sx={inputBox}>
            <VuiInput
              type="text"
              placeholder="Your email or username…"
              value={identifier}
              onChange={(e) => { setIdentifier(e.target.value); setErrors(prev => ({ ...prev, identifier: undefined })); }}
              onKeyDown={(e) => e.key === 'Enter' && passwordRef.current.focus()}
              sx={inputStyle}
              autoFocus
              aria-label="Email or Username"
              aria-invalid={!!errors.identifier}
            />
          </GradientBorder>
          {errors.identifier && (
            <VuiTypography role="alert" color="error" variant="caption" mt={1}>
              {errors.identifier}
            </VuiTypography>
          )}
        </VuiBox>

        <VuiBox mb={1}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium" mb={1}>
            Password
          </VuiTypography>
          <GradientBorder sx={inputBox}>
            <VuiInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password…"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              sx={inputStyle}
              inputRef={passwordRef}
              aria-label="Password"
              aria-invalid={!!errors.password}
            />
            <Box
              sx={{
                position: 'absolute',
                right: 10,
                top: '55%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? <FaEyeSlash color="#fff " /> : <FaEye color="#ccc" />}
            </Box>
          </GradientBorder>
          {errors.password && (
            <VuiTypography role="alert" color="error" variant="caption" mt={1}>
              {errors.password}
            </VuiTypography>
          )}
        </VuiBox>

        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{ color: '#fff' }} />}
          label={<VuiTypography variant="button" color="white">Remember me</VuiTypography>}
          style={{ marginBottom: 16 }}
        />

        {errors.form && (
          <VuiTypography role="alert" color="error" variant="caption" mb={2}>
            {errors.form}
          </VuiTypography>
        )}

        <VuiBox mt={2} mb={1}>
          <VuiButton fullWidth type="submit" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : null} color="info">
            {loading ? 'Signing in…' : 'SIGN IN'}
          </VuiButton>
        </VuiBox>

        <Fade in>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Don&apos;t have an account?{' '}
              <VuiTypography component={Link} to="/authentication/sign-up" variant="button" color="white" fontWeight="medium">
                Sign up
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </Fade>
      </VuiBox>
    </CoverLayout>
  );
}
