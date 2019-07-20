const { kebabCase, each, get, uniq } = require("lodash");
module.exports = (createPage, createPaginatedPages, posts) => {
  let allTags = [];

  each(posts, edge => {
    if (get(edge, "node.frontmatter.tags")) {
      allTags = allTags.concat(edge.node.frontmatter.tags);
    }
  });

  allTags = uniq(allTags);

  // console.log(allTags);
  allTags.forEach(tag => {
    const tagPosts = posts.filter(post => {
      // console.log('wtf', post);

      const { tags } = post.node.frontmatter;
      return tags.indexOf(tag) !== -1;
    });
    createPaginatedPages({
      edges: tagPosts,
      createPage,
      pageTemplate: "src/templates/tag.js",
      pathPrefix: `tags/${kebabCase(tag)}`, // This is optional and defaults to an empty string if not used
      context: {
        total: tagPosts.length,
        tag
      } // This is optional and defaults to an empty object if not used
    });
  });
};
