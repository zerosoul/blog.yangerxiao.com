import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  .company {
    margin-bottom: 0.5rem;
  }
  .occupy {
    margin-bottom: 0.6rem;
    .period {
      position: relative;
      font-style: italic;
      font-size: 0.6rem;
      margin-left: 1rem;
      font-weight: normal;
      &:before,
      &:after {
        position: absolute;
        bottom: 0;
      }
      &:before {
        content: '（';
        left: -0.7rem;
      }
      &:after {
        content: ')';
        right: -0.4rem;
      }
    }
  }
  .duties {
    list-style-position: inside;
    list-style-type: square;
    padding: 0;
    margin: 0.5rem 0;
    .duty {
      margin-bottom: 0.3rem;
    }
  }
`;
const WorkExp = props => {
  const { company, title, duties, period, children } = props;
  return (
    <Container>
      <h3 className="company">{company}</h3>

      <h4 className="occupy">
        <span className="title" dangerouslySetInnerHTML={{ __html: title }} />
        {period && <span className="period">{period.join(' - ')}</span>}
      </h4>
      <ul className="duties">{duties.map(duty => <li className="duty">{duty}</li>)}</ul>
      {children}
    </Container>
  );
};
export default WorkExp;
