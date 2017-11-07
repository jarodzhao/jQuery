$(function(){
	//alert('hello, jarod!');
	$(".level1 > a").click(function(){

		//给当前元素添加 current 样式
		$(this).addClass("current")

		//下一个元素显示
		.next().show()

		//父元素的同辈元素的子元素<a>移除 current 样式
		.parent().siblings().children("a").removeClass("current")

		//它们的下一个元素隐藏
		.next().hide();			

		return false;
	});

	$('#title').css("color","red");

	$('#title').click(function(){
		$('#title').html('标题变一变');
	});

	$("#Count").click(function(){

		var arrays = new Array();
		var items = document.getElementsByName("check");
		
		for (var i = 0; i < items.length; i++) 
			if(items[i].checked)
				arrays.push(items[i].value);
			console.info(arrays.length);
		});

	var check_size = $("input[name='check']:checked");
	// console.info("lz = " + check_size.length);

	// 传统方式写多行代码
	var item = document.getElementById("tb");
	var tbody = item.getElementsByTagName("tbody")[0];
	var trs = tbody.getElementsByTagName("tr");

	for(var i = 0; i < trs.length; i++)
		if(i % 2 == 0)
			trs[i].style.backgroundColor='#efefef';

	// jQuery 方式一句搞定
	$("#tb tr:even").css("background","#eef");

	// jQuery 的 class 选择器，以及 css 属性设置
	$('.level1:even').css('background','#ccf');

	// 产生随机数
	// var s = Math.random() * 10000;
	// console.info(Math.floor(s));

	// 数码品牌列表
	var catagory = [
		'佳能','索尼','三星',
		'尼康','松下','卡西欧',
		'富士','柯达','宾得',	
		'理光','奥林巴斯','明基',
		'爱国者','其他品牌'];	//14

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
	$catagory.attr('border','1');

	// 行循环开始
	for (var i = 0; i < col; i++) {

		// 增加行首 tr 标记
		$catagory.append('<tr>');

		// 列循环开始
		for (var j = 0; j < row; j++) {

			// 如果品牌列表中的元素不为空值
			if(catagory[count].length > 0)
				item = catagory[count];

			count++;

			// 生成1000以为的随机数
			sum = Math.random() * 1000;

			// 表格单元格
			$catagory.append('<td>' + item + '(' + Math.floor(sum) + ')' + '</td>');

			// 循环次数达到品牌列表的总数，跳出循环
			if(count == catagory.length) return;
		}
		//为什么第一行会输出 <tr></tr>，显示效果正常
		$catagory.append('</tr>')
	}
});