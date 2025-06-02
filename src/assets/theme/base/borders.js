import colors from "assets/theme/base/colors";
import pxToRem from "assets/theme/functions/pxToRem";

const { borderCol } = colors;
const borderColor = {
  grey: borderCol,
  white: "rgba(226, 232, 240, 0.3)",
};

const borderWidth = {
  0: 0,
  1: pxToRem(1),
  2: pxToRem(2),
  3: pxToRem(3),
  4: pxToRem(4),
  5: pxToRem(5),
};

const borderRadius = {
  xs: pxToRem(2),
  sm: pxToRem(4),
  md: pxToRem(8),
  lg: pxToRem(16),
  xl: pxToRem(24),
  xxl: pxToRem(32),
  button: pxToRem(12),
  form: pxToRem(24),
  section: pxToRem(160),
};

const semantic = {
  card: borderRadius.md,
  modal: borderRadius.xl,
  avatar: borderRadius.xxl,
};

const border = (widthKey, colorKey) =>
  `${borderWidth[widthKey]} solid ${borderColor[colorKey]}`;

export default {
  borderColor,
  borderWidth,
  borderRadius,
  semantic,
  border,
};
