import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../utils/media';

const Container = styled.div`
  position: fixed;
  right: ${props => props.right}px;
  bottom: ${props => props.bottom}px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media ${media.desktop} {
    right: 16%;
  }
  > * {
    margin: 0.8rem 0;
  }
`;
const FixContainer = props => {
  const { right, bottom } = props;
  return (
    <Container bottom={bottom} right={right}>
      {props.children}
    </Container>
  );
};
FixContainer.propTypes = {
  right: PropTypes.number,
  bottom: PropTypes.number
};
FixContainer.defaultProps = {
  right: 20,
  bottom: 30
};
export default FixContainer;
