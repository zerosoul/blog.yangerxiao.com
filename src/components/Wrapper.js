import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Backtop from './Backtop';
import FixContainer from './FixContainer';
import Footer from './Footer';
import ReadHistory from './ReadHistory';
import { media } from '../utils/media';

const Grid = styled.div`
  margin: 0 auto;
  padding: 0;
  min-height: 60vh;
`;

const Content = styled.div`
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 1rem;
  overflow: hidden;
  margin: 0 auto;

  @media ${media.tablet} {
    padding: 2.6rem;
  }
  @media ${media.desktop} {
    padding: 3rem 6rem;
    max-width: 75%;
  }
  background-color: ${props => props.theme.bg};
`;

const Wrapper = props => (
  <Grid>
    <Header />
    <Content>{props.children}</Content>
    <FixContainer>
      {props.title && <ReadHistory title={props.title} url={props.url} />}
      {props.toc}
      <Backtop />
    </FixContainer>
    <Footer />
  </Grid>
);

export default Wrapper;
