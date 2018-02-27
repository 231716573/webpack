$(function() {
	
	// 动态获取主页高度
	$('#main').height($(document).height());

	// 设置弹窗背景高度
	$('.bg').height($(document).height());

	// 关闭弹窗
	$('.window .close').click(function() {
		$(this).parents('.window').hide();
	});

	// 页头返回
	$('#header a').click(function() {
		window.history.go(-1);
	});

});