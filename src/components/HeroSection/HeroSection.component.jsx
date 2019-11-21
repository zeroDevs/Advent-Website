import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: props => {
    if (props.isMobile) {
      return {
        backgroundImage: "url('images/advent-mobile.png')",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgb(16, 15, 36)",
        height: "100vh"
      };
    } else {
      return {
        backgroundImage: "url('images/advent.png')",
        backgroundPosition: "bottom center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%"
      };
    }
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
}));

function HeroSection({ children, ...props }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles({ isMobile, classes: props.classes });
  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

HeroSection.propTypes = {
  children: PropTypes.node
};

export default React.memo(HeroSection);
