import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CancelIcon from '@material-ui/icons/Cancel';

import useStyles from './Modal.styles';

import Avatar from '../Avatar/Avatar.component';
import SubmitForm from './SubmitForm';

/*
  __MOVE THESE TO THE PARENT OF THE MODAL COMPONENT AND PASS THE VALUES__
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = React.useCallback(() => setIsOpen(true), []);
  const handleClose = React.useCallback(() => setIsOpen(false), []);
*/

function Modal(props) {
  const classes = useStyles({ classes: props.classes });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { isOpen, handleClose, userInfo } = props;

  const userId = userInfo && userInfo.id;
  const userAvatarHash = userInfo && userInfo.avatar;
  const userName = userInfo && `${userInfo.username}#${userInfo.discriminator}`;

  return (
    <Dialog
      className={classes.root}
      onClose={handleClose}
      open={isOpen}
      fullScreen={fullScreen}
    >
      <DialogTitle id='submit-modal-title' className={classes.title}>
        Submit Solution
      </DialogTitle>

      <div className={classes.closeIconContainer}>
        <CancelIcon className={classes.closeIcon} onClick={handleClose} />
      </div>

      <div className={classes.content}>
        <Avatar id={userId} avatar={userAvatarHash} userName={userName} />
        <SubmitForm userName={userName} handleClose={handleClose} />
      </div>
    </Dialog>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default React.memo(Modal);
