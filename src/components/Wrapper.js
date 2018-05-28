import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  margin: 0 auto;
  padding: 0;
`;

const Wrapper = props => <Grid>{props.children}</Grid>;

export default Wrapper;
