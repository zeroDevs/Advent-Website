import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import HeroSection from '../components/HeroSection/HeroSection.component';

const useStyles = makeStyles(theme => ({
  root: {},
  heroContentStyleOverride: {
    ...theme.typography.h3,
  },
  welcomeMessage: {
    textAlign: 'center',
  },
  year: {
    color: 'yellow',
  },
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
          <Button
            variant='contained'
            color='secondary'
            to='/about'
            component={Link}
          >
            About
          </Button>
        </div>
      </HeroSection>
    </>
  );
}

export default Home;
