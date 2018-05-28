import React from 'react';
import Link from 'gatsby-link';
import Article from '../components/Article';
import Wrapper from '../components/Wrapper';
import SectionTitle from '../components/SectionTitle';

const IndexPage = props => {
  const postEdges = props.data.allMarkdownRemark.edges;

  return (
    <Wrapper>
      <SectionTitle>最新文章</SectionTitle>
      {postEdges.map(post => (
        <Article
          title={post.node.frontmatter.title}
          date={post.node.frontmatter.date.replace(/-/g, '/')}
          excerpt={post.node.excerpt}
          slug={post.node.fields.slug}
          category={post.node.frontmatter.category}
          tags={post.node.frontmatter.tags}
          cover={post.node.frontmatter.cover}
          key={post.node.fields.slug}
        />
      ))}
    </Wrapper>
  );
};

export default IndexPage;

/* eslint no-undef: off */
export const IndexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
