import React from 'react';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import Article from '../components/Article';
import SectionTitle from '../components/SectionTitle';
import DocTitle from '../components/DocTitle';
import Pagination from '../components/Pagination';

const Tag = ({ pageContext }) => {
  const {
    additionalContext: { tag, total },
    group,
    index,
    first,
    last,
    pageCount,
    pathPrefix
  } = pageContext;
  const pageProps = { index, first, last, pageCount, pathPrefix };

  const subline = `（共${total}篇）`;

  return (
    <Wrapper>
      <SectionTitle>#{tag}</SectionTitle>
      <Subline sectionTitle>{subline}</Subline>
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

export default Tag;
export const Head = ({ pageContext: { additionalContext: { tag } } }) => <DocTitle title={tag} />