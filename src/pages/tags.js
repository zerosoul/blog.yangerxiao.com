import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
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
  word-break: keep-all;
  line-height: 3;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
`;

const Tag = styled.span`
  padding: 0.2rem 0.4rem;
  border: 1px solid #333;
  border-radius: 0.2rem;
  margin-right: 0.4rem;
  margin-top: 0.5rem;
`;

const Tags = props => {
  const { group } = props.data.allMarkdownRemark;

  return (
    <Wrapper>
      <Helmet title={`标签 | ${config.siteTitle}`} />
      <Header />
      <Content>
        <SectionTitle>标签</SectionTitle>
        {group.map(tag => (
          <Tag>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </Tag>
        ))}
      </Content>
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
