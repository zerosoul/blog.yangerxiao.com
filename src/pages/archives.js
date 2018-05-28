import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import Archive from '../components/Archive';
import SectionTitle from '../components/SectionTitle';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';

const ArchiveList = styled.div`
  .archives-list {
    margin-left: 0;
  }
`;
const Container = styled.div`
  @media ${media.desktop} {
    max-width: 70%;
    margin: 0 auto;
  }
`;
const Archives = props => {
  // console.log(props);

  const { edges, totalCount } = props.data.allMarkdownRemark;
  const sublineStr = `（共${totalCount}篇）`;
  const archives = {};

  edges.forEach(({ node }) => {
    const year = new Date(node.frontmatter.date).getFullYear();
    if (!archives[`year${year}`]) {
      archives[`year${year}`] = [];
    }
    archives[`year${year}`].push(node);
  });
  console.log(archives);

  return (
    <Wrapper>
      <Helmet title={`归档 | ${config.siteTitle}`} />
      <SectionTitle>
        <Link to="/archives">归档</Link>
      </SectionTitle>
      <Subline sectionTitle>{sublineStr}</Subline>
      <Container>
        {Object.keys(archives).map(date => {
          const year = date.substr(4);
          const archiveEle = archives[date].map(node => (
            <Archive
              key={node.fields.slug}
              path={node.fields.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date.substr(5)}
            />
          ));
          return (
            <ArchiveList className="archives-item" key={year}>
              <h2 className="archive-year">{year}</h2>
              <ul className="archives-list">{archiveEle}</ul>
            </ArchiveList>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default Archives;

/* eslint no-undef: off */
export const archivesQuery = graphql`
  query ArchivesPage {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
