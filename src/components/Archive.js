import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const Item = styled.li`
  list-style: none;
  display: flex;
  .date {
    flex: 1;
    color: #999;
    margin-right: 0.5rem;
    text-align: right;
  }
  .title {
    flex: 11;
    text-align: left;
  }
`;

const Archive = ({ path, title, date }) => (
  <Item className="archive">
    <time className="date" dateTime={date}>
      {`${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`}
    </time>
    <Link className="title" to={path}>
      <span>{title}</span>
    </Link>
  </Item>
);

export default Archive;
