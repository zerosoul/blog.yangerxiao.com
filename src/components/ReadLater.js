import React, { Component } from 'react';
import styled from 'styled-components';
import { Global } from '../utils/fun';

const Container = styled.div`
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
    background: #333;
    z-index: 998;
    opacity: 0;
    display: ${props => (props.expand ? 'block' : 'none')};
  }
  button {
    width: 1.6rem;
    height: 1.6rem;
    display: inline-block;
    position: relative;
    border: 2px solid #000;
    border-radius: 50%;
    &:after {
      content: '';
      position: absolute;
      width: 0.5rem;
      height: 0.4rem;
      border-left: 2px solid #000;
      border-bottom: 2px solid #000;
      top: 0.4rem;
      left: 0.6rem;
    }
  }
  .history {
    z-index: 999;
    padding: 0.6rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    background: #eee;
    border-radius: 0.5rem;
    display: ${props => (props.expand ? 'block' : 'none')};
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
export default class ReadLater extends Component {
  constructor(props) {
    super(props);
    const url = localStorage.getItem('read.later.url');
    this.state = {
      url,
      expand: false,
    };
  }
  onClickHandler = () => {
    // const currUrl = Global.location.href;
    // localStorage.setItem('read.later.url', currUrl);
    this.setState({
      //   url: currUrl,
      expand: !this.state.expand,
    });
  };
  onCloseClickHandler = () => {
    localStorage.removeItem('read.later.url');
    this.setState({
      url: null,
    });
  };
  render() {
    return (
      <Container expand={this.state.expand}>
        <div className="mask" />
        <div className="history">
          <ul>
            <li>22</li>
            <li>33</li>
            <li>44</li>
          </ul>
        </div>
        <button onClick={this.onClickHandler} />
      </Container>
    );
  }
}
