const path = require('path');

const postPage = path.resolve('src/templates/post.js');

module.exports = (createPage, posts) => {
  // post
  posts.forEach((edge, index) => {
    const prev = index === 0 ? false : posts[index - 1].node;
    const next = index === posts.length - 1 ? false : posts[index + 1].node;

    createPage({
      path: `${edge.node.fields.slug}`,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        prev,
        next,
      },
    });
  });
};
