const config = require('./SiteConfig');

module.exports = {
  resolve: 'gatsby-plugin-manifest',
  options: {
    name: config.siteTitle,
    short_name: config.siteTitleAlt,
    description: config.siteDescription,
    start_url: config.pathPrefix,
    background_color: config.backgroundColor,
    theme_color: config.themeColor,
    display: 'minimal-ui',
    icons: [
      {
        src: '/logos/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logos/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
};
