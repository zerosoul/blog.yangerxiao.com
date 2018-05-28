/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import { media } from '../utils/media';

import config from '../../config/SiteConfig';

const ContactBlock = styled.div`
  display: flex;
  font-size: 1rem;
  @media ${media.phone} {
    flex-direction: column;
  }
  .item {
    flex: 1;
  }
`;

const Contact = () => (
  <Wrapper>
    <Helmet title={`联系我 | ${config.siteTitle}`} />
    <h1>联系我</h1>
    <p>也许，我们能成为朋友。</p>
    <ContactBlock>
      <div className="item email">
        <dt>邮箱：</dt>
        <dd>yanggc888#163.com</dd>
      </div>
      <div className="item wx">
        <dt>微信：</dt>
        <dd>
          <img src="/images/site/wx.jpg" alt="微信二维码" />
        </dd>
      </div>
    </ContactBlock>
  </Wrapper>
);

export default Contact;
