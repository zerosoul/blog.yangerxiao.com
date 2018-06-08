const _ = require('lodash');
const path = require('path');

const catePage = path.resolve('src/templates/category.js');

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
      pathPrefix: `cates/${_.kebabCase(cate)}`, // This is optional and defaults to an empty string if not used
      context: {
        total: catePosts.length,
        category: cate,
      }, // This is optional and defaults to an empty object if not used
    });

    // createPage({
    //   path: `/cates/${_.kebabCase(cate)}`,
    //   component: catePage,
    //   context: {
    //     category: cate,
    //   },
    // });
  });
};
