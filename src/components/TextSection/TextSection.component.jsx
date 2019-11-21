import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  informationSection: {
    margin: theme.spacing(4, 0),
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    [theme.breakpoints.up("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%"
    },
    "& > p": {
      ...theme.typography.body1,
      color: theme.palette.text.primary
    }
  },
  contents: {
    "& > h3": {
      marginBottom: "-10px"
    },
    "& > p": {
      color: "#b5b5b5",
      lineHeight: "18px",
      marginBottom: "30px"
    },
    "& > hr": {
      width: "30%",
      borderColor: "#5b5a5a"
    },
    "& a:link, a:visited": {
      color: "#fff"
    }
  }
}));

export default function TextSection(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.informationSection}>
        <Typography
          align="center"
          color="textPrimary"
          variant="h3"
          gutterBottom
        >
          {props.title}
        </Typography>

        <div className={classes.contents}>{props.children}</div>
      </div>
    </>
  );
}
