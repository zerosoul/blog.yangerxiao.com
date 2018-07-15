const path = require('path');

const postPage = path.resolve('src/templates/post.js');

module.exports = (createPage, posts) => {
  // post
  posts.forEach((edge, index) => {
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;
    const { html, frontmatter, tableOfContents, excerpt } = edge.node;
    const slug = edge.node.fields.slug;
    createPage({
      path: `${slug}`,
      component: postPage,
      context: {
        slug,
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
