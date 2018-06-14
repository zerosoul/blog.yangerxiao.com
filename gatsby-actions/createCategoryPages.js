const _ = require('lodash');

module.exports = (createPage, createPaginatedPages, posts) => {
  let allCates = [];

  _.each(posts, edge => {
    if (_.get(edge, 'node.frontmatter.category')) {
      allCates = allCates.concat(edge.node.frontmatter.category);
    }
  });

  allCates = _.uniq(allCates);

  // console.log(allCates);
  allCates.forEach(cate => {
    const catePosts = posts.filter(post => {
      // console.log('wtf', post);

      const { category } = post.node.frontmatter;
      return cate === category;
    });
    createPaginatedPages({
      edges: catePosts,
      createPage,
      pageTemplate: 'src/templates/category.js',
      pathPrefix: `cates/${cate}`,
      context: {
        total: catePosts.length,
        category: cate,
      },
    });
  });
};
