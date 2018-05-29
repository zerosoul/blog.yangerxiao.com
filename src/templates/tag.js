import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import Article from '../components/Article';
import SectionTitle from '../components/SectionTitle';

import config from '../../config/SiteConfig';

const Tag = props => {
  const { tag } = props.pathContext;
  const { edges, totalCount } = props.data.allMarkdownRemark;
  const subline = `（共${totalCount}篇）`;

  return (
    <Wrapper>
      <Helmet title={`${tag} | ${config.siteTitle}`} />
      <SectionTitle>
        <Link to="/tags">标签</Link> | {tag}
      </SectionTitle>
      <Subline sectionTitle>{subline}</Subline>
      {edges.map(post => {
        const { title, cover, date, tags } = post.node.frontmatter;
        return (
          <Article
            title={title}
            date={date}
            excerpt={post.node.excerpt}
            slug={post.node.fields.slug}
            tags={tags}
            cover={cover}
            key={post.node.fields.slug}
          />
        );
      })}
    </Wrapper>
  );
};

export default Tag;

/* eslint no-undef: off */
export const tagQuery = graphql`
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
            cover
          }
          fields {
            slug
          }
          excerpt(pruneLength: 150)
        }
      }
    }
  }
`;
