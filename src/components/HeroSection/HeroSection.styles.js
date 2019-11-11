import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: props => {
    if (props.isMobile) {
      return {
        backgroundImage: "url('images/advent-mobile.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '650px',
      };
    } else {
      return {
        backgroundImage: "url('images/advent.png')",
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: '99vh',
      };
    }
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
}));

export default useStyles;
