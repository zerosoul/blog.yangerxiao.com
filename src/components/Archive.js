import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { pad } from '../utils/fun';
import { ellipsis } from 'polished';

const Item = styled.li`
  list-style: none;
  display: flex;
  line-height: 1.6rem;
  .date {
    flex: 2;
    font-size: 0.6rem;
    color: #999;
    margin-right: 0.5rem;
    text-align: right;
  }
  .title {
    flex: 10;
    text-align: left;
    ${ellipsis()};
  }
`;

const Archive = ({ path, title, date }) => (
  <Item className="archive">
    <time className="date" dateTime={date}>
      {`${pad(new Date(date).getMonth() + 1)}-${pad(new Date(date).getDate())}`}
    </time>
    <Link className="title" to={path}>
      <span>{title}</span>
    </Link>
  </Item>
);

export default Archive;
