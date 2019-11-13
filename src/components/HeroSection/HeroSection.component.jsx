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
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "650px"
      };
    } else {
      return {
        backgroundImage: "url('images/advent.png')",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        height: "99vh"
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
