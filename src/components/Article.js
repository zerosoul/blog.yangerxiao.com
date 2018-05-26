import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import kebabCase from 'lodash/kebabCase';

import Subline from './Subline';
import { media } from '../utils/media';

const Post = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
  margin-left: 0.5rem;
`;

const Title = styled.h2`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.8rem;
  @media ${media.phone} {
    font-size: 1.2rem;
  }
`;

const Initiale = styled.span`
  position: absolute;
  font-size: 6rem;
  transform: translate(-50%, -50%);
  opacity: 0.08;
  user-select: none;
  z-index: -1;
`;

const Excerpt = styled.p`
  grid-column: -1 / 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Article = ({ title, date, excerpt, slug, timeToRead, category, tags }) => {
  const firstChar = title.charAt(1);
  return (
    <Post>
      <Title>
        <Initiale>{firstChar}</Initiale>
        <Link to={slug}>{title}</Link>
      </Title>
      <Subline>
        {date && <span>发布：{date} </span>}
        {timeToRead && <span>阅读：{timeToRead}min </span>}
        {category && (
          <span>
            分类：<Link to={`/categories/${kebabCase(category)}`}>{category}</Link>
          </span>
        )}
        {tags && (
          <span>
            标签：{tags.map(tag => (
              <Link className="tag" to={`/tags/${kebabCase(tag)}`}>
                {tag}
              </Link>
            ))}
          </span>
        )}
      </Subline>
      <Excerpt>{excerpt}</Excerpt>
    </Post>
  );
};

export default Article;
