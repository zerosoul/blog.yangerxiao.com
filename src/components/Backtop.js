import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../utils/media';

const Circle = styled.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: #ddd;
  cursor: pointer;
  display: ${props => (props.visiable ? 'block' : 'none')};
  @media ${media.desktop} {
    right: 16%;
  }
  .wrapper {
    position: relative;
    &:before,
    &:after {
      content: '';
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
    offset: PropTypes.number,
  };
  static defaultProps = {
    offset: 800,
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisiable: false,
    };
    this.scrollUp = this.scrollUp.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentWillMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };
  handleScroll = () => {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const v = top > this.props.offset;
    this.setState({
      isVisiable: v,
    });
  };
  scrollUp = () => {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    if (top > 0) {
      window.scrollTo(0, top - 100);
      setTimeout(this.scrollUp, 10);
    }
  };
  render() {
    return (
      <Circle visiable={this.state.isVisiable} onClick={this.scrollUp}>
        <div className="wrapper" />
      </Circle>
    );
  }
}
