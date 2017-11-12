$(function() {

	$('.level1')
	.mouseover(function(){
		$(this).css('color','#f00');
	}).click(function(){
		if(!$(this).hasClass('open'))
			$(this).addClass('open').children('.level2').show();
		else
			$(this).removeClass('open').children('.level2').hide();
	}).mouseout(function(){
		$(this).css('color','#00f');
	});

	//*****************************************************
	//设置样式
	//*****************************************************
	$('.level1').attr('title', '打开/关闭菜单')

	//打开页面时列表默认关闭状态
	$(".level1").children().hide();


	//*****************************************************
	//菜单的点击事件
	//*****************************************************
	$(".level1 > a").click(function() {
		// 打开/关闭菜单子项
		if ($(this).hasClass('current')) {
			$(this).removeClass('current').next().hide();
			return false;
		} else {
			$(this).addClass("current")
				.next().show();
			return false;
		}
	});

	// css 选择器为什么不能用?
	// 因为 $('xxx')是jquery对象,而jquery对象是一个数组
	// 用$('xxx')[0].style.color='red'
	// $('#title').style.color='red';
	// document.getElementById('title').style.color='red';
	$title = $('#title')[0];
	$title.style.color = 'green';
	// $title.style.color

	$('#title').click(function() {
		$('#title').html('标题变一变');
	});

	// 测试用 jquery 的 click 方法执行页面里单独的方法
	$('#testSB').click(testStringBuilder);

	$('#toggle').click(testToggle);

	//显示全部按钮方法绑定
	$('#btnShowAll').click(showAll);

	$('#showMenu').click(function() {
		location.href = 'index2.html';
	})

	$("#Count").click(function() {

		var arrays = new Array();
		var items = document.getElementsByName("check");

		for (var i = 0; i < items.length; i++)
			if (items[i].checked)
				arrays.push(items[i].value);
		// console.info(arrays.length);
	});

	//判断 checkbox 选中状态
	var check_size = $("input[name='check']:checked");
	console.info("lz = " + check_size.length);



	// 数码品牌列表
	var catagory = [
		'佳能', '索尼', '三星',
		'尼康', '松下', '卡西欧',
		'富士', '柯达', '宾得',
		'理光', '奥林巴斯', '明基',
		'爱国者', '其他品牌'
	]; //14

	// 随机数
	var sum = 0;

	// 列数
	var row = 4;

	// 根据列数计算出行数
	var col = Math.ceil(catagory.length / row);

	// 循环计数器
	var count = 0;

	// 获取表格对象
	var $catagory = $('#catagory');

	// 设置表格 border 属性
	$catagory.attr('border', '1');

	// 行循环开始
	for (var i = 0; i < col; i++) {

		// 增加行首 tr 标记
		$catagory.append('<tr>');

		// 列循环开始
		for (var j = 0; j < row; j++) {

			// 如果品牌列表中的元素不为空值
			if (catagory[count])
				item = catagory[count];

			count++;
			sum = getRandSum(1000, 35000);

			// 表格单元格
			$catagory.append('<td>' + item + '(' + Math.floor(sum) + ')' + '</td>');

			// 循环次数达到品牌列表的总数，跳出循环
			if (count == catagory.length) return;
		}
		//为什么第一行会输出 <tr></tr>，显示效果正常
		$catagory.append('</tr>');
	}

	//为什么这里的 按钮事件 不执行!?
	// $('#btnShowAll').click(showAll);
});