import React from 'react';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import DocTitle from '../components/DocTitle';
import Article from '../components/Article';
import SectionTitle from '../components/SectionTitle';
import Pagination from '../components/Pagination';

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
      <SectionTitle>{category}</SectionTitle>
      <Subline sectionTitle>{sublineStr}</Subline>
      {group.map(({ node: post }) => {
        const { slug } = post.frontmatter;
        return (
          <Article
            wordCount={post.wordCount.words}
            timeToRead={post.timeToRead}
            excerpt={post.excerpt}
            key={slug}
            {...post.frontmatter}
          />
        );
      })}
      <Pagination {...pageProps} />
    </Wrapper>
  );
};

export default Category;
export const Head = ({ pageContext: { additionalContext: { category } } }) => <DocTitle title={category} />