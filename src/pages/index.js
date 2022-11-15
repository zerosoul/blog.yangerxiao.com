import React from 'react';
import { graphql } from 'gatsby';

import Article from '../components/Article';
import Wrapper from '../components/Wrapper';
import SectionTitle from '../components/SectionTitle';
import DocTitle from '../components/DocTitle';

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Wrapper>
      <SectionTitle>最近更新</SectionTitle>
      {posts.map(({ node: post }) => {
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
    </Wrapper>
  );
};

export default IndexPage;
/* eslint no-undef: off */
export const updateRecentlyQuery = graphql`query IndexQuery {
  allMarkdownRemark(
    limit: 10
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {draft: {ne: true}}}
  ) {
    edges {
      node {
        wordCount {
          words
        }
        timeToRead
        frontmatter {
          slug
          cover
          date(formatString: "YYYY/MM/DD hh:mm")
          title
          tags
          category
        }
        excerpt(format: PLAIN, pruneLength: 200)
      }
    }
  }
}`;
export const Head = () => <DocTitle title='杨二的个人博客' />
