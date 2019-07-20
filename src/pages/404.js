import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import { media } from '../utils/media';

import config from '../../config/SiteConfig';

const Container = styled.div`
  @media ${media.desktop} {
    max-width: 50%;
    margin: 0 auto;
  }
`;
const NotFound = () => (
  <Wrapper>
    <Container>
      <Helmet title={`404页面 | ${config.siteTitle}`} />
      <h1>404页面</h1>
      <p>哎呀，您访问的页面不在服务区。</p>
    </Container>
  </Wrapper>
);

export default NotFound;
