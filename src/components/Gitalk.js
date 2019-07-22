import React, { useEffect, useState } from 'react';
import 'gitalk/dist/gitalk.css';
import GT from 'gitalk';
import styled from 'styled-components';

const DevWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  padding: 1rem;
  border: 1px solid #ddd;
`;
export default function Gitalk() {
  const [isProd] = useState(process.env.NODE_ENV == 'production');
  useEffect(() => {
    if (isProd) {
      const language =
        navigator.language === 'zh-CN' ? navigator.language : 'en';
      const gitalk = new GT({
        clientID: '9914a43cda9c88e698c5',
        clientSecret: '68146aa863daf9b7cbbcb59fde7d1514bb6d26da',
        repo: 'blog.yangerxiao.com',
        owner: 'zerosoul',
        admin: ['zerosoul'],
        language,
        id: location.pathname, // Ensure uniqueness and length less than 50
        distractionFreeMode: false // Facebook-like distraction free mode
      });
      gitalk.render('gitalk-container');
    }
  }, [isProd]);
  return isProd ? (
    <div id="gitalk-container" />
  ) : (
    <DevWrapper>开发环境不加载评论组件</DevWrapper>
  );
}
