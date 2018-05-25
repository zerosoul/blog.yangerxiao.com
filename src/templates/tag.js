import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Subline from '../components/Subline';
import Article from '../components/Article';
import SectionTitle from '../components/SectionTitle';
import { media } from '../utils/media';

import config from '../../config/SiteConfig';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.bg};
  z-index: 9000;
  margin-top: -3rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
`;

const Tag = props => {
  const { tag } = props.pathContext;
  const { edges, totalCount } = props.data.allMarkdownRemark;
  const subline = `共${totalCount}篇`;

  return (
    <Wrapper>
      <Helmet title={`${tag} | ${config.siteTitle}`} />
      <Header>
        <Link to="/">{config.siteName}</Link>
      </Header>
      <Content>
        <SectionTitle>
          <Link to="/tags">标签</Link> > {tag}
        </SectionTitle>
        <Subline sectionTitle>{subline}</Subline>
        {edges.map(post => (
          <Article
            title={post.node.frontmatter.title}
            date={new Date(post.node.frontmatter.date).toLocaleString()}
            excerpt={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            slug={post.node.fields.slug}
            tags={post.node.frontmatter.tags}
            key={post.node.fields.slug}
          />
        ))}
      </Content>
    </Wrapper>
  );
};

export default Tag;

/* eslint no-undef: off */
export const postQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
            tags
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
