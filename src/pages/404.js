/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';

import config from '../../config/SiteConfig';

const NotFound = () => (
  <Wrapper>
    <Helmet title={`404页面 | ${config.siteTitle}`} />
    <h1>404页面</h1>
    <p>哎呀，您访问的页面不在服务区。</p>
  </Wrapper>
);

export default NotFound;
