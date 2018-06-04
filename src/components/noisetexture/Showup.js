import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.h2`
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #999;
`;

export default class Showup extends Component {
  //   static propTypes = {
  //     prop: PropTypes,
  //   };
  constructor(props) {
    super(props);

    this.state = {
      canvas: null,
    };
  }

  render() {
    return <Container>SHowup</Container>;
  }
}
