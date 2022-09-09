import React from 'react';
import config from '../../config/SiteConfig';

const DocTitle = ({ title = "杨二博客" }) => {
  return (
    <title>{`${title} | ${config.siteTitle}`}</title>
  );
};

export default DocTitle