import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import { lighten } from 'polished';
import Button from './Button';
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
const Navs = styled.div`
  display: flex;
  align-items: space-between;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  max-width: 90%;
  @media ${media.tablet} {
    max-width: 55%;
  }
  @media ${media.desktop} {
    max-width: 30%;
  }

  a {
    flex: 1;
    text-align: center;
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
        <span>Machine repeats,Human creates</span>
      </div>
    </Hero>
    <Navs>
      <Link to="/categories">
        <Button>分类</Button>
      </Link>
      <Link to="/archives">
        <Button>归档</Button>
      </Link>
      <Link to="/tags">
        <Button>标签</Button>
      </Link>
      <Link to="/contact">
        <Button>联系</Button>
      </Link>
    </Navs>
    {props.children}
  </Wrapper>
);

export default Header;
