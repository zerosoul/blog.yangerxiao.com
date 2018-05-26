/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import { media } from '../utils/media';

import config from '../../config/SiteConfig';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.bg};
  z-index: 9000;
  margin-top: -3rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  .contact {
    display: flex;
    font-size: 0.9rem;
    @media ${media.phone} {
      flex-direction: column;
    }
    .item {
      flex: 1;
      dt {
      }
      dd {
      }
    }
  }
`;

const Contact = () => (
  <Wrapper>
    <Helmet title={`联系我 | ${config.siteTitle}`} />
    <Header>
      <Link to="/">{config.siteName}</Link>
    </Header>
    <Content>
      <h1>联系我</h1>
      <p>也许，我们能成为朋友。</p>
      <div className="contact">
        <div className="item email">
          <dt>邮箱：</dt>
          <dd>yanggc888#163.com</dd>
        </div>
        <div className="item wx">
          <dt>微信：</dt>
          <dd>
            <img src="weixin.jpg" alt="微信二维码" />
          </dd>
        </div>
      </div>
    </Content>
  </Wrapper>
);

export default Contact;
