import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { media } from '../utils/media';
import Button from './Button';

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
    margin: 0 0.2rem;
    .btn {
      margin: 0 auto;
    }
    &.curr {
      .btn {
        background: #666;
      }

      position: relative;
      &:after,
      &:before {
        top: 100%;
        left: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }

      &:after {
        border-color: rgba(136, 183, 213, 0);
        border-top-color: #666;
        border-width: 0.6rem;
        margin-left: -0.6rem;
      }
    }
  }
`;

const Navs = ({ isBottom }) => {
  const container = useRef(null);
  useEffect(() => {
    const pathName = location.pathname;

    const links = container.current.querySelectorAll('a');
    links.forEach(link => {
      if (pathName.indexOf(link.pathname) === 0) {
        link.classList.add('curr');
      }
    });
  }, []);

  const navs = [
    {
      to: '/cates',
      title: '分类'
    },
    {
      to: '/archives',
      title: '归档'
    },
    {
      to: '/tags',
      title: '标签'
    },
    {
      to: '/about',
      title: '关于'
    }
  ];
  return (
    <div className="wrapper">
      <Container ref={container} isBottom={isBottom}>
        {navs.map(nav => (
          <Link to={nav.to} key={nav.to}>
            <Button>{nav.title}</Button>
          </Link>
        ))}
      </Container>
    </div>
  );
};
export default Navs;
