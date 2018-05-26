/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import { media } from '../utils/media';

import config from '../../config/SiteConfig';

const Content = styled.div``;

const NotFound = () => (
  <Wrapper>
    <Helmet title={`404页面 | ${config.siteTitle}`} />
    <Header>
      <Link to="/">{config.siteName}</Link>
    </Header>
    <Content>
      <h1>404页面</h1>
      <p>哎呀，您访问的页面不在服务区。</p>
    </Content>
  </Wrapper>
);

export default NotFound;
