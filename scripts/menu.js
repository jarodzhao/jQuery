var menu_list = [
	 ['导航', ['我的方法','我的程序']],
	 ['导航2', ['我的方法2','我的程序2']],
	 ['导航3', ['我的方法3','我的程序3']]
 ];

$(function() {

	init();	//初始化方法

	$menu = $('#menu');

	$.each(menu_list, function(i){
		$menu.append(menu_list[i][0] + "<br />");
		$item = menu_list[i][1];
		$.each($item, function(i2){
			$menu.append($item[i2] + "<br />");
		})
	});
})

/**
 * 初始化页面
 * @return 无返回值
 */
init = function(){
	$('#title').css('color','red');
}