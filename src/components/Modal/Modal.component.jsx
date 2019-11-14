import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CancelIcon from "@material-ui/icons/Cancel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";

import Avatar from "../Avatar/Avatar.component";
import SubmitForm from "../Submit-Form/Submit-form.component";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    position: "relative"
  },
  title: {
    ...theme.typography.h6
  },
  content: {
    padding: theme.spacing(2, 4),
    ...theme.typography.body1
  },
  closeIconContainer: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1)
  },
  closeIcon: {
    color: theme.palette.error.main,
    cursor: "pointer"
  }
}));

/*
  __MOVE THESE TO THE PARENT OF THE MODAL COMPONENT AND PASS THE VALUES__
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = React.useCallback(() => setIsOpen(true), []);
  const handleClose = React.useCallback(() => setIsOpen(false), []);
*/

function Modal(props) {
  const classes = useStyles({ classes: props.classes });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      <DialogTitle id="submit-modal-title" className={classes.title}>
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
  userInfo: PropTypes.object.isRequired
};

export default React.memo(Modal);

export const ModalButton = ({
  children,
  opened = false,
  handleOpen = () => {},
  handleClose = () => {},
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(opened);
  useEffect(() => {
    isOpen ? handleOpen() : handleClose();
  }, [isOpen, handleClose, handleOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
    handleOpen();
  }, [handleOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    handleClose();
  }, [handleClose]);

  const doOpen = useCallback(() => {
    if (!isOpen) setIsOpen(true);
  }, [isOpen]);

  return (
    <Button onClick={doOpen} {...props}>
      <Modal isOpen={isOpen} handleOpen={open} handleClose={close}></Modal>
      {children}
    </Button>
  );
};
