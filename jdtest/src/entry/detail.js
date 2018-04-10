import resetCss from '../css/reset.css'
import swiperCss from '../css/swiper.min.css'
import indexCss from '../css/detail.css'

import Swiper from '../js/swiper.min.js';

var swiper = new Swiper('.swiper-container', {
	pagination: {
  	el: '.swiper-pagination',
	},
	loop : true,
	autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
  },
});

$(function () {
	$(".recommend .title div").click(function () {
		$(".recommend .title div").removeClass('active')
		$(this).addClass('active')
	})
})
console.log('src/entry/detail.js')