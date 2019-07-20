import React, { Component } from 'react';
import styled from 'styled-components';

const Toc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 999;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: ${props => (props.fold ? 'none' : 'block')};
    z-index: 998;
  }
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
    cursor: pointer;
    background: #eee;
    z-index: 999;
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
      content: "";
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
    z-index: 999;
    transform: translate3d(0, 0, 0);
    padding: 0.6rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    background: #eee;
    border-radius: 0.5rem;
    display: ${props => (props.fold ? 'none' : 'block')};
    max-height: 70vh;
    overflow: scroll;
    ul {
      list-style: none;
      margin: 0.4rem 0;
      li {
        padding: 0;
        margin: 0.4rem 0;
      }
      ul {
        font-size: 0.8rem;
        margin-left: 0.4rem;
      }
    }
  }
`;

export default class TOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fold: true
    };
  }
  onClickHandler = () => {
    const { fold } = this.state;
    this.setState({
      fold: !fold
    });
  };
  handleContentClick = ({ target }) => {
    if (target.nodeName === 'A') {
      this.setState({
        fold: true
      });
    }
  };
  render() {
    const { toc } = this.props;
    return (
      <Toc fold={this.state.fold}>
        <>
          <div
            className="mask"
            onClick={this.onClickHandler}
            onKeyDown={this.onClickHandler}
          />
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: toc }}
            onClick={this.handleContentClick}
          />
          <button
            className={`btn ${this.state.fold ? 'fold' : 'unfold'}`}
            onClick={this.onClickHandler}
          >
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </button>
        </>
      </Toc>
    );
  }
}
