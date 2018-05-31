import React, { Component } from 'react';
import styled from 'styled-components';

const Toc = styled.div`
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;

  z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  button {
    display: flex;
    flex-direction: column;
    width: 2rem;
    height: 2rem;
    border: 1px solid #ddd;
    padding: 0.2rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    position: relative;
    &:focus {
      outline: none;
    }
    .line {
      background: #333;
      display: inline-block;
      width: 1rem;
      height: 0.1rem;
      margin: 0.09rem 0;
    }
    &.unfold .line {
      display: none;
    }
    &.unfold:before,
    &.unfold:after {
      content: '';
      position: absolute;
      height: 1rem;
      width: 0.1rem;
      top: 50%;
      right: 50%;
      background: #333;
      margin-right: -0.05rem;
      margin-top: -0.5rem;
    }
    &.unfold:before {
      transform: rotate(45deg);
    }
    &.unfold:after {
      transform: rotate(-45deg);
    }
  }
  .content {
    z-index: 1000;
    padding: 0.6rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    background: #eee;
    border-radius: 0.5rem;
    display: ${props => (props.fold ? 'none' : 'block')};
    ul {
      list-style: none;
      li {
        padding: 0;
        margin: 0.4rem 0;
      }
    }
  }
`;

export default class TOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fold: true,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler() {
    console.log('hello');

    const { fold } = this.state;
    this.setState({
      fold: !fold,
    });
  }
  render() {
    return (
      <Toc fold={this.state.fold}>
        <div className="content">{this.props.children}</div>
        <button className={`btn ${this.state.fold ? 'fold' : 'unfold'}`} onClick={this.onClickHandler}>
          <span className="line" />
          <span className="line" />
          <span className="line" />
          {/* <span className="unfoldline" />
          <span className="unfoldline" /> */}
        </button>
      </Toc>
    );
  }
}