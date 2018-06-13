import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import ExpTitle from '../components/resume/ExpTitle';
import WorkExp from '../components/resume/WorkExp';
import EduExp from '../components/resume/EduExp';
import Profile from '../components/resume/Profile';
import { media } from '../utils/media';

const Container = styled.div`
  // background: url(./images/site/bg.png) repeat;
  padding: 1.6rem 1rem;
  margin: auto;
  border-bottom: 1px solid #999;
  @media ${media.tabletSmall} {
    max-width: 80%;
  }
  @media ${media.tabletWide} {
    max-width: 70%;
  }
  .skills {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .skill {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-right: 0.8rem;
      margin-bottom: 0.5rem;
      // padding-bottom: 0.2rem;
      // border: 1px solid #eee;
      h3 {
        margin: 0.2rem 0;
        color: #666;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #ccc;
      }
      em,
      p {
        font-size: 0.8rem;
      }
      em {
        font-style: normal;
        font-weight: 700;
        color: #000;
      }
      p {
        margin-bottom: 0.2rem;
        padding-bottom: 0;
        white-space: pre;
      }
    }
  }
  .others {
    list-style-position: inside;
    list-style-type: square;
    padding: 0;
    margin: 0.5rem 0;
    margin-top: 0;
    li {
      color: #333;
      margin-bottom: 0.2rem;
    }
  }
  .social {
    display: flex;
    .ico {
      flex: 1;
    }
  }
`;

const Resume = ({ data }) => {
  const { avator, douban, github, weibo } = data;
  console.log(douban);

  const profile = {
    name: '杨国春',
    avator: avator.sizes,
    info: {
      basic: '男/89年/山东',
      blog: 'https://blog.yangerxiao.com',
      email: 'yanggc888@gmail.com',
      tel: '+86 18201385848',
    },
  };
  const jobs = [
    {
      company: '自由职业',
      title: '全<del>干</del>栈工程师',
      period: ['2018.3', '至今'],
      desc: '个人原因离职回家处理一些事情，期间自己折腾做产品，为了维持收入，也远程做一些兼职，使用React重构了个人博客',
      stack: ['ES6', 'react', 'PHP', 'docker', 'git'],
      duties: [
        '万叶集写作平台：<a href="https://m.izhaichao.com/">前台</a>、<a href="https://admin.izhaichao.com/">后台</a>',
        '远程工作【兼职】',
        '个人博客',
      ],
    },
    {
      company: '飞华健康网',
      title: '前端工程师',
      period: ['2014.5', '2018.2'],
      desc:
        '作为公司第一位入职的前端，与公司共成长，从前端工程师到前端经理，公司前端部门从无到有，从弱到强。引入npm、gulp工作流，前端切图产出无缝接入后端，大大提升开发效率，原来5天开发缩短为2天。',
      stack: ['HTML5', 'JS', 'jQuery、zepto.js', 'PHP', 'mysql'],
      duties: ['飞华分站【主程】', '负责全站的前端开发任务', '消化需求，分配开发任务', '招聘与管理'],
    },
    {
      company: '北京华辰创想',
      title: '.NET工程师',
      period: ['2012.6', '2014.4'],
      desc: '参与公司的课件管理平台研发',
      stack: ['C#', 'ASP.NET', '.NET Framework'],
      duties: ['参与课件管理平台开发'],
    },
  ];
  const edu = {
    company: '贵阳学院',
    title: ['本科', '软件工程'].join('/'),
    period: ['2008.9', '2012.9'],
    // stack: ['C#', 'ASP.NET', '.NET Framework'],
    duties: ['2010全国大学生数学建模国家一等奖', '英语六级', '国家励志奖学金'],
  };

  return (
    <Container>
      <Profile {...profile} />
      <ExpTitle title="技能" />
      <section className="skills">
        <div className="skill">
          <h3>语言</h3>
          <em>Javascript/ES6</em>
          <p>HTML/CSS/Scss</p>
          <p>PHP/Smarty/C#</p>
          <p>shell/SQL</p>
        </div>
        <div className="skill">
          <h3>框架/类库</h3>
          <em>react</em>
          <p>jQuery/zepto</p>
          <p>Bootstrap/Semantic-UI</p>
        </div>
        <div className="skill">
          <h3>工具</h3>
          <em>VS CODE</em>
          <p>SVN/Git</p>
          <p>Chrome DevTools</p>
        </div>
        <div className="skill">
          <h3>操作系统</h3>
          <p>Linux/CentOS</p>
          <em>Mac OS</em>
          <p>Windows</p>
        </div>
        <div className="skill">
          <h3>工程化</h3>
          <p>create-react-app</p>
          <p>webpack/babel</p>
          <p>Node.js/gulp</p>
        </div>
        <div className="skill">
          <h3>偏爱</h3>
          <p>Google</p>
          <p>stackoverflow</p>
          <p>open source</p>
        </div>
      </section>
      <ExpTitle title="教育经历" />
      <WorkExp {...edu} />
      <ExpTitle title="工作经历" />
      {jobs.map(job => <WorkExp key={job.title} {...job} />)}
      <ExpTitle title="其它" />
      <ul className="others">
        <li>可能是骑行里最会写代码的人</li>
        <li>可能是写代码里连续骑行最长的人[1个月2400+km]</li>
      </ul>
      {/* <div className="social">
        <Link className="ico" to="https://www.douban.com/people/yanggc/">
          <Img sizes={douban.sizes} alt="豆瓣" />
        </Link>
        <Link className="ico" to="http://weibo.com/yanggc2014 ">
          <Img sizes={weibo.sizes} alt="微博" />
        </Link>
        <Link className="ico" to="https://github.com/zerosoul">
          <Img sizes={github.sizes} alt="github" />
        </Link>
      </div> */}
    </Container>
  );
};
export default Resume;
/* eslint no-undef: off */
export const query = graphql`
  query AvatorQuery {
    avator: imageSharp(id: { regex: "/site/profile/" }) {
      id
      sizes(maxWidth: 400) {
        ...GatsbyImageSharpSizes
      }
    }
    douban: imageSharp(id: { regex: "/site/social/douban/" }) {
      id
      sizes(maxWidth: 400) {
        ...GatsbyImageSharpSizes
      }
    }
    weibo: imageSharp(id: { regex: "/site/social/weibo/" }) {
      id
      sizes(maxWidth: 400) {
        ...GatsbyImageSharpSizes
      }
    }
    github: imageSharp(id: { regex: "/site/social/github/" }) {
      id
      sizes(maxWidth: 400) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
