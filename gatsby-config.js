const config = require('./config/SiteConfig');
const FeedSetting = require('./config/feed-setting');
const ManifestSetting = require('./config/manifest-setting');
const FaviconSetting = require('./config/favicon-setting');
const MarkdownSetting = require('./config/markdown-setting');

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    title: `杨二小个人博客`,
    description: `记录生活，见证成长。`,
  },
  plugins: [
    `gatsby-plugin-react-next`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `imgs`,
        path: `${__dirname}/static/images/`,
      },
    },

    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    MarkdownSetting,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',

    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    FeedSetting,
    ManifestSetting,
    FaviconSetting,
    'gatsby-plugin-offline',
  ],
};
