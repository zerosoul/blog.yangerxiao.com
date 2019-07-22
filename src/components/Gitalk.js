import React, { useEffect } from 'react';
import 'gitalk/dist/gitalk.css';
import GT from 'gitalk';
export default function Gitalk() {
  useEffect(() => {
    const gitalk = new GT({
      clientID: '9914a43cda9c88e698c5',
      clientSecret: '68146aa863daf9b7cbbcb59fde7d1514bb6d26da',
      repo: 'blog.yangerxiao.com',
      owner: 'zerosoul',
      admin: ['zerosoul'],
      id: location.pathname, // Ensure uniqueness and length less than 50
      distractionFreeMode: false // Facebook-like distraction free mode
    });
    gitalk.render('gitalk-container');
  }, []);
  return <div id="gitalk-container" />;
}
