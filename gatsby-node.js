const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const createTagPages = require('./gatsby-actions/createTagPages');
const createCategoryPages = require('./gatsby-actions/createCategoryPages');
const createArchivePages = require('./gatsby-actions/createArchivePages');
const createPostPages = require('./gatsby-actions/createPostPages');
const createPaginatedPages = require('gatsby-paginate');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          posts: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { draft: { ne: true } } }
          ) {
            totalCount
            edges {
              node {
                fields {
                  slug
                }
                html
                frontmatter {
                  title
                  date
                  category
                  tags
                  cover
                }
                tableOfContents
                excerpt(pruneLength: 150)
              }
            }
          }
        }
      `).then(result => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }
          createPaginatedPages({
            edges: result.data.posts.edges,
            createPage,
            pageTemplate: 'src/templates/index.js',
          });

          const posts = result.data.posts.edges;

          createPostPages(createPage, posts);
          createArchivePages(createPage, createPaginatedPages, posts);
          createTagPages(createPage, createPaginatedPages, posts);
          createCategoryPages(createPage, createPaginatedPages, posts);
        })
    );
  });

}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    let slug = "";
    const fileName = node.fileAbsolutePath.split('/').pop();
    const title = fileName.substring(0, fileName.length - 3);
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/posts/${_.kebabCase(node.frontmatter.slug)}`;
    }

    node.frontmatter.title = title;
    node.frontmatter.date = new Date(node.frontmatter.date.replace(/-/g, '/')).toISOString();

    createNodeField({ node, name: 'slug', value: slug });
  }
}
