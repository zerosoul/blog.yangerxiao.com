import React from 'react';
import styled from 'styled-components';

const Content = styled.footer`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = () => (
  <Content>
    <div>&copy; 2018 by Tristan Yang </div>
    <div>
      Powered by <a href="http://reactjs.org/">React</a> & <a href="https://www.gatsbyjs.org/">Gatsby.js</a>
    </div>
  </Content>
);

export default Footer;
