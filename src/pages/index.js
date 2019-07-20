import React from 'react';
import { graphql } from 'gatsby';
import Article from '../components/Article';
import Wrapper from '../components/Wrapper';
import SectionTitle from '../components/SectionTitle';

const IndexPage = ({ data }) => {
  // console.log(data);

  const { edges: posts } = data.allMarkdownRemark;
  console.log('posts', posts);

  return (
    <Wrapper>
      <SectionTitle>最近更新</SectionTitle>
      {posts.map(({ node: post }) => {
        const { title, date, category, cover, tags, slug } = post.frontmatter;
        return (
          <Article
            wordCount={post.wordCount.words}
            timeToRead={post.timeToRead}
            title={title}
            date={date}
            excerpt={post.excerpt}
            slug={slug}
            category={category}
            tags={tags}
            cover={cover}
            key={slug}
          />
        );
      })}
    </Wrapper>
  );
};

export default IndexPage;
/* eslint no-undef: off */
export const updateRecentlyQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { draft: { ne: true } } }
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
  }
`;
