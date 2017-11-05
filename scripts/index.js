$(function(){
	//alert('hello, jarod!');
	$(".level1 > a").click(function(){
		$(this).addClass("current")		//给当前元素添加 current 样式
		.next().show()					//下一个元素显示
		.parent().siblings().children("a").removeClass("current")
										//父元素的同辈元素的子元素<a>移除 current 样式
		.next().hide();					//它们的下一个元素隐藏
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

	var row = 3;
	var col = Math.ceil(catagory.length / row);
	var $catagory = $('#catagory');

	for (var i = 0; i < col; i++) {
		var tr = '<tr>';
		$catagory.append(tr);
		for (var i2 = 0; i2 < row; i2++) {
			var td = '<td>' + catagory[i2] + '</td>';
			$catagory.append(td);
		}
		$catagory.append('</tr>');
	}

});