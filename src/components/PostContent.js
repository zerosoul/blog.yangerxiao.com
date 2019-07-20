import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../utils/media';

const Container = styled.article`
  margin-top: 2rem;
  a {
    text-decoration: underline;
  }
  h1 {
    font-size: 1.6rem;
  }
  h2 {
    font-size: 1.2rem;
  }
  p img {
    display: block;
    margin: 0 auto;
    padding: 1.6rem 0;
    transform: scale(1.14);
  }
  @media ${media.phoneWide} {
    p img {
      padding: 1.7rem 0;
      transform: scale(1.1);
    }
  }
  @media ${media.desktop} {
    p img {
      padding: 0;
      transform: scale(1);
    }
  }
`;
export default class PostContent extends Component {
  constructor(props) {
    super(props);

    this.postBlock = React.createRef();
  }

  componentDidMount() {
    this.addCopyListener();
  }
  addCopyListener = () => {
    const postBlock = document.querySelector('#postContent');
    //   console.log(postBlock);
    postBlock.addEventListener(
      'copy',
      () => {
        if (typeof window.getSelection === 'undefined') return; // IE8 or earlier...

        const selection = window.getSelection();

        // 复制内容过短的话，就不追加内容了
        if (selection.toString().length < 30) return;

        // 动态创建元素，并将复制的内容填入
        const newdiv = document.createElement('div');
        newdiv.style.position = 'absolute';
        newdiv.style.left = '-99999px';
        document.body.appendChild(newdiv);
        newdiv.appendChild(selection.getRangeAt(0).cloneContents());

        // 遇到 pre 标签需要特殊处理一下，否则换行将被清除
        if (
          selection.getRangeAt(0).commonAncestorContainer.nodeName === 'PRE'
        ) {
          newdiv.innerHTML = `<pre>${newdiv.innerHTML}</pre>`;
        }
        const _url = document.location.href.replace(document.location.hash, '');
        newdiv.innerHTML += `<br /><br />作者：杨二 <br />微信：yanggc_2013 <br />链接：<a href='${_url}'>${_url}</a> <br />著作权归作者所有，商业转载请联系作者获得授权，非商业转载请注明出处。`;

        selection.selectAllChildren(newdiv);
        window.setTimeout(() => {
          document.body.removeChild(newdiv);
        }, 200);
      },
      false
    );
  };
  render() {
    const { content } = this.props;
    return (
      <Container
        id="postContent"
        ref={this.postBlock}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
}
