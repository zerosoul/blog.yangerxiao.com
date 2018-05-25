import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: ${props => props.theme.fontBig};
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.dark};
  position: relative;
  padding-bottom: 1rem;
  margin-bottom: 4rem;

  &:after {
    content: '';
    height: 1px;
    width: 4rem;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -2rem;
    background: ${props => props.theme.ultraLight};
  }
`;

const SectionTitle = props => <Title>{props.children}</Title>;

export default SectionTitle;
