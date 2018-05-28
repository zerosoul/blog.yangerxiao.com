/* eslint no-unused-expressions:0 */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import theme from '../../config/Theme';

const TemplateWrapper = props => {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      <div>
        <SEO />
        {children()}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default TemplateWrapper;
