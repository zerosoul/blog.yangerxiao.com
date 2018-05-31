const _ = require('lodash');
const path = require('path');

const catePage = path.resolve('src/templates/category.js');

module.exports = (createPage, posts) => {
  let cates = [];

  _.each(posts, edge => {
    if (_.get(edge, 'node.frontmatter.category')) {
      cates = cates.concat(edge.node.frontmatter.category);
    }
  });

  cates = _.uniq(cates);

  // console.log(cates);
  cates.forEach(cate => {
    createPage({
      path: `/cates/${_.kebabCase(cate)}`,
      component: catePage,
      context: {
        category: cate,
      },
    });
  });
};
