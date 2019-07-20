import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .first,
  .last {
    border: 1px solid #666;
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;
  }
`;

export default class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);

    this.currePage = React.createRef();
  }

  componentDidMount() {
    if (this.currePage.current) {
      this.currePage.current.scrollIntoView({
        block: 'start',
        inline: 'center'
      });
    }
  }
  render() {
    const { index, first, last, pageCount, pathPrefix } = this.props;
    const prefix = pathPrefix === '' ? '' : `/${pathPrefix}`;
    const firstUrl = `${prefix}`;
    const lastUrl = `${prefix}/${pageCount}`;
    const offset = Math.min(2, index);
    const pages = Array.from({ length: pageCount - 1 }, (v, k) => k + offset);
    return (
      <Container>
        {!first && (
          <div className="first">
            <Link to={firstUrl}>首页</Link>
          </div>
        )}
        <PageContainer>
          {pages.map(page => (
            <Pager
              key={`${page}ye`}
              domRef={this.currePage}
              plaintext={page === index}
              url={`${prefix}/${page}`}
              text={page}
            />
          ))}
        </PageContainer>
        {!last && (
          <div className="last">
            <Link to={lastUrl}>末页</Link>
          </div>
        )}
      </Container>
    );
  }
}

const PageContainer = styled.div`
  margin: 0 1rem;
  max-width: 50vw;
  overflow-x: scroll;
  white-space: nowrap;
  height: 100%;
  a {
    display: inline-block;
    margin: 0 0.2rem;
    padding: 0.2rem 0.4rem;
    border: 1px solid #333;
    border-radius: 0.4rem;
  }
  span {
    padding: 0.4rem;
    color: #999;
  }
`;
const Pager = props => {
  if (!props.plaintext) {
    return <Link to={props.url}>{props.text}</Link>;
  }
  return <span ref={props.domRef}>{props.text}</span>;
};
