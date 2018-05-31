import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import config from '../../config/SiteConfig';

const Container = styled.div`
  position: relative;
  background: #eee;
  padding: 1.6rem 1rem;
  .name {
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #999;
  }
  .avator {
    position: absolute;
    right: 0.6rem;
    top: 0.8rem;
    width: 9rem;
    border: 0.3rem solid #aaa;
    transform: rotate(-10deg);
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
      color: #aaa;
    }
  }
`;
const ExpTitle = styled.h2`
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #999;
`;
const WorkExp = styled.div`
  display: flex;
  flex-direction: column;
  .company {
    margin-bottom: 0.5rem;
  }
  .occupy {
    margin-bottom: 0.6rem;
    .period {
      position: relative;
      font-style: italic;
      font-size: 0.6rem;
      margin-left: 1rem;
      font-weight: normal;
      &:before,
      &:after {
        position: absolute;
        bottom: 0;
      }
      &:before {
        content: '（';
        left: -0.7rem;
      }
      &:after {
        content: ')';
        right: -0.4rem;
      }
    }
  }
  .jobs {
    list-style-position: inside;
    list-style-type: square;
    padding: 0;
    margin: 0.5rem 0;
    .job {
      margin-bottom: 0.3rem;
    }
  }
`;
const EduExp = styled.div`
  .edu {
    display: flex;
    dt {
      font-weight: 700;
    }
    dd {
      padding-left: 0.5rem;
      time {
        font-size: 0.6rem;
        font-weight: 200;
        padding-left: 0.3rem;
        font-style: italic;
      }
    }
  }
`;
const Resume = ({ data }) => (
  <Container>
    <h1 className="name">杨国春</h1>
    <div className="avator">
      <Img sizes={data.profifleImage.sizes} alt="简历头像" />
    </div>
    <dl>
      <dt>博客</dt>
      <dd>
        <a href="//blog.yangerxiao.com">https://blog.yangerxiao.com</a>
      </dd>
      <dt>Email</dt>
      <dd>yanggc888@gmail.com</dd>
      <dt>电话</dt>
      <dd>
        <tel>+86 18201385848</tel>
      </dd>
    </dl>
    <ExpTitle>工作经历</ExpTitle>
    <WorkExp>
      <h3 className="company">自由职业</h3>

      <h4 className="occupy">
        全<del>干</del>栈工程师<span className="period">2014.2 - 至今</span>
      </h4>
      <ul className="jobs">
        <li className="job">万叶集写作平台</li>
        <li className="job">兼职、零活</li>
        <li className="job">博客</li>
      </ul>
    </WorkExp>
    <WorkExp>
      <h3 className="company">飞华健康科技发展有限公司</h3>

      <h4 className="occupy">
        前端工程师、前端经理<span className="period">2014.5 - 2018.2</span>
      </h4>
      <ul className="jobs">
        <li className="job">负责全站的前端页面开发</li>
        <li className="job">与产品经理沟通需求</li>
        <li className="job">招聘与管理</li>
      </ul>
    </WorkExp>
    <WorkExp>
      <h3 className="company">北京华辰创想</h3>

      <h4 className="occupy">
        .NET工程师<span className="period">2012.6 - 2014.4</span>
      </h4>
      <ul className="jobs">
        <li className="job">参与课件管理平台开发</li>
      </ul>
    </WorkExp>
    <ExpTitle>教育经历</ExpTitle>
    <EduExp>
      <div className="edu">
        <dt>贵阳学院</dt>
        <dd>本科/软件工程/</dd>
      </div>
      <div className="edu">
        <dt>贵阳学院</dt>
        <dd>
          本科/软件工程
          <time>2008.9 - 2012.9</time>
        </dd>
        <ul>
          <li />
        </ul>
      </div>
    </EduExp>
  </Container>
);
export default Resume;
/* eslint no-undef: off */
export const query = graphql`
  query ResumeQuery {
    profifleImage: imageSharp(id: { regex: "/site/profile/" }) {
      sizes(maxWidth: 400) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
