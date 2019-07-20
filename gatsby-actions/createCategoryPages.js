const { get, each, uniq } = require("lodash");

module.exports = (createPage, createPaginatedPages, posts) => {
  let allCates = [];

  each(posts, edge => {
    if (get(edge, "node.frontmatter.category")) {
      allCates = allCates.concat(edge.node.frontmatter.category);
    }
  });

  allCates = uniq(allCates);

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
      pageTemplate: "src/templates/category.js",
      pathPrefix: `cates/${cate}`,
      context: {
        total: catePosts.length,
        category: cate
      }
    });
  });
};
