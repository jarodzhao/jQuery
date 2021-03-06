/**
 * 显示全部品牌方法
 * @return {[void]}
 */
showAll = function() {
	var $catagory = $('#catagory');
	//获取表格内的所有 td
	$('#catagory td:even').css('color', 'red');
}

/**
 * 获取一个大于900小于1000的随机整数
 * @param  {[下界值]}
 * @param  {[上界值]}
 * @return {[符合要求的随机数]}
 */
getRandSum = function(min, max) {
	var ref = 0;
	while (ref < min)
		ref = Math.random() * max;
	return ref;
}

/**
 * 测试 StringBuilder 使用方法
 * 调用:click(xxx)
 * @return {[void]}
 */
testStringBuilder = function() {
	var ss = ['aa', 'bb'];
	// 指定 , 为分隔符
	var sb = new StringBuilder(',');
	sb.Append('jarod');
	sb.Append('zhao');
	sb.AppendFormat('{1},{0}', ss);
	console.info(sb.ToString());
	//方法联动
	$('#testSB').addClass('promoted');
}

/**
 * 显示动态提示框 tooltip
 * @param  {[type]} t [description]
 * @return {[type]}   [description]
 */
showTooltip = function(t) {
	var x = 10;
	var y = 20;
	if (t) {
		var Title = t.title;
		t.title = "";
		var tooltip = "<div id='tooltip'>" + Title + "</div>";
		$('body').append(tooltip);
		$('#tooltip').css({
			'top': (t.pageY + y) + 'px'
		}, {
			'top': (t.pageX + x) + 'px'
		}, )
	} else {
		t.title = Title;
		$('#tooltip').remove();
	}
};