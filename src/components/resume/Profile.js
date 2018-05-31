import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Container = styled.div`
  position: relative;
  .name {
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #999;
  }
  .avator {
    position: absolute;
    right: 0.6rem;
    top: 0.8rem;
    width: 9rem;

    border: 0.3rem solid #030c4f;
    transform: rotate(-10deg);
    img {
      height: 100%;
    }
  }
  dl {
    dt {
      position: relative;
      &:after {
        content: '：';
        position: absolute;
        right: -0.2rem;
      }
    }
    dd {
      color: #999;
      a[href^='tel:'] {
        color: #999;
        &:after {
          content: '\\260E';
          margin-left: 0.2rem;
        }
      }
    }
  }
`;
const Profile = props => {
  const { name, avator, info: { blog, email, tel } } = props;
  return (
    <Container>
      <h1 className="name">{name}</h1>
      <div className="avator">
        <Img sizes={avator} alt="简历头像" />
      </div>
      <dl>
        {blog && (
          <React.Fragment>
            <dt>博客</dt>
            <dd>
              <a href={`${blog}`}>{blog}</a>
            </dd>
          </React.Fragment>
        )}

        {email && (
          <React.Fragment>
            <dt>邮箱</dt> <dd>{email}</dd>
          </React.Fragment>
        )}

        {tel && (
          <React.Fragment>
            <dt>电话</dt>
            <dd>
              <a href={`tel:${tel}`}>{tel}</a>
            </dd>
          </React.Fragment>
        )}
      </dl>
      {props.children}
    </Container>
  );
};
export default Profile;
