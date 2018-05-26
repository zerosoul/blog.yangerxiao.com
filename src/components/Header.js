import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import { darken, lighten } from 'polished';
import { media } from '../utils/media';

const Wrapper = styled.header`
  background: linear-gradient(
    45deg,
    ${props => darken(0.1, props.theme.primary)},
    ${props => lighten(0.1, props.theme.primary)}
  );
  grid-column: 1 / -1;
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 2rem 2rem 5rem 2rem;
  box-shadow: inset 0px -10px 30px 0px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;

  a {
    color: white;
    &:hover {
      opacity: 0.85;
      color: white;
    }
  }
`;
const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 2rem 6rem 2rem;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.dark};

  p {
    font-size: 1.68rem;
    margin-top: -1rem;
    @media ${media.phone} {
      font-size: 1.25rem;
    }
    @media ${media.tablet} {
      font-size: 1.45rem;
    }
  }
`;

const Header = props => (
  <Wrapper>
    <Content>
      <Hero>
        <h1>
          <Link to="/">杨二小</Link>
        </h1>
        <p>Machine repeats,Human creates.</p>
      </Hero>
      {props.children}
    </Content>
  </Wrapper>
);

export default Header;
