import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Link from 'gatsby-link';
import Wrapper from '../components/Wrapper';
import config from '../../config/SiteConfig';

const Container = styled.div``;
const ResumeBlock = styled.div`
  background: #333;
`;

const Resume = () => <ResumeBlock> 简历</ResumeBlock>;
export default Resume;
