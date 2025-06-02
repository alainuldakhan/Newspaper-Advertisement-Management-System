import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../../services/authService";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignUp from "assets/images/signUpImage.png";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { FaUserTie, FaPenNib, FaTools } from "react-icons/fa";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", userName: "", email: "", password: "", role: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  const refs = useRef({ fullName: React.createRef(), userName: React.createRef(), email: React.createRef(), password: React.createRef(), role: React.createRef() });
  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (firstError) refs.current[firstError]?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [errors]);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    else if (form.fullName.length < 3) e.fullName = "Min 3 characters";
    if (!form.userName.trim()) e.userName = "Username is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid e-mail";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    if (!form.role) e.role = "Role is required";
    return e;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    setLoading(true);
    try {
      await register(form);
      setToast({ open: true, type: "success", message: "Registration successful!" });
      setTimeout(() => navigate("/authentication/sign-in"), 1200);
    } catch (err) {
      setToast({ open: true, type: "error", message: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  // Styling from SignIn
  const gradient = radialGradient(palette.gradients.borderLight.main, palette.gradients.borderLight.state, palette.gradients.borderLight.angle);
  const inputBox = {
    borderRadius: borders.borderRadius.lg,
    padding: "1px",
    backgroundImage: gradient,
    transition: "0.3s ease",
    '&:hover': { boxShadow: "0 0 8px #00e0ff" },
    '&:focus-within': { boxShadow: "0 0 12px #00ffff" }
  };
  const inputStyle = { px: 2, py: 1.5, fontSize: "14px", color: "#fff", '::placeholder': { color: "#ccc" } };
  const roles = [
    { value: "advertiser", label: "Advertiser", icon: <FaUserTie /> },
    { value: "editor", label: "Editor", icon: <FaPenNib /> },
    { value: "administrator", label: "Administrator", icon: <FaTools /> }
  ];

  return (
    <CoverLayout
      title="Join Paper Verse"
      color="info"
      description="Create your account to manage ads and profile."
      premotto="EMPOWERING DIGITAL PUBLICATIONS:"
      motto="PAPER VERSE – YOUR ADVERTISING UNIVERSE"
      image={bgSignUp}
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" sx={{ transition: "0.3s", '&:hover': { boxShadow: "0 0 8px #00e0ff" } }}>
        <VuiBox component="form" onSubmit={handleSubmit} role="form" borderRadius="inherit" p="45px" sx={{ backgroundColor: palette.secondary.focus }}>

          <VuiBox mb={2} ref={refs.current.role}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium" mb={1}>Role</VuiTypography>
            <Stack direction="row" flexWrap="wrap" spacing={2} rowGap={2} justifyContent="center">
              {roles.map(({ value, label, icon }) => (
                <Paper key={value} elevation={form.role === value ? 8 : 2} onClick={() => setForm({ ...form, role: value })} sx={{
                  borderRadius: "16px",
                  backgroundColor: form.role === value ? "#1976d2" : "#1A1D34",
                  color: "#fff",
                  px: 3,
                  py: 2,
                  cursor: "pointer",
                  textAlign: "center",
                  minWidth: "130px",
                  border: form.role === value ? "2px solid #fff" : "1px solid #444",
                  transition: "0.3s ease",
                  '&:hover': { boxShadow: "0 0 12px #00cfff44", transform: "scale(1.05)" }
                }}>
                  <Box fontSize="20px" display="flex" justifyContent="center" mb={0.5}>{icon}</Box>
                  <VuiTypography variant="caption" color="white" fontWeight="medium">{label}</VuiTypography>
                </Paper>
              ))}
            </Stack>
            {errors.role && <VuiTypography color="error" variant="caption">{errors.role}</VuiTypography>}
          </VuiBox>

          {['fullName','userName','email','password'].map((key, idx) => {
            const type = key === 'password' ? 'password' : key === 'email' ? 'email' : 'text';
            const label = key === 'fullName' ? 'Full name' : key === 'userName' ? 'Username' : key.charAt(0).toUpperCase() + key.slice(1);
            return (
              <VuiBox mb={2} key={key} ref={refs.current[key]}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium" mb={1}>{label}</VuiTypography>
                <GradientBorder sx={inputBox}>
                  <VuiInput
                    type={type}
                    name={key}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={`Your ${label.toLowerCase()}…`}
                    sx={inputStyle}
                    autoFocus={idx === 0}
                  />
                </GradientBorder>
                {errors[key] && <VuiTypography color="error" variant="caption">{errors[key]}</VuiTypography>}
              </VuiBox>
            );
          })}

          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth type="submit" disabled={loading}>{loading ? "Signing up…" : "SIGN UP"}</VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Already have an account?{' '}
              <VuiTypography component={Link} to="/authentication/sign-in" variant="button" color="white" fontWeight="medium">Sign in</VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast(prev => ({ ...prev, open: false }))}>
        <Alert onClose={() => setToast(prev => ({ ...prev, open: false }))} severity={toast.type} sx={{ width: "100%" }}>{toast.message}</Alert>
      </Snackbar>
    </CoverLayout>
  );
}
