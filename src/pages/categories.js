import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import Wrapper from '../components/Wrapper';
import SectionTitle from '../components/SectionTitle';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';

const Title = styled.h3`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
`;
const Cates = styled.div`
  @media ${media.desktop} {
    max-width: 45%;
    margin: 0 auto;
  }
`;
const Categories = props => {
  const { group } = props.data.allMarkdownRemark;

  return (
    <Wrapper>
      <Helmet title={`分类 | ${config.siteTitle}`} />
      <SectionTitle>分类</SectionTitle>
      <Cates>
        {group.map(category => (
          <Title key={`${kebabCase(category.fieldValue)}`}>
            <Link to={`/categories/${kebabCase(category.fieldValue)}`}>
              {category.fieldValue}({category.totalCount})
            </Link>
          </Title>
        ))}
      </Cates>
    </Wrapper>
  );
};

export default Categories;

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
