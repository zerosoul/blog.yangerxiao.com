import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { media } from '../../utils/media';

const Container = styled.section`
  .avator {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #999;
    .top {
      position: relative;
      .img {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        // transform: rotate(-10deg);
        @media ${media.tabletWide} {
          width: 15rem;
          height: 15rem;
        }
      }
      .status {
        position: absolute;
        right: 0;
        bottom: 0.1rem;
        font-size: 0.5rem;
        background: #333;
        color: #fff;
        padding: 0.1rem 0.3rem;
        border-radius: 1rem;
        z-index: -1;
      }
    }
    .name {
      font-size: 2.2rem;
      @media ${media.tabletWide} {
        font-size: 3rem;
        // flex-direction: row;
      }
      margin-top: 1rem;
      margin-bottom: 0;
    }
    .desc {
      margin-top: 0;
    }
  }

  dl {
    margin-top: 1rem;
    dt {
      color: #666;
      font-weight: normal;
    }
    dt,
    dd {
      display: inline;
    }
    dd + dd:before {
      content: ', ';
    }
    dd + dt:before {
      content: '\000A';
      white-space: pre-wrap;
    }
    dd {
      margin: 0;
      font-weight: bold;
      color: #333;
      a {
        text-decoration: underline;
      }
      &.blog {
        padding-left: 0.2rem;
      }
      a[href^='tel:'] {
        color: #333;
        &:before {
          content: '\\260E';
          margin-left: 0.2rem;
        }
      }
    }
  }
`;
const Profile = props => {
  const { name, avator, info: { basic, blog, email, tel } } = props;
  return (
    <Container>
      <div className="avator">
        <div className="top">
          <Img className="img" sizes={avator} alt="简历头像" />
          <span className="status">已离职</span>
        </div>
        <h1 className="name">{name}</h1>
        <p className="desc">{basic}</p>
      </div>
      <dl>
        {/* {basic && (
          <React.Fragment>
            <dt>基本:</dt>
            <dd>{basic}</dd>
          </React.Fragment>
        )} */}
        {blog && (
          <React.Fragment>
            <dt>博客:</dt>
            <dd className="blog">
              <a target="_blank" href={blog}>
                blog.yangerxiao.com
              </a>
            </dd>
          </React.Fragment>
        )}

        {email && (
          <React.Fragment>
            <dt>邮箱:</dt> <dd>{email}</dd>
          </React.Fragment>
        )}

        {tel && (
          <React.Fragment>
            <dt>电话:</dt>
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
