import React, { Component } from 'react';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import styled from 'styled-components';
import { ellipsis } from 'polished';
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
    display: ${props => (props.expand ? 'block' : 'none')};
  }
  button {
    position: relative;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    border: 1px solid #ddd;
    padding: 0.2rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #eee;
    &:focus {
      outline: none;
    }
    &:after {
      content: "";
      position: absolute;
      width: 0.6rem;
      height: 0.7rem;
      border-left: 2px solid #666;
      border-bottom: 2px solid #666;
      top: 0.4rem;
      left: 0.8rem;
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
        a {
          ${ellipsis('14rem')};
        }
      }
    }
  }
`;
export default class ReadHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false
    };
    this.hisList = React.createRef();
  }
  componentDidMount() {
    let histories =
      Global.JSON.parse(Global.localStorage.getItem('read.histories')) || [];
    if (this.props.title) {
      const { title, url } = this.props;
      histories.push({ title, url, ts: new Date().getTime() });
      histories = sortBy(histories, ['ts']);
      histories = uniqBy(histories, 'url').slice(-10);
      Global.localStorage.setItem(
        'read.histories',
        Global.JSON.stringify(histories)
      );
    }
    const listHtml = histories.map(
      history =>
        `<li>
        <a href=${history.url}>${history.title}</a>
      </li>`
    );

    this.hisList.current.innerHTML = listHtml.join('');
  }
  onClickHandler = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand
    });
  };
  render() {
    return (
      <Container expand={this.state.expand}>
        <div
          className="mask"
          onClick={this.onClickHandler}
          onKeyDown={this.onClickHandler}
        />
        <div className="history">
          <ul ref={this.hisList} />
        </div>
        <button onClick={this.onClickHandler} />
      </Container>
    );
  }
}
