const config = require('./config/SiteConfig');
const FeedSetting = require('./config/setting-feed');
const ManifestSetting = require('./config/setting-manifest');
const FaviconSetting = require('./config/setting-favicon');
const MarkdownSetting = require('./config/setting-markdown');
const GASetting = require('./config/setting-ga');

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    title: `杨二的个人博客`,
    description: `记录生活，见证成长。`,
  },
  plugins: [
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
    GASetting,
    'gatsby-plugin-offline',
    `gatsby-plugin-react-next`,
  ],
};
