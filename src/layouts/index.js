/* eslint no-unused-expressions:0 */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import theme from '../../config/Theme';

// require('../utils/prismjs-theme.css');

const TemplateWrapper = ({ children }) => (
  // const { icons } = props;
  <ThemeProvider theme={theme}>
    <div>
      <SEO />
      {children()}
      <Footer />
    </div>
  </ThemeProvider>
);

export default TemplateWrapper;
