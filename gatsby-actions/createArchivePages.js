module.exports = (createPage, createPaginatedPages, posts) => {
  createPaginatedPages({
    edges: posts,
    createPage,
    pageTemplate: 'src/templates/archives.js',
    pageLength: 20, // This is optional and defaults to 10 if not used
    pathPrefix: 'archives', // This is optional and defaults to an empty string if not used
    context: {
      totalCount: posts.length,
    }, // This is optional and defaults to an empty object if not used
  });
};
