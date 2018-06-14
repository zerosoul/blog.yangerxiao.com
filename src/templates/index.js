import React from 'react';
// import Link from 'gatsby-link';
import Article from '../components/Article';
import Wrapper from '../components/Wrapper';
import Pagination from '../components/Pagination';
import SectionTitle from '../components/SectionTitle';

const IndexPage = ({ data, pathContext }) => {
  // console.log(pathContext);

  const { group, index, first, last, pageCount, pathPrefix } = pathContext;
  const pageProps = { index, first, last, pageCount, pathPrefix };

  // const postEdges = props.data.allMarkdownRemark.edges;

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
