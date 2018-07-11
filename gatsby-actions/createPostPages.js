const path = require('path');

const postPage = path.resolve('src/templates/post.js');

module.exports = (createPage, posts) => {
  // post
  posts.forEach((edge, index) => {
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;
    const { html, frontmatter, tableOfContents, excerpt } = edge.node;
    createPage({
      path: `${edge.node.fields.slug}`,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        html,
        frontmatter,
        excerpt,
        tableOfContents,
        prev,
        next,
      },
    });
  });
};
