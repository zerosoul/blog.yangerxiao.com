import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import useDarkMode from "use-dark-mode";

const DarkStyleAppend = createGlobalStyle`
    body{
        transition: background-color 0.5s ease;
        &.light-mode {
        }
        &.dark-mode {
            background-color: #1a1919;
            color: #666;
        }
    }
`;
const Wrapper = styled.div`
  position: absolute;
  right: 0.8rem;
  top: 0.5rem;
  width: 32px;
  z-index: 999;
  .onoffswitch-checkbox {
    display: none;
  }
  .onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    height: 18px;
    padding: 0;
    line-height: 30px;
    border: none;
    box-shadow: 0 0 2px black;
    border-radius: 10px;
    background-color: #fff;
    transition: background-color 0.3s ease-in;
  }
  .onoffswitch-label:before {
    content: "";
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    background-image: url("images/yinyang.svg");
    background-size: cover;
    width: 18px;
    height: 18px;
    margin: 0;

    position: absolute;
    top: 0;
    left: 0;
    right: 14px;
    border: 1px solid #666;
    border-radius: 50%;
    transition: all 0.3s ease-in 0s;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label:before {
    content: "";
    left: 14px;
    right: 0;
    transform: rotate(180deg);
  }
`;
function Toggle({ checked = true, togglePoetry }) {
  console.log("t vvv", checked);

  return (
    <Wrapper>
      <input
        type="checkbox"
        name="onoffswitch"
        className="onoffswitch-checkbox"
        id="myonoffswitch"
        checked={checked}
        onChange={({ target }) => {
          console.log("t v", target.checked);
          togglePoetry(target.checked);
        }}
      />
      <label className="onoffswitch-label" htmlFor="myonoffswitch"></label>
    </Wrapper>
  );
}
const StyledWrapper = styled.aside`
  position: fixed;
  top: 1rem;
  right: 1rem;
`;
export default function DarkmodeToggle() {
  const darkMode = useDarkMode(false);
  return (
    <StyledWrapper>
      <DarkStyleAppend />

      <Toggle checked={darkMode.value} togglePoetry={darkMode.toggle} />
    </StyledWrapper>
  );
}
