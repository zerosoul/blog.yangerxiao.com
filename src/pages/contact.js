/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Link from 'gatsby-link';
import Wrapper from '../components/Wrapper';
import SectionTitle from '../components/SectionTitle';
import Subline from '../components/Subline';
import { media } from '../utils/media';
import Img from 'gatsby-image';

import config from '../../config/SiteConfig';

const ContactBlock = styled.div`
  display: flex;
  font-size: 1rem;
  flex-direction: column;
  @media ${media.desktop} {
    flex-direction: row;
  }
  .item {
    flex: 1;
  }
`;

const Contact = ({ data }) => (
  <Wrapper>
    <Helmet title={`联系我 | ${config.siteTitle}`} />
    <SectionTitle>
      <Link to="/contact">联系我</Link>
    </SectionTitle>
    <Subline sectionTitle>也许，我们能成为朋友。</Subline>
    <ContactBlock>
      <div className="item email">
        <dt>邮箱：</dt>
        <dd>yanggc888#163.com</dd>
      </div>
      <div className="item wx">
        <dt>微信：</dt>
        <dd>
          <Img sizes={data.wxImage.sizes} />
        </dd>
      </div>
    </ContactBlock>
  </Wrapper>
);

export default Contact;

export const pageQuery = graphql`
  query WxImageQuery {
    wxImage: imageSharp(id: { regex: "/wx/" }) {
      sizes(maxWidth: 400) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
