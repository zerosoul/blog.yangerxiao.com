import React from 'react';
import Slick from 'react-slick';
import styled from 'styled-components';
import '../utils/slick.css';
import '../utils/slick.theme.css';

const ImgWraper = styled.div``;
const settings = {
  infinite: true,
  fade: true,
  speed: 1500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
  dots: true,
  arrows: false,
};

const Slider = ({ imgs }) => <Slick {...settings}>{imgs.map(img => <ImgWraper>{img}</ImgWraper>)}</Slick>;

export default Slider;
