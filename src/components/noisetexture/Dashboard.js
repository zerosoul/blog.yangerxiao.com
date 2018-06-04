import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ColorPicker from './partial/ColorPicker';
import Range from './partial/Range';

const Container = styled.h2`
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #999;
`;

export default class Dashboard extends Component {
  //   static propTypes = {
  //     prop: PropTypes,
  //   };
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      opacity: 0.2,
      density: 0.3,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      transparent: false,
      width: 100,
      height: 100,
    };
  }

  render() {
    return (
      <Container>
        <h2>透明度：</h2>
        <Range val={this.state.opacity} max={100} />
        <h2>密度：</h2>
        <Range val={this.state.density} max={100} />
        <h2>背景色：</h2>
        <ColorPicker color={this.state.color} on />
        <h2>PNG？</h2>
        <input type="checkbox" name="png" checked={this.state.transparent} />
        <h2>大小：</h2>
        <input type="number" name="width" value={this.state.width} />
        <input type="number" name="height" value={this.state.height} />
      </Container>
    );
  }
}
