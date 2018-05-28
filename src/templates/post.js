import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import SEO from '../components/SEO';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import { getYMD } from '../utils/fun';

import config from '../../config/SiteConfig';
// import '../utils/prismjs-theme.css';

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const PostContent = styled.div`
  margin-top: 2rem;
`;

const Post = props => {
  const { slug } = props.pathContext;
  const postNode = props.data.markdownRemark;
  const { title, date, tags, category, timeToRead } = postNode.frontmatter;

  return (
    <Wrapper>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <Title>{title}</Title>
      <Subline>
        {date && <span>发布：{getYMD(new Date(date))} </span>}
        {timeToRead && <span>阅读：{timeToRead}min </span>}
        {category && (
          <span>
            分类：<Link to={`/categories/${kebabCase(category)}`}>{category}</Link>
          </span>
        )}
        {tags && (
          <span>
            标签：{tags.map(tag => (
              <Link className="tag" to={`/tags/${kebabCase(tag)}`}>
                {tag}
              </Link>
            ))}
          </span>
        )}
      </Subline>
      <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />
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
      timeToRead
    }
  }
`;
