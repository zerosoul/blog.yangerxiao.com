import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #999;
`;
const ExpTitle = props => <Container>{props.title}</Container>;
export default ExpTitle;
