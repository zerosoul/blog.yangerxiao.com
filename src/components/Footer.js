import React from 'react';
import styled from 'styled-components';
// import Img from 'gatsby-image';

const Content = styled.footer`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media print {
    .power {
      display: none;
    }
  }
`;

const Footer = () => (
  <Content>
    <div>&copy; 2018 by Tristan Yang </div>
    <div className="power">
      Powered by <a href="http://reactjs.org/">React.js</a> &{' '}
      <a href="https://www.gatsbyjs.org/">Gatsby.js</a>
    </div>
  </Content>
);

export default Footer;
