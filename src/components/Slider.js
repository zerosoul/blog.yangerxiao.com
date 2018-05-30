import React from 'react';
import Slick from 'react-slick';
import styled from 'styled-components';
import '../utils/slick.css';
import '../utils/slick.theme.css';

const ImgWraper = styled.div``;
const settings = {
  infinite: false,
  cssEase: 'ease-in',
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
  dots: true,
  arrows: false,
  mobileFirst: true,

};

const Slider = ({ imgs }) => <Slick {...settings}>{imgs.map(img => <ImgWraper>{img}</ImgWraper>)}</Slick>;

export default Slider;
