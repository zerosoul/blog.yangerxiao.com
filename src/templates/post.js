import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import SEO from '../components/SEO';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import { getYMD } from '../utils/fun';
import { media } from '../utils/media';

import config from '../../config/SiteConfig';
import '../utils/prismjs-theme.css';

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const PostContent = styled.div`
  margin-top: 2rem;
  h1 {
    font-size: 1.6rem;
  }
  h2 {
    font-size: 1.2rem;
  }
  p img {
    margin: 0 auto;
    padding: 1.6rem 0;
    transform: scale(1.14);
  }
  @media ${media.phoneWide} {
    p img {
      padding: 1.7rem 0;
      transform: scale(1.1);
    }
  }
  @media ${media.desktop} {
    p img {
      padding: 0;
      transform: scale(1);
    }
  }
`;
const ArticleNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-top: 1px solid #ddd;
  padding-top: 0.8rem;
  @media ${media.desktop} {
    align-items: center;
    flex-direction: row;
  }
  > a {
    flex: 1;
    position: relative;
    color: #999;
    padding: 0.5rem 0;
    &:active {
      background: #ddd;
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      margin-top: -0.5rem;
      width: 0;
      height: 0;
      border-top: 0.5rem solid transparent;
      border-bottom: 0.5rem solid transparent;
    }
    &.prev::after {
      left: -1rem;
      border-right: 0.5rem solid #999;
    }
    &.next {
      text-align: right;
      &::after {
        right: -1rem;
        border-left: 0.5rem solid #999;
      }
    }
  }
`;
const Post = props => {
  const { slug, prev, next } = props.pathContext;
  const postNode = props.data.markdownRemark;
  const { title, date, tags, category } = postNode.frontmatter;

  return (
    <Wrapper>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <Title>{title}</Title>
      <Subline>
        {date && <span>{getYMD(new Date(date.replace(/-/g, '/')))} </span>}
        {category && (
          <span>
            <Link to={`/categories/${kebabCase(category)}`}>{category}</Link>
          </span>
        )}
        {tags && (
          <span>
            <span className="tags">
              {tags.map(tag => (
                <Link key={`${kebabCase(tag)}`} className="tag" to={`/tags/${kebabCase(tag)}`}>
                  {tag}
                </Link>
              ))}
            </span>
          </span>
        )}
      </Subline>
      <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />
      <ArticleNav>
        {prev && <Link to={prev.fields.slug} className="prev">{`${prev.frontmatter.title}`}</Link>}
        {next && <Link to={next.fields.slug} className="next">{`${next.frontmatter.title}`}</Link>}
      </ArticleNav>
    </Wrapper>
  );
};

export default Post;

/* eslint no-undef: off */
export const postQuery = graphql`
  query postBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        category
        tags
      }
    }
  }
`;
