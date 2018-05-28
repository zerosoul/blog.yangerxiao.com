const path = require('path');
const _ = require('lodash');

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
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }

    node.frontmatter.title = title;
    // console.log(node.frontmatter.keyword);

    createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.js');
    const categoryPage = path.resolve('src/templates/category.js');
    const tagPage = path.resolve('src/templates/tag.js');
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
        // post
        posts.forEach((edge, index) => {
          const prev = index === 0 ? false : posts[index - 1].node;
          const next = index === posts.length - 1 ? false : posts[index + 1].node;

          createPage({
            path: edge.node.fields.slug,
            component: postPage,
            context: {
              slug: edge.node.fields.slug,
              prev,
              next,
            },
          });
        });
        // cates
        let categories = [];

        _.each(posts, edge => {
          if (_.get(edge, 'node.frontmatter.category')) {
            categories = categories.concat(edge.node.frontmatter.category);
          }
        });

        categories = _.uniq(categories);

        categories.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}`,
            component: categoryPage,
            context: {
              category,
            },
          });
        });
        // archives
        // let archivePosts = [];

        // _.each(posts, edge => {
        //   if (_.get(edge, 'node.frontmatter.category')) {
        //     categories = categories.concat(edge.node.frontmatter.category);
        //   }
        // });

        // const archivePosts = posts;
        // const totalCount = posts.length;

        // createPage({
        //   path: '/archives',
        //   component: archivePage,
        //   // context: {
        //   //   archivePosts,
        //   //   totalCount,
        //   // },
        // });
        // tags
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
      })
    );
  });
};
