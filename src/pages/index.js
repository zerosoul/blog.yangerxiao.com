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
      {postEdges.map(post => {
        const { title, date, category, cover, tags } = post.node.frontmatter;
        return (
          <Article
            title={title}
            date={date}
            excerpt={post.node.excerpt}
            slug={post.node.fields.slug}
            category={category}
            tags={tags}
            cover={cover}
            key={post.node.fields.slug}
          />
        );
      })}
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
          excerpt(pruneLength: 150)
        }
      }
    }
  }
`;
