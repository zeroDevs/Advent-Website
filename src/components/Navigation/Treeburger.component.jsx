import React from "react";

import styled from "styled-components";

import { useTheme } from "@material-ui/core";

const Tree = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    margin: 3px 0;
    background: ${({ theme }) => theme.palette.text.primary};
    transition: background 0.5s ease-in-out;
    &:nth-of-type(2) {
      width: 18px;
    }
    &:nth-of-type(3) {
      width: 30px;
    }
  }

  &:hover,
  &.isopen {
    div:nth-of-type(1) {
      background: #daa520;
    }
    div:nth-of-type(2) {
      background: #dc143c;
    }
    div:nth-of-type(3) {
      background: #228b22;
    }
    div:nth-of-type(4) {
      background: #8b4513;
    }
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ ...otherProps }) => {
  const theme = useTheme();
  return (
    <Tree theme={theme} {...otherProps}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Tree>
  );
};
