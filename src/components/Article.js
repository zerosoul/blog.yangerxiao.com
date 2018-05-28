import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import kebabCase from 'lodash/kebabCase';
import { getYMD } from '../utils/fun';
import { ellipsis } from 'polished';

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
  left: 0;
  top: 0;
  font- weight: 700;
  font- size: 2rem;
  transform: translate(-50 %, -50 %);
  opacity: 0.08;
  user- select: none;
`;

const Excerpt = styled.p`
  margin: 0.4rem 0;
`;

const Article = ({ title, date, excerpt, slug, category, tags }) => {
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
        {date && <span>发布：{getYMD(date)} </span>}
        {category && (
          <span>
            分类：<Link to={`/ categories / ${kebabCase(category)} `}>{category}</Link>
          </span>
        )}
        {tags && (
          <span>
            标签：{tags.map(tag => (
              <Link className="tag" to={`/ tags / ${kebabCase(tag)} `}>
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
