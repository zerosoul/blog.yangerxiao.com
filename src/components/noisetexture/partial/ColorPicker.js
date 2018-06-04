import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

const Container = styled.div`
  .swatch {
    padding: 5px;
    background: #fff;
    border-radius: 0.1rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    display: inline-block;
    cursor: pointer;
  }
  .popover {
    position: absolute;
    z-index: 2;
    .cover {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
`;
const ColorPicked = styled.div`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background: ${({ color }) => `rgba(${color.r},${color.g},${color.b},${color.a})`};
`;
class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerVisible: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
    };
  }

  handleClick = () => {
    this.setState({ pickerVisible: !this.state.pickerVisible });
  };

  handleClose = () => {
    this.setState({ pickerVisible: false });
  };

  handleChange = color => {
    console.log(color);

    this.setState({ color: color.rgb });
  };

  render() {
    return (
      <Container>
        <div className="swatch" onClick={this.handleClick}>
          <ColorPicked color={this.state.color} />
        </div>
        {this.state.pickerVisible ? (
          <div className="popover">
            <div className="cover" onClick={this.handleClose} />
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        ) : null}
      </Container>
    );
  }
}

export default ColorPicker;
