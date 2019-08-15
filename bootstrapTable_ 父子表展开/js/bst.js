$(function(){
	var r = Math.random() * 100000;
	// $("#c1").text(r + ' - ' + Math.floor(r));
	$("#c1").text(Math.random().toString(36).substr(2));
	initTable();
	bindBtn();
});

function initTable(){
	$("#table0").bootstrapTable({
		method: 'get',
		data : data(),
		cache : false,
		detailView: true,
		contentType : 'application/x-www-form-urlencoded',
		striped : true,
		pagination : true,
		// useCurrentPage: true,
		pageSize : 10,
		pageNumber : 1,
		pageList : [ 10, 20, 50, 100 ],
		search : true,
		toolbar : '#toolbar',
		clickToSelect : false,
		showRefresh : true,
		showColumns : true,
		sidePagination : 'server',
		// queryParams : '',
		showExport : true,
		showToggle : true,
		exportDataType : 'all',
		columns : tableColumns(),
		onExpandRow: function(index, row, $detail){
			initSubTable(index, row, $detail);
		},
		onDblClickRow: function(row, $element, field){
			alert(field);
		}
	})
};

function bindBtn(){
	$table = $("#table0");
	$("#btnExpand").click(function(){
		$table.bootstrapTable('expandAllRows');
	});
	$("#btnCollapse").click(function(){
		$table.bootstrapTable('collapseAllRows');
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
	$subTable.bootstrapTable({
		data: subData(),
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