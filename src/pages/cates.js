import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import Wrapper from '../components/Wrapper';
import DocTitle from '../components/DocTitle';
import Subline from '../components/Subline';
import { media } from '../utils/media';

const Title = styled.h3`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
`;
const Cates = styled.div`
  @media ${media.desktop} {
    max-width: 50%;
    margin: 0 auto;
  }
`;
const Categories = props => {
  const { group } = props.data.allMarkdownRemark;
  group.sort((a, b) => {
    if (a.totalCount > b.totalCount) {
      return -1;
    } else if (a.totalCount < b.totalCount) {
      return 1;
    }
    return 0;
  });
  return (
    <Wrapper>
      <Subline sectionTitle>{`共${group.length}个分类`}</Subline>
      <Cates>
        {group.map(category => (
          <Title key={`${kebabCase(category.fieldValue)}`}>
            <Link to={`/cates/${kebabCase(category.fieldValue)}`}>
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
export const catesQuery = graphql`query CategoriesPage {
  allMarkdownRemark {
    group(field: {frontmatter: {category: SELECT}}) {
      fieldValue
      totalCount
    }
  }
}`;
export const Head = () => <DocTitle title='分类' />