import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import SEO from '../components/SEO';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Subline from '../components/Subline';
import { getYMD } from '../utils/fun';

import config from '../../config/SiteConfig';
// import '../utils/prismjs-theme.css';

const Content = styled.article`
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  padding: 2rem 1rem;
  background-color: ${props => props.theme.bg};
`;

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
      <Header />
      <Content>
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
      </Content>
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
