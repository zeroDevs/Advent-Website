import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    minHeight: 300,
    textAlign: 'center',
    position: 'relative',
  },
  cardMedia: {
    minHeight: 300,
  },
  linkToSolution: {
    border: '1px solid orange',
    display: 'inline-block',
    padding: '1rem',
    borderRadius: '0.3em',
  },
  cardBottom: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
  },
}));

export default useStyles;
