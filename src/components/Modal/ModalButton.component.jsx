import React, { useState, useEffect, useCallback } from "react";
import {
  useUserContext,
  USER_ACTION_TYPES
} from "../../contexts/user/user.context";
import {
  IconButton,
  makeStyles,
  Zoom,
  useTheme,
  Tooltip
} from "@material-ui/core";
import Modal from "./Modal.component.jsx";

const useStyles = makeStyles(theme => ({
  root: {
    background: "url('images/submitIconsmall.png')",
    backgroundSize: "contain",
    width: "3rem",
    height: "3rem"
  }
}));

export const ModalButton = ({
  children,
  opened = false,
  handleOpen = () => {},
  handleClose = () => {},
  className,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(opened);
  const [{ user }, userDispatch] = useUserContext();

  useEffect(() => {
    isOpen ? handleOpen() : handleClose();
  }, [isOpen, handleClose, handleOpen]);

  const open = useCallback(() => {
    if (!user) {
      userDispatch({
        type: USER_ACTION_TYPES.LOGIN
      });
    }
    setIsOpen(true);
    handleOpen();
  }, [handleOpen, user, userDispatch]);

  const close = useCallback(() => {
    setIsOpen(false);
    handleClose();
  }, [handleClose]);

  const doOpen = useCallback(() => {
    if (!isOpen) setIsOpen(true);
  }, [isOpen]);

  return (
    <Zoom
      in
      timeout={theme.transitions.duration.enteringScreen}
      style={{ transitionDelay: "1s" }}
    >
      <>
        <Tooltip title='Submit Your Solution'>
          <IconButton
            onClick={doOpen}
            className={`${classes.root} ${className}`}
          ></IconButton>
        </Tooltip>
        <Modal isOpen={isOpen} handleOpen={open} handleClose={close} />
      </>
    </Zoom>
  );
};
