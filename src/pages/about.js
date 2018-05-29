/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import SectionTitle from '../components/SectionTitle';
import Subline from '../components/Subline';
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
      <Helmet title={`关于我 | ${config.siteTitle}`} />
      <SectionTitle>
        <Link to="/about">关于我</Link>
      </SectionTitle>
      <Subline sectionTitle>也许，我们能成为朋友。</Subline>
    </Container>
  </Wrapper>
);

export default NotFound;
