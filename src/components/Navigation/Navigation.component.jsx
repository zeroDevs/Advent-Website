import React, { useCallback, useRef } from "react";
import { withRouter, Link } from "react-router-dom";

import {
  useUserContext,
  USER_ACTION_TYPES
} from "../../contexts/user/user.context";

import {
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";

import {
  AccountRemoveOutline,
  AccountOutline,
  HomeOutline,
  InformationOutline,
  LightbulbOnOutline
} from "mdi-material-ui";

import Treeburger from "./Treeburger.component";
import { makeStyles } from "@material-ui/styles";

import { ModalButton } from "../Modal/ModalButton.component";

const convertHex3To6 = hex =>
  hex.length === 4
    ? hex
        .split("")
        .reduce((acc, item, index) => acc + (index > 0 ? item : "") + item, "")
    : hex;

const useStyles = makeStyles(theme => ({
  root: {},
  navToolBar: {
    justifyContent: "center",
    paddingRight: "0px"
  },
  clearLink: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  logo: ({ isMobile }) => ({
    marginRight: `${isMobile ? "0px" : "auto"}`,
    fontFamily: "Kaushan Script"
  }),
  linkContainer: ({ isMobile }) =>
    isMobile ? { display: "none" } : { position: "absolute" },
  userContainer: {
    marginLeft: "auto",
    "&> :not(:last-child)": {
      marginRight: ".75rem"
    }
  },
  avatar: {
    cursor: "pointer"
  },
  link: {
    padding: ".1rem",
    margin: "0px .4rem",

    "&:hover": {
      borderBottom: `1.5px solid ${convertHex3To6(
        theme.palette.text.primary
      )}66`
    },
    "&.current": {
      borderBottom: `1.5px solid ${convertHex3To6(theme.palette.text.primary)}`
    }
  },
  fab: {
    position: "absolute",
    top: "125%",
    right: "1.25rem"
  }
}));

const Nav = ({ location, history }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles({ isMobile });

  const [{ user, token }, userDispatch] = useUserContext();

  const anchorRef = useRef(null);

  const [open, setOpen] = React.useState(false);

  const handleClick = useCallback(event => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const toggleDrawer = useCallback(event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }, []);

  const handleLogout = useCallback(
    evt => {
      userDispatch({ type: USER_ACTION_TYPES.LOGOUT });
      toggleDrawer(evt);
    },
    [userDispatch, toggleDrawer]
  );

  const handleLogin = useCallback(() => {
    history.push("/login");
  }, [history]);

  return (
    <>
      <AppBar position='fixed' className={`${classes.root} not-scrolled`}>
        <Toolbar className={classes.navToolBar}>
          <Link to='/' className={classes.clearLink}>
            <Typography className={classes.logo} variant='h5'>
              Advent of Code
            </Typography>
          </Link>
          <div className={classes.linkContainer}>
            <Link to='/about' className={classes.clearLink}>
              <Typography
                variant='button'
                className={`${classes.link} ${
                  location.pathname === "/about" ? "current" : ""
                }`}
              >
                About
              </Typography>
            </Link>
            <Link to='/solutions' className={classes.clearLink}>
              <Typography
                variant='button'
                className={`${classes.link} ${
                  location.pathname === "/solutions" ? "current" : ""
                }`}
              >
                Solutions
              </Typography>
            </Link>
          </div>
          <Toolbar className={classes.userContainer}>
            {token ? (
              <>
                <Typography variant='button'>{user.username}</Typography>
                <Avatar
                  alt='Avatar'
                  src={
                    user.avatar
                      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                      : "images/user.png"
                  }
                  onClick={handleClick}
                  className={classes.avatar}
                />
              </>
            ) : (
              <>
                <Link to='/login' className={classes.clearLink}>
                  <Typography variant='button' className={classes.link}>
                    Login
                  </Typography>
                </Link>
                <Treeburger onClick={handleClick} />
              </>
            )}
          </Toolbar>
        </Toolbar>
        <ModalButton className={classes.fab} />
      </AppBar>

      <Drawer open={open} onClose={toggleDrawer} anchor='right'>
        {token ? (
          <>
            <Toolbar className={classes.userContainer}>
              <Typography variant='button'>{user.username}</Typography>
              <Avatar
                alt='Avatar'
                src={
                  user.avatar
                    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                    : "images/user.png"
                }
                className={classes.avatar}
                onClick={toggleDrawer}
              />
            </Toolbar>
            <Divider />
          </>
        ) : (
          <></>
        )}

        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <HomeOutline />
            </ListItemIcon>
            <Link to='/' className={classes.clearLink}>
              <ListItemText>Home</ListItemText>
            </Link>
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <InformationOutline />
            </ListItemIcon>
            <Link to='/about' className={classes.clearLink}>
              <ListItemText>About</ListItemText>
            </Link>
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LightbulbOnOutline />
            </ListItemIcon>
            <Link to='/submissions' className={classes.clearLink}>
              <ListItemText>Submissions</ListItemText>
            </Link>
          </ListItem>
          <Divider />
          {token ? (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <AccountRemoveOutline />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          ) : (
            <ListItem button onClick={handleLogin}>
              <ListItemIcon>
                <AccountOutline />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default withRouter(Nav);
