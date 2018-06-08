import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import Article from '../components/Article';
import SectionTitle from '../components/SectionTitle';
import Pagination from '../components/Pagination';

import config from '../../config/SiteConfig';

const Tag = ({ pathContext }) => {
  const { additionalContext: { tag, total }, group, index, first, last, pageCount, pathPrefix } = pathContext;
  const pageProps = { index, first, last, pageCount, pathPrefix };

  const subline = `（共${total}篇）`;

  return (
    <Wrapper>
      <Helmet title={`${tag} | ${config.siteTitle}`} />
      <SectionTitle>
        <Link to="/tags">标签</Link> | {tag}
      </SectionTitle>
      <Subline sectionTitle>{subline}</Subline>
      {group.map(({ node: post }) => {
        const { title, cover, date, tags } = post.frontmatter;
        return (
          <Article
            title={title}
            date={date}
            excerpt={post.excerpt}
            slug={post.fields.slug}
            tags={tags}
            cover={cover}
            key={post.fields.slug}
          />
        );
      })}
      <Pagination {...pageProps} />
    </Wrapper>
  );
};

export default Tag;
