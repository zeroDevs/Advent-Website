import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    position: 'relative',
  },
  title: {
    ...theme.typography.h6,
  },
  content: {
    padding: theme.spacing(2, 4),
    ...theme.typography.body1,
  },
  closeIconContainer: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  closeIcon: {
    color: theme.palette.error.main,
    cursor: 'pointer',
  },
}));
