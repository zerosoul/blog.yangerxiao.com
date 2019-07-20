import React from 'react';
import Helmet from 'react-helmet';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import Article from '../components/Article';
import SectionTitle from '../components/SectionTitle';
import Pagination from '../components/Pagination';

import config from '../../config/SiteConfig';

const Category = ({ pageContext }) => {
  const {
    additionalContext: { category, total },
    group,
    index,
    first,
    last,
    pageCount,
    pathPrefix
  } = pageContext;
  const pageProps = { index, first, last, pageCount, pathPrefix };

  const sublineStr = `（共${total}篇）`;

  return (
    <Wrapper>
      <Helmet title={`${category} | ${config.siteTitle}`} />
      <SectionTitle>{category}</SectionTitle>
      <Subline sectionTitle>{sublineStr}</Subline>
      {group.map(({ node: post }) => {
        const { title, cover, date, category: cate } = post.frontmatter;
        return (
          <Article
            title={title}
            date={date}
            excerpt={post.excerpt}
            slug={post.fields.slug}
            category={cate}
            cover={cover}
            key={post.fields.slug}
          />
        );
      })}
      <Pagination {...pageProps} />
    </Wrapper>
  );
};

export default Category;
