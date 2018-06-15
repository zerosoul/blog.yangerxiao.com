module.exports = {
  resolve: 'gatsby-plugin-favicon',
  options: {
    logo: './src/favicon.png',
    injectHTML: true,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: false,
      coast: true,
      favicons: true,
      firefox: false,
      twitter: false,
      yandex: false,
      windows: true,
    },
  },
};
