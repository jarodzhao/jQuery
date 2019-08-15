$(function(){
	var r = Math.random() * 100000;
	// $("#c1").text(r + ' - ' + Math.floor(r));
	$("#c1").text(Math.random().toString(36).substr(2));
	initTable();
	bindBtn();
});

var exStatus = [];

function initTable(){
	$("#table0").bootstrapTable({
		method: 'get',
		data : data(),
		cache : false,
		detailView: true,
		contentType : 'application/x-www-form-urlencoded',
		striped : true,
		search : true,
		toolbar : '#toolbar',
		clickToSelect : false,
		showRefresh : true,
		showColumns : true,
		showHeader: false,
		sidePagination : 'server',
		showExport : true,
		showToggle : true,
		columns : tableColumns(),
		onExpandRow: function(index, row, $detail){
			initSubTable(index, row, $detail);
		},
		onDblClickRow: function(row, $element, field){

			if(exStatus.length == 0){
				var dc = $("#table0").bootstrapTable('getData').length;
				for(var i=0;i<dc;i++)
					exStatus[i] = 0;
			};

			var f = $("#dblClick").val();
			var id = $element.data('index');

			if(f == 0 && exStatus[id] == 0){
				$("#table0").bootstrapTable('expandRow', id);
				ex = false;
				exStatus[id] = 1;
			}else if(f == 0 && exStatus[id] == 1) {
				$("#table0").bootstrapTable('collapseRow', id);
				ex = true;
				exStatus[id] = 0;
			}else{
				$("#testModal").modal('show');
			};

			console.log(exStatus);
		}
	})
};

function toggleDblClick(f){
	if(f){
		$("#expandIcon").attr('style','margin-right: 10px;').show();
		$("#addIcon").hide();
		$("#dblClick").val('0');
	}else{
		$("#addIcon").attr('style','margin-right: 10px;').show();
		$("#expandIcon").hide();
		$("#dblClick").val('1');
	}
}

function bindBtn(){
	$table = $("#table0");
	if(exStatus.length == 0){
		var dc = $table.bootstrapTable('getData').length;
		for(var i=0;i<dc;i++)
			exStatus[i] = 0;
	};

	$("#btnExpand").click(function(){
		$table.bootstrapTable('expandAllRows');
		for(var i=0;i<exStatus.length;i++)
			exStatus[i] = 1;
		console.log(exStatus);
	});
	$("#btnCollapse").click(function(){
		$table.bootstrapTable('collapseAllRows');
		for(var i=0;i<exStatus.length;i++)
			exStatus[i] = 0;
		console.log(exStatus);
	});
}

function data(){
	var ref = [];
	for (var i = 1; i <= 10; i++) {
		var o = {
			name: 'jarod #' + i,
			dept: '研发部',
			job: 'Java 开发',
			birthday: '2012-07-29',
			desc: '大宝贝'
		}
		ref.push(o);
	}
	return ref;
}

function initSubTable(index, row, $detail){
	$subTable = $detail.html('<table></table>').find('table');
	$subTable.css('padding-left','20px').bootstrapTable({
		data: subData(),
		showHeader: false,
		columns: subColumns()
	})
}

function tableColumns(){
	return [{
		field: 'name',
		title: '姓名'
	},{
		field: 'dept',
		title: '部门名称'
	},{
		field: 'job',
		title: '职位'
	},{
		field: 'birthday',
		title: '生日'
	},{
		field: 'desc',
		title: '备注'
	}];
}

function subColumns(){
	return [{
		field: 'a',
		title: '编号'
	},{
		field: 'b',
		title: '出版社'
	},{
		field: 'c',
		title: '价格'
	},{
		field: 'd',
		title: '介绍'
	}]
}

function subData(){
	var ref = [];
	for(var i=1;i<5;i++){
		var o = {
			a: i,
			b: '人民邮电出版社',
			c: '￥19.99',
			d: '源自大名鼎鼎的 Big Nerd Ranch 训练营培训讲'
		}
		ref.push(o);
	}
	return ref;
}