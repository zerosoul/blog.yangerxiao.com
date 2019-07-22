import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import Gitalk from '../components/Gitalk';
import Wrapper from '../components/Wrapper';
import Subline from '../components/Subline';
import Slider from '../components/Slider';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';

const Container = styled.div`
  @media ${media.desktop} {
    max-width: 90%;
    margin: 0 auto;
  }
`;
const Header = styled.h2`
  display: inline-block;
  margin-top: 0.6rem;
  margin-bottom: 0.4rem;
  padding-bottom: 0.4rem;
  width: auto;
  border-bottom: 1px solid #ddd;
`;

const Content = styled.div`
  margin: 0.4rem auto;
  display: flex;
  flex-direction: column;
  @media ${media.desktop} {
    flex-direction: row;
  }
  dd {
    flex: 10;
    white-space: nowrap;
    overflow: scroll;
  }
  a {
    text-decoration: underline;
  }
`;
const About = ({ data }) => (
  <Wrapper>
    <Helmet title={`关于我 | ${config.siteTitle}`} />
    <Container>
      <Subline sectionTitle>也许，我们能成为朋友。</Subline>
      <Slider
        imgs={data.slideImgs.edges.map(img => (
          <Img fluid={img.node.fluid} key={img.node.fluid.src} alt="关于我" />
        ))}
      />

      <Header>联系方式</Header>
      <Content>
        <dt>邮箱：</dt>
        <dd>yanggc888#163.com</dd>
      </Content>
      <Content>
        <dt>微信：</dt>
        <dd>
          <Img fluid={data.wxImage.fluid} alt="微信二维码" />
        </dd>
      </Content>
      <Gitalk />
    </Container>
  </Wrapper>
);

export default About;
/* eslint no-undef: off */
export const query = graphql`
  query ProfileImagesQuery {
    slideImgs: allImageSharp(
      filter: { fluid: { originalName: { regex: "/about_slide_/" } } }
    ) {
      edges {
        node {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    wxImage: imageSharp(fluid: { originalName: { regex: "/wx.jpg/" } }) {
      fluid(maxWidth: 400) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
