const _ = require('lodash');
const createTagPages = require('./gatsby-actions/createTagPages');
const createCategoryPages = require('./gatsby-actions/createCategoryPages');
const createPostPages = require('./gatsby-actions/createPostPages');

exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    const fileName = node.fileAbsolutePath.split('/').pop();
    const title = fileName.substring(0, fileName.length - 3);
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/posts/${_.kebabCase(node.frontmatter.slug)}`;
    }

    node.frontmatter.title = title;
    // console.log(node.frontmatter.keyword);
    const newDate = new Date(node.frontmatter.date.replace(/-/g, '/')).toISOString();
    node.frontmatter.date = newDate;

    createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    // const archivePage = path.resolve('src/templates/archives.js');
    resolve(
      graphql(`
        {
          posts: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  category
                  tags
                }
              }
            }
          }
        }
      `).then(result => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }

          const posts = result.data.posts.edges;

          createPostPages(createPage, posts);
          createTagPages(createPage, posts);
          createCategoryPages(createPage, posts);
        })
    );
  });
};
