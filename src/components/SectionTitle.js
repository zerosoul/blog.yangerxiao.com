import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.dark};
  margin-bottom: 0.8rem;
`;

const SectionTitle = props => <Title>{props.children}</Title>;

export default SectionTitle;
