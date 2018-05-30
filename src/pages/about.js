/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import SectionTitle from '../components/SectionTitle';
import Subline from '../components/Subline';
import Img from 'gatsby-image';
import Slider from '../components/Slider';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';

const Container = styled.div`
  @media ${media.desktop} {
    max-width: 80%;
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

const Content = styled.p`
  margin: 0.4rem auto;
  display: flex;
  flex-direction: column;
  @media ${media.desktop} {
    flex-direction: row;
  }
  dt {
    flex: 2;
  }
  dd {
    flex: 10;
  }
`;
const About = ({ data }) => (
  <Wrapper>
    <Helmet title={`关于我 | ${config.siteTitle}`} />
    <Container>
      <SectionTitle>
        <Link to="/about">关于我</Link>
      </SectionTitle>
      <Subline sectionTitle>也许，我们能成为朋友。</Subline>
      <Slider imgs={data.allImageSharp.edges.map(img => <Img sizes={img.node.sizes} alt="关于我" />)} />
      <Header>基本信息</Header>
      <Content>89年/金牛座/山东/本科/软件工程专业</Content>
      <Header>技术栈</Header>
      <Content>语言：Javascript/HTML5/PHP</Content>
      <Content>平台/框架/类库：Node.js/Laravel/React/jQuery</Content>
      <Content>工具：Sublime/Chrome/Bash/git/Fiddler</Content>

      <Header>人生史记</Header>
      <Content>有尿床史，幼儿园，不治自愈</Content>
      <Content>
        <Link to="/posts/memory-about-bookstore">有休学史，小学，不请自回</Link>
      </Content>
      <Content>
        <Link to="/posts/memory-about-bookstore">有学霸史，中学，不攻自破</Link>
      </Content>
      <Content>
        <Link to="/posts/memory-about-bookstore">有平庸史，高中，不愠不火</Link>
      </Content>
      <Content>
        <Link to="/posts/memory-about-bookstore">有沉淀史，大学，不骄不躁</Link>
      </Content>
      <Content>
        <Link to="/posts/graduate-riding-part-one">有骑行史，毕业，不同凡响</Link>
      </Content>
      <Content>
        <Link to="/posts/lift-part-one">有搭车史，回家，不期而遇</Link>
      </Content>
      <Content>
        <Link to="https://book.douban.com/people/yanggc/collect">有阅读史，至今，不求甚解</Link>
      </Content>
      <Content>
        <Link to="/posts/about-running">有跑步史，至今，不屈不挠</Link>
      </Content>
      <Content>有摄影史，至今，不甚了了</Content>
      <Content>
        <Link to="https://movie.douban.com/people/yanggc/collect">有观影史，至今，不胜枚举</Link>
      </Content>
      <Content>有闷骚史，至今，不学无术</Content>
      <Content>有编码史，至今，不甘雌伏</Content>
      <Content>有上进史，至今，不敢后人</Content>
      <Header>联系方式</Header>
      <Content>
        <dt>邮箱：</dt>
        <dd>yanggc888#163.com</dd>
      </Content>
      <Content>
        <dt>微信：</dt>
        <dd>
          <Img sizes={data.wxImage.sizes} alt="微信二维码" />
        </dd>
      </Content>
    </Container>
  </Wrapper>
);

export default About;
export const query = graphql`
  query ProfileImagesQuery {
    allImageSharp(filter: { id: { regex: "/about_slides/" } }) {
      edges {
        node {
          sizes {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
    wxImage: imageSharp(id: { regex: "/wx/" }) {
      sizes(maxWidth: 400) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
