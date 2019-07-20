const config = require("./config/SiteConfig");
const FeedSetting = require("./config/setting-feed");
const ManifestSetting = require("./config/setting-manifest");
const MarkdownSetting = require("./config/setting-markdown");
const GASetting = require("./config/setting-ga");
const BaiduSetting = require("./config/setting-baidu");

module.exports = {
  // 禁用 promise polyfill
  polyfill: false,
  siteMetadata: {
    siteUrl: config.siteUrl,
    title: `杨二的个人博客`,
    description: `记录生活，见证成长。`
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `imgs`,
        path: `${__dirname}/static/images/`
      }
    },

    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: true,
        stripMetadata: true,
        defaultQuality: 75
      }
    },
    `gatsby-transformer-sharp`,
    MarkdownSetting,
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.js"
      }
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    FeedSetting,
    ManifestSetting,
    BaiduSetting,
    GASetting,
    "gatsby-plugin-offline"
  ]
};
