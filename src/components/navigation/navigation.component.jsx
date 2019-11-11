import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";

import {
  useTheme,
  MenuItem,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList
} from "@material-ui/core";

import {
  NavigationContainer,
  NavItemContainer,
  NavLogo,
  NavItem,
  NavUserContainer,
  NavUserName,
  NavUserIcon,
  MenuButton,
  MenuLink
} from "./navigation.styles";

import Treeburger from "./treeburger.component";

const Nav = ({ user = {}, location }) => {
  const theme = useTheme();
  const [float, setFloat] = useState(false);
  const anchorRef = React.useRef(null);

  const [open, setOpen] = React.useState(false);

  const handleClick = useCallback(event => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const handleClose = useCallback(event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setFloat(true);
      else if (window.scrollY === 0) setFloat(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavigationContainer theme={theme} float={float} role="navigation">
      <NavLogo theme={theme} to="/about">
        <h1>Advent of Code</h1>
      </NavLogo>
      <NavItemContainer>
        <NavItem
          theme={theme}
          to="/about"
          current={location.pathname === "/about" ? 1 : 0}
        >
          About
        </NavItem>
        <NavItem
          theme={theme}
          to="/submissions"
          current={location.pathname === "/submissions" ? 1 : 0}
        >
          Submissions
        </NavItem>
      </NavItemContainer>
      <NavUserContainer>
        <NavUserName theme={theme}>{user.username || "User Name"}</NavUserName>
        <NavUserIcon
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
        />
      </NavUserContainer>
      <MenuButton theme={theme} onClick={handleClick} ref={anchorRef}>
        <Treeburger className={open ? "isopen" : ""} />
      </MenuButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuLink theme={theme} to="/about">
                    <MenuItem onClick={handleClose}>About</MenuItem>
                  </MenuLink>

                  <MenuLink theme={theme} to="/submissions">
                    <MenuItem onClick={handleClose}>Sumbissions</MenuItem>
                  </MenuLink>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </NavigationContainer>
  );
};

export default withRouter(Nav);
