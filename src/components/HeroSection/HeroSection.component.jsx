import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './HeroSection.styles';

function HeroSection({ children, ...props }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles({ isMobile, classes: props.classes });
  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

HeroSection.propTypes = {
  children: PropTypes.node,
};

export default React.memo(HeroSection);
