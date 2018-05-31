const _ = require('lodash');
const path = require('path');

const tagPage = path.resolve('src/templates/tag.js');

module.exports = (createPage, posts) => {
  let tags = [];

  _.each(posts, edge => {
    if (_.get(edge, 'node.frontmatter.tags')) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });

  tags = _.uniq(tags);

  // console.log(tags);
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}`,
      component: tagPage,
      context: {
        tag,
      },
    });
  });
};
