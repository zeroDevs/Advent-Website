
import styled, { css } from "styled-components"

const floatStyles = css`
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.25);
`

const getFloatStyles = ({ float }) => (float ? floatStyles : null)

export const NavigationContainer = styled.nav`
  position: fixed;
  width: 100vw;
  z-index: 1000;
  background: #fff;
  height: 60px;
  padding: 5px 50px;

  ${getFloatStyles};
`
NavigationContainer.displayName = "NavigationContainer"


export const NavContentContainer = styled.div`
  display: flex;

  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`
NavContentContainer.displayName = "NavContentContainer"


export const NavLogo = styled.h1`
    color: #af1313;
    font-family: cursive;
`
NavLogo.displayName = "NavLogo"
