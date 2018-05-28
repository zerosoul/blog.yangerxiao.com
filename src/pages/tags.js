import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import Wrapper from '../components/Wrapper';
import SectionTitle from '../components/SectionTitle';

import config from '../../config/SiteConfig';

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.a`
  flex: 1;
  position: relative;
  padding: 0.2rem 0.4rem;
  border: 1px solid #ddd;
  border-radius: 0.2rem;
  margin-right: 0.6rem;
  margin-top: 0.6rem;
  white-space: nowrap;
  text-align: center;
  :after {
    content: attr(data-count);
    box-sizing: content-box;
    color: #fff;
    background: #222;
    position: absolute;
    right: -0.5rem;
    top: -0.5rem;
    font-size: 0.4rem;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    padding: 0.2rem;
    border-radius: 1rem;
  }
`;

const Tags = props => {
  const { group } = props.data.allMarkdownRemark;

  return (
    <Wrapper>
      <Helmet title={`标签 | ${config.siteTitle}`} />
      <SectionTitle>标签</SectionTitle>
      <TagList>
        {group.map(tag => (
          <Tag
            key={`${kebabCase(tag.fieldValue)}`}
            href={`/tags/${kebabCase(tag.fieldValue)}`}
            data-count={tag.totalCount}
          >
            {tag.fieldValue}
          </Tag>
        ))}
      </TagList>
    </Wrapper>
  );
};

export default Tags;

/* eslint no-undef: off */
export const tagsQuery = graphql`
  query TagsPage {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
