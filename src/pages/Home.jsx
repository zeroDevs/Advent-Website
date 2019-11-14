import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import HeroSection from "../components/HeroSection/HeroSection.component";
import { ModalWrapper } from "../components/Modal/Modal.component";

const useStyles = makeStyles(theme => ({
  root: {},
  heroContentStyleOverride: {
    ...theme.typography.h3
  },
  welcomeMessage: {
    textAlign: "center"
  },
  year: {
    color: "yellow"
  },
  buttonRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: ".5rem",
    "& > *": {
      margin: "0 .25rem"
    }
  }
}));

function Home(props) {
  const classes = useStyles();
  return (
    <>
      <HeroSection classes={{ content: classes.heroContentStyleOverride }}>
        <div className={classes.welcomeMessage}>
          <div>Zero-to-Mastery</div>
          <div>
            Advent of Code <span className={classes.year}>2019</span>
          </div>
          <div className={classes.buttonRow}>
            <Button
              variant="contained"
              color="secondary"
              to="/about"
              component={Link}
            >
              About
            </Button>
            <ModalWrapper>
              <Button variant="contained" color="secondary">
                Submit
              </Button>
            </ModalWrapper>
          </div>
        </div>
      </HeroSection>
    </>
  );
}

export default Home;
