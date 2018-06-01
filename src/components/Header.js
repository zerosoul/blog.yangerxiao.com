import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import { lighten } from 'polished';
import Button from './Button';
import Navs from './Navs';
import { media } from '../utils/media';

const Wrapper = styled.header`
  margin: 0 auto;
  padding: 0 0.5rem;
`;
const Hero = styled.div`
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  .site {
    text-align: center;
    margin-bottom: 1rem;
    .title {
      padding: 0.6rem 2rem;
      background: #222;
      color: #fff;
      border-radius: 1rem;
    }
  }
  .slogan {
    color: ${lighten(0.3, '#333')};
    margin-bottom: 0.4rem;
  }
`;

const Header = props => (
  <Wrapper>
    <Hero>
      <h1 className="site">
        <Link to="/" className="title">
          杨二小
        </Link>
      </h1>
      <div className="slogan">
        <span>Machine repeats, Human creates</span>
      </div>
    </Hero>
    <Navs />
    {props.children}
  </Wrapper>
);

export default Header;
