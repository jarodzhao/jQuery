// 显示全部品牌方法
showAll = function(){
	var $catagory = $('#catagory');
	//获取表格内的所有 td
	$('#catagory td:even').css('color','red');
}

// 单独定义的一个方法
// 获取一个大于900小于1000的随机整数
getRandSum = function(min, max){
	var ref = 0;
	while(ref < min)
		ref = Math.random() * max;
	return ref;
}

// 测试 StringBuilder 使用方法(调用:click(test))
test = function(){
	var ss = ['aa', 'bb'];
	// 指定 , 为分隔符
	var sb = new StringBuilder(',');
	sb.Append('jarod');
	sb.Append('zhao');
	sb.AppendFormat('{1},{0}',ss);
	console.info(sb.ToString());
	//方法联动
	$('#testSB').addClass('promoted');
}