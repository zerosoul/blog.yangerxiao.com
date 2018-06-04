/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';

import Dashboard from '../../components/noisetexture/Dashboard';
import Showup from '../../components/noisetexture/Showup';
import Download from '../../components/noisetexture/Download';
import { media } from '../../utils/media';

const Container = styled.div`
  @media ${media.desktop} {
    max-width: 50%;
    margin: 0 auto;
  }
`;
const NoiseTexture = () => (
  <Container>
    <h1>噪点背景生成器</h1>
    <Helmet title="噪点背景生成器 " />
    <Dashboard />
    <Showup />
    <Download />
  </Container>
);

export default NoiseTexture;
