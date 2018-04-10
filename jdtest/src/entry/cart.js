import resetCss from '../css/reset.css'
import indexCss from '../css/cart.css'

$(function () {
	$(".selected-circle").click(function () {
		$(this).toggleClass("active")
		if($(this).hasClass('active')) {
			$('.balance-num').html(Number($('.balance-num').html()) + 1)
		} else {
			$('.balance-num').html(Number($('.balance-num').html()) - 1)
		}
	})

	$(".selected-all").click(function () {
		$(this).find('.selected-all-img').toggleClass('active')
		if ($(this).find('.selected-all-img').hasClass('active')) {
			$('.selected-circle').addClass('active')
			$('.balance-num').html($('.selected-circle').length)
		}else {
			$('.selected-circle').removeClass('active')
			$('.balance-num').html(0)
		}
	})

	$(".add").click(function () {
		$(this).siblings('.num').val(Number($(this).siblings('.num').val()) + 1)
	})

	$(".reduce").click(function () {
		if ($(this).siblings('.num').val() <= 1) {
			return
		}
		$(this).siblings('.num').val(Number($(this).siblings('.num').val()) - 1)
	})
})

console.log('src/entry/cart.js')