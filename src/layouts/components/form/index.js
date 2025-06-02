// src/components/FormComponent.jsx
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import GradientBorder from "examples/GradientBorder";
import VuiInput from "components/VuiInput";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

const FormComponent = forwardRef(
  (
    { name, value, label, placeholder, type = "text", error, helperText, onChange, onBlur, sx = {} },
    ref
  ) => {
    const gradient = radialGradient(
      palette.gradients.borderLight.main,
      palette.gradients.borderLight.state,
      palette.gradients.borderLight.angle
    );

    return (
      <VuiBox ref={ref} sx={{ mb: 3, ...sx }}>
        <VuiTypography
          component="label"
          variant="button"
          color="white"
          fontWeight="medium"
          mb={1}
        >
          {label}
        </VuiTypography>

        <GradientBorder
          borderRadius={borders.borderRadius.md}
          padding="1px"
          backgroundImage={gradient}
          sx={{ mb: 1, '&:focus-within': { boxShadow: '0 0 8px rgba(0, 224, 255, 0.6)' } }}
        >
          <VuiInput
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            sx={{
              bg: 'transparent',
              color: '#fff',
              px: 2,
              py: 1.5,
              fontSize: '14px',
              '::placeholder': { color: 'rgba(255,255,255,0.6)' },
            }}
          />
        </GradientBorder>

        {error && (
          <VuiTypography variant="caption" color="error">
            {helperText}
          </VuiTypography>
        )}
      </VuiBox>
    );
  }
);

FormComponent.displayName = "FormComponent";

FormComponent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

FormComponent.defaultProps = {
  type: 'text',
  error: false,
  helperText: '',
  sx: {},
};

export default FormComponent;