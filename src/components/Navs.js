import React from 'react';
import styled from 'styled-components';
import { media } from '../utils/media';
import Button from './Button';
import Link from 'gatsby-link';

const Container = styled.div`
  display: flex;
  align-items: space-between;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  margin-top: ${props => (props.isBottom ? '2rem' : 0)};
  ${props => (props.isBottom ? 'margin-bottom:0' : '')};
  max-width: 90%;

  @media ${media.tablet} {
    max-width: ${props => (props.isBottom ? '80%' : '55%')};
  }
  @media ${media.desktop} {
    max-width: ${props => (props.isBottom ? '60%' : '30%')};
  }

  a {
    flex: 1;
    text-align: center;
  }
`;

const Navs = ({ isBottom }) => (
  <Container isBottom={isBottom}>
    <Link to="/cates">
      <Button>分类</Button>
    </Link>
    <Link to="/archives">
      <Button>归档</Button>
    </Link>
    <Link to="/tags">
      <Button>标签</Button>
    </Link>
    <Link to="/about">
      <Button>关于</Button>
    </Link>
  </Container>
);

export default Navs;
