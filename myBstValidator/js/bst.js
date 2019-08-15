$(function(){
	initTable();
});

function initTable(){
	$("#table0").bootstrapTable({
		method: 'get',
		data : getData(),
		cache : false,
		contentType : 'application/x-www-form-urlencoded',
		striped : false,
		pagination : true,
		useCurrentPage: true,
		pageSize : 5,
		pageNumber : 2,
		pageList : [ 10, 20, 50, 100 ],
		search : true,
		toolbar : '#toolbar',
		clickToSelect : true,
		showRefresh : true,
		showColumns : true,
		sidePagination : 'server',
		// queryParams : '',
		showExport : true,
		showToggle : true,
		exportDataType : 'all',
		columns : tableColumns()
	})
};

function getData(){
	var data = {
		name: 'jarod',
		dept: '研发部',
		job: 'Java 研发',
		birthday: '1980-09-24',
		desc: '111'
	};
	
	var ref = [];

	for(var i=1;i<10;i++){
		var data2 = data;	// 浅拷贝
		data2.id=i;
		ref.push(data2);
	}
	console.log(ref);
	ref[0].desc = '222';
	return ref;
}

function tableColumns(){
	return [{
		checkbox: true
	},{
		field: 'id',
		title: 'id',
		halign: 'center',
		align: 'center'
	},{
		field: 'name',
		title: '姓名',
		halign: 'center',
		align: 'center'
	},{
		field: 'dept',
		title: '部门名称',
		halign: 'center',
		align: 'center'
	},{
		field: 'job',
		title: '职位',
		halign: 'center',
		align: 'center'
	},{
		field: 'birthday',
		title: '生日',
		halign: 'center',
		align: 'center'
	},{
		field: 'desc',
		title: '备注',
		halign: 'center',
		align: 'center'
	}];
};
