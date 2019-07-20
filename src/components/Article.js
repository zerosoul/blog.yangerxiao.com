import React from 'react';
import styled from 'styled-components';
import { ellipsis } from 'polished';
import { Link, push } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { getYMD } from '../utils/fun';

import Subline from './Subline';

const Post = styled.article`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  position: relative;
`;

const Title = styled.h2`
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.8rem;
  ${ellipsis()};
`;

const Initiale = styled.span`
  position: absolute;
  left: 0.1rem;
  top: 0.2rem;
  font-weight: 700;
  font-size: 2rem;
  transform: translate(-50%, -50%);
  opacity: 0.08;
  user-select: none;
`;
const Container = styled.div`
  margin-top: 0.6rem;
  cursor: pointer;
`;
const Cover = styled.div`
  margin-bottom: 0.5rem;
  width: 100%;
  max-height: 18rem;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  img {
    margin-bottom: 0;
    width: 100%;
  }
`;
const Excerpt = styled.p``;

const Article = ({
  title,
  date,
  excerpt,
  slug,
  category,
  tags,
  cover,
  wordCount,
  timeToRead
}) => {
  const firstChar = title.charAt(1) || title.charAt(0);
  return (
    <Post>
      <Initiale>{firstChar}</Initiale>
      <Title>
        <Link to={slug} title={title}>
          {title}
        </Link>
      </Title>
      <Subline>
        {wordCount && <span>{`${wordCount}字/约${timeToRead}分钟`}</span>}
        {date && <span>{getYMD(date)} </span>}
        {category && (
          <span>
            <Link to={`/cates/${kebabCase(category)}`}>{category}</Link>
          </span>
        )}
        {tags && (
          <span>
            <span className="tags">
              {tags.map(tag => (
                <Link
                  key={`${kebabCase(tag)}`}
                  className="tag"
                  to={`/tags/${kebabCase(tag)}`}
                >
                  {tag}
                </Link>
              ))}
            </span>
          </span>
        )}
      </Subline>
      <Container onClick={() => push(slug)}>
        {cover && (
          <Cover>
            <img src={cover} alt={title} title={title} />
          </Cover>
        )}
        <Excerpt>{excerpt}</Excerpt>
      </Container>
    </Post>
  );
};

export default Article;
