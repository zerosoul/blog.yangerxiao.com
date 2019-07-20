import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import Archive from '../components/Archive';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import Pagination from '../components/Pagination';

const ArchiveList = styled.div`
  .archives-list {
    margin-left: 0;
  }
`;
const Container = styled.div`
  @media ${media.desktop} {
    margin: 0 auto;
  }
`;
const Archives = ({ pageContext }) => {
  const { group, index, first, last, pageCount, pathPrefix } = pageContext;
  const { totalCount } = pageContext.additionalContext;
  const pageProps = { index, first, last, pageCount, pathPrefix };

  const sublineStr = `共${totalCount}篇`;
  const archives = {};

  group.forEach(({ node }) => {
    const year = new Date(node.frontmatter.date).getFullYear();
    if (!archives[`year${year}`]) {
      archives[`year${year}`] = [];
    }
    archives[`year${year}`].push(node);
  });

  return (
    <Wrapper>
      <Helmet title={`归档 | ${config.siteTitle}`} />
      <Subline sectionTitle>{sublineStr}</Subline>
      <Container>
        {Object.keys(archives).map(date => {
          const year = date.substr(4);

          const archiveEle = archives[date].map(node => {
            let { slug, title, date } = node.frontmatter;
            return <Archive key={slug} path={slug} title={title} date={date} />;
          });
          return (
            <ArchiveList className="archives-item" key={year}>
              <h2 className="archive-year">{year}</h2>
              <ul className="archives-list">{archiveEle}</ul>
            </ArchiveList>
          );
        })}
        <Pagination {...pageProps} />
      </Container>
    </Wrapper>
  );
};

export default Archives;
