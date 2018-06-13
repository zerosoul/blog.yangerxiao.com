import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  .btn {
    background: #333;
    color: #eee;
    border: none;
    padding: 0.4rem 0.6rem;
    cursor: pointer;
  }
`;
export default class PdfBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generating: false,
    };
  }

  componentDidMount() {
    // const btn = this.btn.current;
    // btn.onClick = () => {};
    // this.btn=React.createRef();
  }
  handleClick = () => {
    console.log('click');
    this.setState({
      generating: true,
    });
    const url = window.location.href;
    fetch(`http://localhost:8081/screenshot?url=${url}`).then(resp => {
      console.log(resp);
    });
  };
  render() {
    return (
      <Container>
        {/* <button onClick={this.handleClick}>{this.state.generating ? '正在生成...' : '获取PDF'}</button> */}
        <a className="btn" href="https://s.izhaichao.cn/puppeteer/pdf/844c7ca7438c085441261fda8e5304ba.pdf">
          获取PDF
        </a>
      </Container>
    );
  }
}
