import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import Article from '../components/Article';
import SectionTitle from '../components/SectionTitle';

import config from '../../config/SiteConfig';

const Category = props => {
  const { category } = props.pathContext;
  const { edges, totalCount } = props.data.allMarkdownRemark;
  const sublineStr = `（共${totalCount}篇）`;

  return (
    <Wrapper>
      <Helmet title={`${category} | ${config.siteTitle}`} />
      <SectionTitle>
        <Link to="/categories">分类</Link> | {category}
      </SectionTitle>
      <Subline sectionTitle>{sublineStr}</Subline>
      {edges.map(post => (
        <Article
          title={post.node.frontmatter.title}
          date={new Date(post.node.frontmatter.date)}
          excerpt={post.node.excerpt}
          timeToRead={post.node.timeToRead}
          slug={post.node.fields.slug}
          category={post.node.frontmatter.category}
          key={post.node.fields.slug}
        />
      ))}
    </Wrapper>
  );
};

export default Category;

/* eslint no-undef: off */
export const categoryQuery = graphql`
  query CategoryPage($category: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
            category
          }
          fields {
            slug
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
