/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';

import config from '../../config/SiteConfig';

const Content = styled.div`
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 1rem;
  background-color: ${props => props.theme.bg};
`;

const NotFound = () => (
  <Wrapper>
    <Helmet title={`404页面 | ${config.siteTitle}`} />
    <Header />
    <Content>
      <h1>404页面</h1>
      <p>哎呀，您访问的页面不在服务区。</p>
    </Content>
  </Wrapper>
);

export default NotFound;
