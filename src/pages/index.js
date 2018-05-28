import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Article from '../components/Article';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';

const Content = styled.div`
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  padding: 1rem 0.2rem;
  z-index: 9000;
  // margin-top: -2rem;

  overflow: hidden;
`;
const IndexPage = props => {
  const postEdges = props.data.allMarkdownRemark.edges;

  return (
    <Wrapper>
      <Header />
      <Content>
        <SectionTitle>最新文章</SectionTitle>
        {postEdges.map(post => (
          <Article
            title={post.node.frontmatter.title}
            date={new Date(post.node.frontmatter.date)}
            excerpt={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            slug={post.node.fields.slug}
            category={post.node.frontmatter.category}
            tags={post.node.frontmatter.tags}
            key={post.node.fields.slug}
          />
        ))}
      </Content>
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
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
