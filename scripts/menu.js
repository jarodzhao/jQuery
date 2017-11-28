/**
 * 页面初始化
 * @param  {[type]} ) {	init();		$menu [description]
 * @return {[type]}   [description]
 */
$(function() {

	$('#date0').text(moment().endOf('w').format('YYYY-MM-DD'));

	console.info(moment().startOf('w').add(1,'d').format('YYYY-MM-DD'));
	console.info(moment().endOf('w').format('YYYY-MM-DD'));
	console.info(moment().endOf('w').add(-1,'d').format('YYYY-MM-DD'));

	var h = Math.ceil(Math.random()*1000);

	updateNameInUI(h);
	myToggle();		//toggle方法
	stopProgr(); 	//停止冒泡行为
	init(); 		//初始化方法
	menu_init(); 	//菜单初始化
})

// angular Js
updateNameInUI = function(name){
	$('#name').text(name);
}

/**
 * 初始化页面
 * @return 无返回值
 */
init = function() {
	$('#title').css('color', 'red');
	//aaa
}

/**
 * 菜单初始化
 * @return {[type]} [description]
 */
menu_init = function() {
	$menu = $('#menu');
	$.each(menu_list, function(i) {
		$menu.append(menu_list[i][0] + "<br />");
		$item = menu_list[i][1];
		$.each($item, function(i2) {
			$menu.append("- " + $item[i2] + "<br />");
		})
	});
}

/**
 * 停止冒泡行为
 * @return {[type]} [description]
 */
stopProgr = function() {
	$('body').bind('click', function(event) {
		console.info('body');
		event.stopPropagation(); //停止冒泡行为
	});

	$('#content').bind('click', function(event) {
		console.info('content');
		event.stopPropagation(); //停止冒泡行为
	});

	$('span').bind('click', function(event) {
		console.info('span');
		event.stopPropagation(); //停止冒泡行为
	});
}

/**
 * 替换 toggle 的方法
 * @return {[type]} [description]
 */
myToggle = function(){
	var a = true;

	// 替代 toggle 的方法
	$('#btn').click(function() {
		a = !a;
		if (a)
			$('#menu').fadeIn();
		else
			$('#menu').fadeOut();
	});
}

/**
 * 菜单资源
 * @type {Array}
 */
var menu_list = [
	['导航', ['我的方法', '我的程序']],
	['导航2', ['我的方法2', '我的程序2']],
	['导航3', ['我的方法3', '我的程序3']]
];