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