const _ = require('lodash');
const createTagPages = require('./gatsby-actions/createTagPages');
const createCategoryPages = require('./gatsby-actions/createCategoryPages');
const createPostPages = require('./gatsby-actions/createPostPages');
const createPaginatedPages = require('gatsby-paginate');

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
                frontmatter {
                  title
                  date
                  category
                  tags
                  cover
                }
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
          // pageLength: 5, // This is optional and defaults to 10 if not used
          pathPrefix: '', // This is optional and defaults to an empty string if not used
          context: {}, // This is optional and defaults to an empty object if not used
        });
        createPaginatedPages({
          edges: result.data.posts.edges,
          createPage,
          pageTemplate: 'src/templates/archives.js',
          pageLength: 20, // This is optional and defaults to 10 if not used
          pathPrefix: 'archives', // This is optional and defaults to an empty string if not used
          context: {
            totalCount: result.data.posts.totalCount,
          }, // This is optional and defaults to an empty object if not used
        });
        // createPaginatedPages({
        //   edges: result.data.posts.edges,
        //   createPage,
        //   pageTemplate: 'src/templates/tag.js',
        //   pathPrefix: 'tags', // This is optional and defaults to an empty string if not used
        //   context: {}, // This is optional and defaults to an empty object if not used
        // });

        const posts = result.data.posts.edges;

        createPostPages(createPage, posts);
        createTagPages(createPage, createPaginatedPages, posts);
        createCategoryPages(createPage, createPaginatedPages, posts);
      })
    );
  });
};
