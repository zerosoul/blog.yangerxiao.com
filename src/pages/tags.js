import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';

import config from '../../config/SiteConfig';

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.a`
  position: relative;
  padding: 0.2rem;
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
    font-size: 0.5rem;
    font-weight: 700;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    padding: 0.2rem;
    border-radius: 50%;
  }
`;

const Tags = props => {
  const { group } = props.data.allMarkdownRemark;
  group.sort((a, b) => {
    if (a.totalCount > b.totalCount) {
      return -1;
    } else if (a.totalCount < b.totalCount) {
      return 1;
    }
    return 0;
  });
  const sublineStr = `共${group.length}个标签`;
  return (
    <Wrapper>
      <Helmet title={`标签 | ${config.siteTitle}`} />
      <Subline sectionTitle>{sublineStr}</Subline>
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
    allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
