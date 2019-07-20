import React from 'react';
import Slick from 'react-slick';
import '../utils/slick.css';
import '../utils/slick.theme.css';

const settings = {
  infinite: true,
  cssEase: 'ease-in',
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
  dots: true,
  arrows: false,
  mobileFirst: true
};

const Slider = ({ imgs }) => <Slick {...settings}> {imgs}</Slick>;

export default Slider;
