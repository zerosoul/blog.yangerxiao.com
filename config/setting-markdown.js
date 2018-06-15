module.exports = {
  resolve: 'gatsby-transformer-remark',
  options: {
    plugins: [
      {
        resolve: `gatsby-remark-images`,
        options: {
          maxWidth: 700,
          showCaptions: true,
        },
      },
      {
        resolve: 'gatsby-remark-external-links',
        options: {
          target: '_blank',
          rel: 'nofollow noopener noreferrer',
        },
      },
      {
        resolve: 'gatsby-remark-prismjs',
        options: {
          inlineCodeMarker: '>',
        },
      },

      'gatsby-remark-autolink-headers',
      `gatsby-remark-responsive-iframe`,
    ],
  },
};
