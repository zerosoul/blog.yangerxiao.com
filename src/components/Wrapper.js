import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import { media } from '../utils/media';

const Grid = styled.div`
  margin: 0 auto;
  padding: 0;
`;

const Content = styled.div`
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 1rem;
  @media ${media.desktop} {
    padding: 3rem 5rem;
  }
  @media ${media.tablet} {
    padding: 2.5rem 4rem;
  }
  background-color: ${props => props.theme.bg};
`;

const Wrapper = props => (
  <Grid>
    <Header />
    <Content>{props.children}</Content>
  </Grid>
);

export default Wrapper;
