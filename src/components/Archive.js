import React from 'react';
import { Link } from 'gatsby';
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

const Archive = ({ path, title, date }) => {
  const dateObj = new Date(date);
  const dateStr = `${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}`;
  return (
    <Item className="archive">
      <time className="date" dateTime={date}>
        {dateStr}
      </time>
      <Link className="title" to={path}>
        {title}
      </Link>
    </Item>
  );
};

export default Archive;
