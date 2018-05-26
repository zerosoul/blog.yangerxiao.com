import React from 'react';
import styled from 'styled-components';
import { media } from '../utils/media';

const Line = styled.div`
  font-size: ${props => props.theme.fontSmall};
  @media ${media.phone} {
    font-size: 0.5rem;
  }
  color: ${props => props.theme.light};
  ${props => props.sectionTitle && 'margin-top: -3rem'};
  ${props => props.sectionTitle && 'margin-bottom: 4rem'};
  ${props => props.sectionTitle && 'text-align: center'};
  span {
    padding: 0.1rem 0.2rem;
    padding-top: 0.2rem;
    border: 1px solid #eee;
    margin-right: 0.2rem;
    border-radius: 0.2rem;
    .tag {
      position: relative;
      margin-right: 0.8rem;
      &:after {
        content: '#';
        position: absolute;
        left: -0.34rem;
      }
    }
  }
`;

const Subline = props => <Line sectionTitle={props.sectionTitle}>{props.children}</Line>;

export default Subline;
