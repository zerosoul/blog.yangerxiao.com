import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Range extends Component {
  constructor(props) {
    super(props);
    // this.val = 0;
    // this.max = 100;
    this.state = {
      val: 0,
      max: 100,
    };
  }
  toRgbaString = rgbaObject => `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`;

  render() {
    const { val, min, max } = this.props;
    return <progress value={val} max={max} min={min} />;
  }
}
Range.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  val: PropTypes.number,
  onChange: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Range.defaultProps = {
  min: 0,
  max: 100,
  val: 0,
  onChange: () => {},
  width: 300,
  height: 10,
};
