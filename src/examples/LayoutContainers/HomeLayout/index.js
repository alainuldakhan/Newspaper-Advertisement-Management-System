import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import { useVisionUIController, setLayout } from "context";
import Home from "layouts/home";

function HomeLayout({ children }) {
  const [, dispatch] = useVisionUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "home");
  }, [dispatch, pathname]);

  return (
    <VuiBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",
        marginLeft: 0,
        marginRight: 0,
        transition: transitions.create(["margin"], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
      })}
    >
      {children}
    </VuiBox>
  );
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomeLayout;