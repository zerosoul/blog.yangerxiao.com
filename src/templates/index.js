import React from 'react';
import Article from '../components/Article';
import Wrapper from '../components/Wrapper';
import Pagination from '../components/Pagination';
import SectionTitle from '../components/SectionTitle';

const IndexPage = ({ pageContext }) => {
  console.log(pageContext);

  const {
    group,
    index,
    first,
    last,
    pageCount,
    pathPrefix: prefix
  } = pageContext;
  const pathPrefix = prefix == '/' ? 'page' : prefix;
  const pageProps = { index, first, last, pageCount, pathPrefix };
  return (
    <Wrapper>
      <SectionTitle>最新文章</SectionTitle>
      {group.map(({ node: post }) => {
        const { title, date, category, cover, tags } = post.frontmatter;
        return (
          <Article
            title={title}
            date={date}
            excerpt={post.excerpt}
            slug={post.fields.slug}
            category={category}
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

export default IndexPage;
