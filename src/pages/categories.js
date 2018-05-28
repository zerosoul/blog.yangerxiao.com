import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';

import config from '../../config/SiteConfig';

const Content = styled.div`
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 1rem;
  background-color: ${props => props.theme.bg};
`;

const Title = styled.h3`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
`;

const Category = props => {
  const { group } = props.data.allMarkdownRemark;

  return (
    <Wrapper>
      <Helmet title={`分类 | ${config.siteTitle}`} />
      <Header />
      <Content>
        <SectionTitle>分类</SectionTitle>
        {group.map(category => (
          <Title>
            <Link to={`/categories/${kebabCase(category.fieldValue)}`}>{category.fieldValue}</Link> ({
              category.totalCount
            })
          </Title>
        ))}
      </Content>
    </Wrapper>
  );
};

export default Category;

/* eslint no-undef: off */
export const postQuery = graphql`
  query CategoriesPage {
    allMarkdownRemark {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
