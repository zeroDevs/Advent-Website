import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { useTheme } from "@material-ui/core";

import {
  NavigationContainer,
  NavLogo,
  NavItem,
  NavUserContainer,
  NavUserName,
  NavUserIcon
} from "./navigation.styles";

const Nav = ({ user = {}, location }) => {
  const theme = useTheme();
  const [float, setFloat] = useState(false);

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
      <NavLogo theme={theme}>Advent of Code</NavLogo>
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
      <NavUserContainer>
        <NavUserName theme={theme}>{user.username || "User Name"}</NavUserName>
        <NavUserIcon
          src={`https://cdn.discordapp.com/avatars/user.id/user.avatar.png`}
        />
      </NavUserContainer>
    </NavigationContainer>
  );
};

export default withRouter(Nav);
