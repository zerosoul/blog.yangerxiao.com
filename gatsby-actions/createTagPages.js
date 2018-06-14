const _ = require('lodash');
// const path = require('path');

module.exports = (createPage, createPaginatedPages, posts) => {
  let allTags = [];

  _.each(posts, edge => {
    if (_.get(edge, 'node.frontmatter.tags')) {
      allTags = allTags.concat(edge.node.frontmatter.tags);
    }
  });

  allTags = _.uniq(allTags);

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
      pageTemplate: 'src/templates/tag.js',
      pathPrefix: `tags/${_.kebabCase(tag)}`, // This is optional and defaults to an empty string if not used
      context: {
        total: tagPosts.length,
        tag,
      }, // This is optional and defaults to an empty object if not used
    });
    // createPage({
    //   path: `/tags/${_.kebabCase(tag)}`,
    //   component: tagPage,
    //   context: {
    //     tag,
    //   },
    // });
  });
};
