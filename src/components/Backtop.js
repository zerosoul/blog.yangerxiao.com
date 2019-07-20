import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Global } from '../utils/fun';

const Circle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: #ddd;
  cursor: pointer;
  .wrapper {
    position: relative;
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 0.9rem;
      left: 0.34rem;
      width: 0.8rem;
      height: 0.14rem;
      background: #444;
    }
    &:before {
      transform: rotate(45deg);
      left: 0.82rem;
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
`;
export default class Backtop extends Component {
  static propTypes = {
    offset: PropTypes.number
  };
  static defaultProps = {
    offset: 800
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.scrollUp = this.scrollUp.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount = () => {
    Global.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount = () => {
    Global.removeEventListener('scroll', this.handleScroll);
  };
  handleScroll = () => {
    const doc = document.documentElement;
    const top = (Global.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const v = top > this.props.offset;
    this.setState({
      isVisible: v
    });
  };
  scrollUp = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      Global.requestAnimationFrame(this.scrollUp);
      Global.scrollTo(0, c - c / 8);
    }
  };
  render() {
    return (
      <Circle
        style={{ visibility: this.state.isVisible ? 'visible' : 'hidden' }}
        onClick={this.scrollUp}
      >
        <div className="wrapper" />
      </Circle>
    );
  }
}
