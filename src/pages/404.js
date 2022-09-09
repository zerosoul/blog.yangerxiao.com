import React from 'react';
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import DocTitle from '../components/DocTitle';
import { media } from '../utils/media';

const Container = styled.div`
  @media ${media.desktop} {
    max-width: 50%;
    margin: 0 auto;
  }
`;
const NotFound = () => (
  <Wrapper>
    <Container>
      <h1>404页面</h1>
      <p>哎呀，您访问的页面不在服务区。</p>
    </Container>
  </Wrapper>
);

export default NotFound;
export const Head = () => <DocTitle title='404页面' />