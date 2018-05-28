import React from 'react';
import styled from 'styled-components';

const Content = styled.footer`
  text-align: center;
  padding: 3rem 0;
`;

const Footer = () => (
  <Content>
    &copy; 2018 by Tristan Yang <br />
    <a href="https://github.com/zerosoul">GitHub</a>
  </Content>
);

export default Footer;
