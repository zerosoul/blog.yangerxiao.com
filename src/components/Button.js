import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-right: 0.4rem;
  margin-bottom: 0.2rem;
  border-radius: 0.6rem;
  font-size: 1rem;
  color: white;
  background: #333;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  &:active {
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;

const Button = props => <Wrapper className="btn">{props.children}</Wrapper>;

export default Button;
