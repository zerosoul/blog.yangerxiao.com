import React from 'react';
import styled from 'styled-components';
import ExpTitle from './ExpTitle';
import WorkExp from './WorkExp';
import EduExp from './EduExp';
import Profile from './Profile';

const Container = styled.div`
  background: url(./images/site/bg.png) repeat;
  padding: 1.6rem 1rem;
`;

const Index = ({ data }) => {
  const { avator } = data;
  const profile = {
    name: '杨国春',
    avator: avator.sizes,
    info: { blog: 'https://blog.yangerxiao.com', email: 'yanggc888@gmail.com', tel: '+86 18201385848' },
  };
  const jobs = [
    {
      company: '自由职业',
      title: '全<del>干</del>栈工程师',
      period: ['2014.2', '至今'],
      duties: ['万叶集写作平台', '兼职、零活', '博客'],
    },
    {
      company: '飞华健康科技发展有限公司',
      title: '前端工程师、前端经理',
      period: ['2014.5', '2018.2'],
      duties: ['负责全站的前端页面开发', '与产品经理沟通需求', '招聘与管理'],
    },
    {
      company: '北京华辰创想',
      title: '.NET工程师',
      period: ['2012.6', '2014.4'],
      duties: ['参与课件管理平台开发'],
    },
  ];

  return (
    <Container>
      <Profile {...profile} />
      <ExpTitle title="工作经历" />
      {jobs.map(job => <WorkExp {...job} />)}
      <ExpTitle title="教育经历" />
      <EduExp school="贵阳学院" items={['本科', '软件工程']} period={['2008.9', '2012.9']}>
        <ul>
          <li />
        </ul>
      </EduExp>
    </Container>
  );
};
export default Index;
/* eslint no-undef: off */
export const query = graphql`
  query AvatorQuery {
    avator: imageSharp(id: { regex: "/site/profile/" }) {
      sizes(maxWidth: 400) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
