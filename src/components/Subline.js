import React from 'react';
import styled from 'styled-components';

const Line = styled.div`
  font-size: 0.6rem;
  color: ${props => props.theme.light};
  ${props => props.sectionTitle && 'margin-top: -.6rem'};
  ${props => props.sectionTitle && 'margin-bottom: 2rem'};
  ${props => props.sectionTitle && 'text-align: center'};
  span {
    padding: 0.2rem 0.3rem;
    border: 1px solid #eee;
    margin-right: 0.2rem;
    border-radius: 0.2rem;
    .tag {
      position: relative;
      margin-right: 0.8rem;
      &:before {
        content: '#';
        position: absolute;
        left: -0.34rem;
      }
    }
  }
`;

const Subline = props => <Line sectionTitle={props.sectionTitle}>{props.children}</Line>;

export default Subline;
