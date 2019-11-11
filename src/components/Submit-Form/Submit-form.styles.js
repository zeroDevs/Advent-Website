import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(2, 0),
  },
  statusMessage: {
    color: theme.palette.error.main,
    height: theme.spacing(8),
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default useStyles;
