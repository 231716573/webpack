import resetCss from '../css/reset.css'
import indexCss from '../css/classify.css'

$(function () {
	$(".classify-left li").bind('click', function () {
		$(".classify-left li").removeClass("active")
		$(this).addClass("active")
	})
})
console.log('src/entry/classify.js')