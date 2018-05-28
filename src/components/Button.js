import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';

const Wrapper = styled.span`
  margin-right: 0.4rem;
  margin-bottom: 0.2rem;
  border-radius: 0.8rem;
  font-size: 1rem;
  color: white;
  background: #333;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Button = props => <Wrapper>{props.children}</Wrapper>;

export default Button;
