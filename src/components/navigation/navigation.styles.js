import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

const floatStyles = css`
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.25);
`;

const getFloatStyles = ({ float }) => (float ? floatStyles : null);

export const NavigationContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  ${getFloatStyles};
`;
NavigationContainer.displayName = "NavigationContainer";

// export const NavItemContainer = styled.div`
//   display: flex;

//   margin: 0 auto;
//   align-items: center;
//   justify-content: space-between;
// `;
// NavContentContainer.displayName = "NavContentContainer";

export const NavLogo = styled.h1`
  ${"" /* color: #af1313; */}
  font-family: "Kaushan Script";
  margin-right: auto;
`;
NavLogo.displayName = "NavLogo";

export const NavItem = styled(Link)`
  border-bottom: ${props =>
    props.current ? `2px solid ${props.theme.palette.text.primary}` : "none"};
  margin: 0 1rem;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration: none;
  transition: border 0.25s ease-in-out;
  box-sizing: border-box;

  &:hover {
    ${props =>
      !props.current
        ? `border-bottom:1px solid ${convertHex3To6(
            props.theme.palette.text.primary
          )}66`
        : "none"};
  }
`;

export const NavUserContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const NavUserName = styled.div``;

export const NavUserIcon = styled.img``;

const convertHex3To6 = hex =>
  hex.length === 4
    ? hex
        .split("")
        .reduce((acc, item, index) => acc + (index > 0 ? item : "") + item, "")
    : hex;
