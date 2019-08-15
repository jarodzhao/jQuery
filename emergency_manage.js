// 应急处置流程管理 2018-11-27 - zht

var exStatus = [];
$(function() {

    validate_addform();
    validate_editform();
    validate_addNodeForm();
    validate_addDetailForm();
    
    $("#addModal").draggable();
    $("#addNodeModal").draggable();
    $("#addDetailModal").draggable();
    $("#editModal").draggable();
    $("#alertDeleteModal").draggable();
    
//  $("#nodeModal").draggable();

    initCheckbox();
    initDataTable();

//  加载二次审核部门
    $('.confirmDept').selectMania({ themes: ['orange'], size: 'small' });
//  setTimeout(function(){ mergeTable($("#table0"), 0, 'keypoint', 1, 2) }, 100);
});

window.rowEvents = {
 'click .editOfRow': function(e, value, row, index){
     loadEmergencyData(row);
     $("#editModal").modal('show');
 },
 'click .deleteOfRow': function(e, value, row, index){
     $("#alertDeleteModal").find("#emergencyName").text(row.emergencyName);
     $("#btnDeleteEmergency").off('click').on('click', function(){
         // 1. 异步删除操作
         // 2. 关闭 modal
         // 3. 刷新父窗口
         if(deleteEmergency(row)){
             initDataTable();
             $("#alertDeleteModal").modal('hide');
         }else{
             console.log('删除失败！');
         }
     });
     $("#alertDeleteModal").modal('show');
 }
};

// 自定义事件
$.fn.setForm = function(jsonValue){
  var obj = this;
  $.each(jsonValue,function(name,ival){
    var $oinput = obj.find("input[name="+name+"]");
    if($oinput.attr("type")=="checkbox"){
      if(ival !== null){
        var checkboxObj = $("[name="+name+"]");
        var checkArray = ival.split(";");
        for(var i=0;i<checkboxObj.length;i++){
          for(var j=0;j<checkArray.length;j++){
            if(checkboxObj[i].value == checkArray[j])
              checkboxObj[i].click();
            }
        }
      }
    }else if($oinput.attr("type")=="radio"){
      $oinput.each(function(){
        var radioObj = $("[name="+name+"]");
        for(var i=0;i<radioObj.length;i++){
          if(radioObj[i].value == ival)
            radioObj[i].click();
          }
      });
    }else if($oinput.attr("type")=="textarea"){
      obj.find("[name="+name+"]").html(ival);
    }else{
      obj.find("[name="+name+"]").val(ival);
    }
  })
};

function initDataTable() {
 $("#table0").bootstrapTable('destroy').bootstrapTable({
     method : 'post',
     url : path + '/emergency/getAllEmergency.do',
     cache : false,
     contentType : 'application/x-www-form-urlencoded',
     striped : false,
     pagination : true,
     pageSize : 20,
     pageNumber : 1,
     pageList : [ 10, 20, 50, 100 ],
     search : true,
     searchOnEnterKey : true,
     trimOnSearch : true,
     clickToSelect : false,
     showRefresh : true,
     toolbar : '#toolbar1',
     showColumns : true,
     showToggle : true,
     sidePagination : 'server',
     showExport : true,
     columns : emergencyColumns(),
     queryParams : function(params) {
         return params;
     },
     onDblClickRow : function(row, $element){
         showEmergency(row);
     }
 });
}

function initCheckbox(){
    $('#pub').on('ifChecked', function(){
        $("#editform").setForm({ published: 1 })
    });
    $('#stp').on('ifChecked', function(){
        $("#editform").setForm({ published: 0 })
    });
    $('#pub').iCheck({ radioClass: 'iradio_square' });
    $('#stp').iCheck({ radioClass: 'iradio_square' });
    
    $("#yes").on('ifChecked', function(){
        $("#addDetailForm").setForm({ needConfirm: 1 });
        $("#confirmDeptRow").show();
    }).on('ifUnchecked', function(){
        $("#addDetailForm").setForm({ needConfirm: 0 });
        $("#confirmDeptRow").hide();
    });
    $("#no").on('ifChecked', function(){
        $("#addDetailForm").setForm({ needConfirm: 0 });
//        $("#confirmDeptRow").show();
    }).on('ifUnchecked', function(){
        $("#addDetailForm").setForm({ needConfirm: 1 });
//        $("#confirmDeptRow").show();
    });
    $('#yes').iCheck({ radioClass: 'iradio_square' });
    $('#no').iCheck({ radioClass: 'iradio_square' });
}


// 添加流程
function submit_addform(){
    // 进行表单验证
    var bv = $("#addform").data('bootstrapValidator');
    bv.validate();
    if (bv.isValid()) {
        $.ajax({
            url : path + '/emergency/saveEmergency.do',
            async : false,
            type : 'POST',
            data : $("#addform").serialize(),
            success : function(result) {
                if (result) {
                    $("#addEmergencyModal").modal('hide');
                    initDataTable();
                } else {
                    console.log("no response!");
                }
            },
            error : function(msg) {
                for ( var info in msg)
                    console.log(info + " = " + msg[info]);
            }
        })
    }
}

// 编辑应急流程
function submit_editform(){
    // 进行表单验证
     var bv = $("#editform").data('bootstrapValidator');
     bv.validate();
     if (bv.isValid()) {
         $.ajax({
             url : path + '/emergency/saveEmergency.do',
     async : false,
     type : 'POST',
     data : $("#editform").serialize(),
     success : function(result) {
         if (result) {
             initDataTable();
             $("#editModal").modal('hide');
         } else {
             console.log("no response!2");
         }
     },
     error : function(msg) {
         for ( var info in msg)
             console.log(info + " = " + msg[info]);
             }
         })
     }
}

// 添加节点 - 绑定节点操作（2）
function submit_addNodeForm(row){ // row = emergency
    var bv = $("#addNodeForm").data('bootstrapValidator');
    bv.validate();
    if (bv.isValid()) {
        $.ajax({
            url : path + '/emergencyNode/saveNode.do',
            async : false,
            type : 'POST',
            data : $("#addNodeForm").serialize(),
            success : function(data) {
                if (data) {
                    $("#addNodeModal").modal('hide');               // 隐藏添加节点
                                                                    // modal
                    $("#table_node").bootstrapTable('destroy').bootstrapTable({    // 刷新
                        method: 'post',
                        data: data,
                        cache : false,
                        contentType : 'application/x-www-form-urlencoded',
                        striped : false,
                        pagination : false,
                        pageSize : 10,
                        pageNumber : 1,
                        pageList : [ 10, 20, 50, 100 ],
                        search : true,
                        toolbar : '#toolbar2',
                        showRefresh : true,
                        showColumns : true,
                        clickToSelect : false,
                        singleSelect : true,
                        sidePagination : 'server',
                        showExport : true,
                        showToggle : true,
                        exportDataType : 'all',
                        columns : nodeColumns(),
                        onClickRow: function(row, $element){
                            $('.chked').removeClass('chked');
                            $($element).addClass('chked');
                            bindBtnAddDetail(row);
                        },
                        onDblClickRow: function(row, $element){
                            showAddDetail(row);
                        }
                    });
                } else {
                    console.log("no response! table_node 3");
                }
            },
            error : function(msg) {
                for(var info in msg)
                    console.log(info + " = " + msg[info]);
            }
        })
    }
}

// 添加节点 - 条目
function submit_addDetailForm(row){ // row = emergencyNode
    var bv = $("#addDetailForm").data('bootstrapValidator');
    bv.validate();
    if (bv.isValid()) {
        
        // 组装 detail_content 对象列表
        $detailContent = $("#addDetailForm").find("input[id^=detailContent]");
        var details = [];
        $.each($detailContent, function(idx, obj){
            var o ={ detailContent: $(obj).val() };
            details.push(o);
        });
        var data = {
                nodeId: $("#addDetailForm").find("#nodeId").val(),
                needConfirm: $("#addDetailForm").find("#needConfirm").val(),
                confirmDeptId: $("#addDetailForm").find("#confirmDeptId").val(),
                details: details
        }; // 组装结束
        
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'json',                   // 接收数据的格式
            contentType: 'application/json',    // 发送数据的格式
            url: path + '/emergencyItem/saveEmergencyItem.do',
            //https://www.cnblogs.com/htoooth/p/7242217.html == $.ajax 中的 contentType：处理复杂对象
            data: JSON.stringify(data),
            error: function(d){
                console.log(d);
            },
            success: function(d){
                if(d){
                    // 保存完毕，刷新 nodeModal 列表
                    $("#addDetailModal").modal('hide');
                    loadNodeData({ emergencyId: row.emergencyId });

                    // 重置节点条目添加表单
                }else{
                    console.log(d);
                }
                
            }
        });

    
    }
}
// 验证 - 添加流程
function validate_addform(){
    $("#addform").bootstrapValidator({
        message : '输入值不合法',
        feedbackIcons : {
            valid : 'glyphicon glyphicon-ok',
            invalid : 'glyphicon glyphicon-remove',
            validating : 'glyphicon glyphicon-refresh'
        },
        fields : {
            emergencyName : {
                validators : {
                    notEmpty : {
                        message : '应急处置名称不能为空'
                    },
                    stringLength : {
                        min : 2,
                        max : 50,
                        message : '请输入2到50个字符'
                    },
                    regexp : {
                        regexp : /^[a-zA-Z0-9_\-\—\u3001\uff08\uff09\. \u4e00-\u9fa5 ]+$/,
                        message : '名称只能由字母、数字、点、下划线和汉字组成 '
                    }
                }
            },
            emergencyDesc : {
                validators : {
                    notEmpty : {
                        message : '请输入应急处置描述'
                    }
                }
            },
            keypoint : {
                validators : {
                    notEmpty : {
                        message : '关键点不能为空'
                    }
                }
            },
        }
    });
}
// 验证 - 编辑流程
function validate_editform(){
 $("#editform").bootstrapValidator({
     message : '输入值不合法',
     feedbackIcons : {
         valid : 'glyphicon glyphicon-ok',
         invalid : 'glyphicon glyphicon-remove',
         validating : 'glyphicon glyphicon-refresh'
     },
     fields : {
         emergencyName : {
             validators : {
                 notEmpty : {
                     message : '应急处置名称不能为空'
                 },
                 stringLength : {
                     min : 2,
                     max : 50,
                     message : '请输入2到50个字符'
                 },
                 regexp : {
                     regexp : /^[a-zA-Z0-9_\-\—\u3001\uff08\uff09\. \u4e00-\u9fa5 ]+$/,
                     message : '名称只能由字母、数字、点、下划线和汉字组成 '
                 }
             }
         },
         emergencyDesc : {
             validators : {
                 notEmpty : {
                     message : '请输入应急处置描述'
                 }
             }
         },
         keypoint : {
             validators : {
                 notEmpty : {
                     message : '关键点不能为空'
                 }
             }
         },
     }
 });
}
// 验证 - 添加节点
function validate_addNodeForm(){ // debugger;
        $('#addNodeForm').bootstrapValidator({
        message : '输入值不合法',
        feedbackIcons : {
            valid : 'glyphicon glyphicon-ok',
            invalid : 'glyphicon glyphicon-remove',
            validating : 'glyphicon glyphicon-refresh'
        },
        fields : {
            nodeName_ : {
                validators : {
                    notEmpty : {
                        message : '节点名称不能为空'
                    },
                    stringLength : {
                        min : 2,
                        max : 50,
                        message : '请输入2到50个字符'
                    },
                    regexp : {
                        regexp : /^[a-zA-Z0-9_\-\—\u3001\uff08\uff09\. \u4e00-\u9fa5 ]+$/,
                        message : '名称只能由字母、数字、点、下划线和汉字组成 '
                    }
                }
            }
        }
    });
}
// 验证 - 添加条目（detail）
function validate_addDetailForm(){ // debugger;
    $('#addDetailForm').bootstrapValidator({
        message : '输入值不合法',
        feedbackIcons : {
            valid : 'glyphicon glyphicon-ok',
            invalid : 'glyphicon glyphicon-remove',
            validating : 'glyphicon glyphicon-refresh'
        },
        fields : {
            detailContent : {
                validators : {
                    notEmpty : {
                        message : '至少录入一个条目内容'
                    },
                    stringLength : {
                        min : 2,
                        max : 500,
                        message : '请输入2到500个字符'
                    },
                    regexp : {
                        regexp : /^[a-zA-Z0-9_\-\—\u3001\uff08\uff09\. \u4e00-\u9fa5 ]+$/,
                        message : '名称只能由字母、数字、点、下划线和汉字组成 '
                    }
                }
            }
        }
    });
}


// 双击事件（应急流程） - 编辑
function showEmergency(row){
    loadEmergencyData(row);
    $("#editModal").modal('show');
}

// 加载应急编辑信息
function loadEmergencyData(row){
    // debugger;
    $("#editform").setForm({
        emergencyName: row.emergencyName,
        emergencyDesc: row.emergencyDesc,
        keypoint: row.keypoint,
        emergencyId: row.emergencyId
      });
      var $pub = $("#editform").find("#pub");
      var $stp = $("#editform").find("#stp");
      if(row.published == 1){
          $("#btnShowNode").removeClass().addClass('btn btn-warning');
          $pub.iCheck('uncheck').iCheck("check");
      }else{
          $("#btnShowNode").removeClass().addClass('btn btn-info');
          $stp.iCheck('uncheck').iCheck("check");
      }
      $("#btnShowNode").off('click').on('click', function(){ // debugger;
          showNodeData(row);
      });
  }

// 显示节点列表 - 绑定节点操作（1）
function showNodeData(row){
    $("#nodeModal").modal('show').on('hide.bs.modal', function(){
        $("#btnAddDetail").off('click'); // 取消添加明细条目按钮点击事件
        // loadEmergencyData(row); // 关闭 nodeModal 后重新加载一下 应急窗口数据（解决 iCheck 不能正常显示问题）
        if(row.published == 1)
            $("#editform").find("#pub").iCheck('uncheck').iCheck("check");
        else
            $("#editform").find("#stp").iCheck('uncheck').iCheck("check");
    });
    
    $("#toolbar2").find("#emergencyName_label").text(row.emergencyName);
    $("#btnAddNode").off('click').on('click', function(){ showAddNode(row) });
    $("#btnSaveNode").off('click').on('click', function(){ submit_addNodeForm(row) });
    $("#toolbar2").css('display','block');
    loadNodeData(row);
    $("#btnExpandAll").click(function(){
        getNodeRecordCount();
        $("#table_node").bootstrapTable('expandAllRows');
        for(var i=0;i<exStatus.length;i++)
            exStatus[i] = 1;
    });
    $("#btnCollapseAll").click(function(){
        getNodeRecordCount();
        $("#table_node").bootstrapTable('collapseAllRows');
        for(var i=0;i<exStatus.length;i++)
            exStatus[i] = 0;
    });
}

// 加载模态框中的节点信息
function loadNodeData(row){ // row = emergency
    // ajax 获取到数据，然后本地加载：bootstrapTable 异步获取数据后，无法在 modal 中显示
    $.ajax({
        url: path + '/emergencyNode/getNodes.do?emergencyId=' + row.emergencyId,
        async: false,
        success: function(data){
            if(data){
                $("#table_node").bootstrapTable('destroy').bootstrapTable({
                    method: 'post',
                    data : data,
                    cache : false,
                    detailView: true,
                    contentType : 'application/x-www-form-urlencoded',
                    striped : false,
                    pagination : false,
                    pageSize : 10,
                    pageNumber : 1,
                    pageList : [ 10, 20, 50, 100 ],
                    search : false,
                    showHeader: false,
                    toolbar : '#toolbar2',
                    showRefresh : false,
                    showColumns : false,
                    clickToSelect : false,
                    singleSelect : true,
                    sidePagination : 'server',
                    // queryParams : '',
                    showExport : false,
                    showToggle : false,
                    exportDataType : 'all',
                    columns : nodeColumns(),
                    onClickRow: function(row, $element){
                        $('.chked').removeClass('chked');
                        $($element).addClass('chked');
                        $("#nodeModal").find("#selectedNodeId").val(row.nodeId);
                        bindBtnAddDetail(row);
                    },
                    onDblClickRow: function(row, $element){
                        getNodeRecordCount();   // init nodeRodrdCount
                        var f = $("#dblClick").val();
                        var id = $element.data('index');

                        if(f == 0 && exStatus[id] == 0){
                            $("#table_node").bootstrapTable('expandRow', id);
                            exStatus[id] = 1;
                        }else if(f == 0 && exStatus[id] == 1) {
                            $("#table_node").bootstrapTable('collapseRow', id);
                            exStatus[id] = 0;
                        }else{
                            showAddDetail(row);
                        }
                    },
                    onExpandRow: function(index, row, $detail){ // row = 
                        if(row.items.length > 0)
                            loadNodeDetail(index, row, $detail);
                    }
                });
                
            }else{
                console.log("数据格式错误！");
            }
        },
        error: function(data){
            console.log(data);
        }
    });
}
// 添加应急
function showAddEmergency(){
    $("#addEmergencyModal").modal('show').on('hidden.bs.modal', function(e){
        $("#addEmergencyModal").find('#emergencyName').val('');
        $("#addEmergencyModal").find('#emergencyDesc').val('');
        $("#addEmergencyModal").find('#keypoint').val('');
        $("#addform").data('bootstrapValidator').resetForm(true);
    });
}
// 添加节点
function showAddNode(row){
    $("#addNodeModal").find('#nodeName_').val('');
    $("#addNodeModal").find("#emergencyId").val(row.emergencyId);
    $("#addNodeModal").modal('show').on('hidden.bs.modal', function(){
        $('body').addClass('modal-open');
    });
    $("#addNodeForm").data('bootstrapValidator').resetForm(true);
}
// 添加节点条目
function showAddDetail(row){ // debugger;
    $("#addDetailModal").find("#nodeName_").text(row.nodeName_);
    $("#addDetailModal").find("#nodeId").val(row.nodeId);
    $('#no').iCheck('check');    // 二次审核，默认不需要
    $("#addDetailModal").modal('show').on('hidden.bs.modal', function(){
        $("div[id^=detailContentRow_").remove(); // 移除添加的条目录入框
        $('#addDetailForm').setForm({ needConfirm: '', nodeId: '' });
        $("#btnAddDetailInput").popover('destroy');
        $('#no').iCheck('uncheck');
        $('body').addClass('modal-open');
    });
    $("#btnAddDetailInput").off('click').on('click', function(){
        insertDetailInput(row);
    });
     // 1.重置 form 验证
     // 2.绑定保存按钮事件
    $("#addDetailForm").data('bootstrapValidator').resetForm(true);
    $("#btnSaveDetail").off('click').on('click', function(){ submit_addDetailForm(row) });
}
// 插入一个新的条目录入框
function insertDetailInput(row){
    if($("input[id^=detailContent").length < 5){
        var randomId = Math.random().toString(36).substr(2);
        var html = '<div class="form-group" id="detailContentRow_' + randomId + '">';
        html += '<label for="detailContent" class="col-sm-3 control-label">条目内容：</label>';
        html += '<div class="col-sm-9"><div class="input-group">';
        html += '<input type="text" class="form-control" id="detailContent_' + randomId + ' name="detailContent" placeholder="条目内容">';
        html += '<span class="input-group-btn">';
        html += '<button onclick="btnDelDetailInput(\''+ randomId +'\')" class="btn btn-default" type="button">';
        html += '<span class="glyphicon glyphicon-minus"></span> 条目</button></span></div></div></div>';
        $("#firstDetailInput").after(html);
    }else{
        $("#btnAddDetailInput").popover('show');
    }
}
// 移除增加的条目录入框
function btnDelDetailInput(rid){
    $("#btnAddDetailInput").popover('destroy');
    $('#detailContentRow_' + rid).remove();
}
// 加载 - 节点子表
function loadNodeDetail(index, row, $detail){
    var ref = fetch_node(index, row);
    var subTable = $detail.html('<table></table>').find('table');
    $(subTable).bootstrapTable({
        data: ref.data,
        showHeader: false,
        columns: nodeDetailColumns()
    });
    $(subTable).css('overflow', 'hidden');
    $.each(ref.merge, function(idx, val){
        mergeTable($(subTable), val[0], 'id', val[1], 0);
        mergeTable($(subTable), val[0], 'executor', val[1], 0);
        mergeTable($(subTable), val[0], 'needConfirm', val[1], 0);
        mergeTable($(subTable), val[0], 'confirmDeptId', val[1], 0);
        mergeTable($(subTable), val[0], 'nextItemId', val[1], 0);
    });
}
// 绑定添加节点条目按钮事件
function bindBtnAddDetail(row){
    $("#btnAddDetail").off('click').on('click', function(){
        showAddDetail(row);
    });
}
//异步删除应急流程
function deleteEmergency(row){
 var ref = false;
 $.ajax({
     url: path + '/emergency/deleteEmergency.do?emergencyId=' + row.emergencyId,
     async: false,
     success: function(data){
         if(data == '1'){
             console.log('已删除!!!');
             ref = true;
         }else{
             console.log('删除失败...');
             ref = false;
         }
     },
     error: function(e){
         ref = false;
     }
 });
 return ref;
}
// 应急处置 - 列
function emergencyColumns() {
    var columns = [ {
        field : 'emergencyId',
        visible : false,
        align : 'center'
    }, {
        title : '序号',
        class : 'w5',
        align : 'center',
        valign : 'middle',
        sortable : false,
        formatter : function(value, row, index) {
            // 得到每页多少条
            var pageSize = $('#table0').bootstrapTable('getOptions').pageSize; // 通过table的#id
            // 得到当前第几页
            var pageNumber = $('#table0').bootstrapTable('getOptions').pageNumber; // 通过table的#id
            // 每页条数 *（当前页 - 1 ）+ 序号
            return pageSize * (pageNumber - 1) + index + 1; // 返回每条的序号：
        }
    }, {
        title : '应急名称',
        field : 'emergencyName',
        class : 'w12',
        align : 'left',
        halign : 'center',
        valign : 'middle',
        sortable : false,
        formatter : function(value, row, index){
            if(value.length > 20)
                return value.substr(0, 20) + '...';
            else
                return value;
        }
    }, {
        title : '描述',
        class : 'w20',
        field : 'emergencyDesc',
        align : 'left',
        halign : 'center',
        valign : 'middle',
        sortable : false,
        formatter : function(value, row, index){
            if(value.length > 25)
                return value.substr(0, 25) + '...';
            else
                return value;
        }
    }, {
        title : '关键点',
        class : 'w20',
        halign : 'center',
        field : 'keypoint',
        align : 'left',
        valign : 'middle',
        sortable : false,
        formatter : function(value, row, index){
            if(value.length > 25)
                return value.substr(0, 25) + '...';
            else
                return value;
        }
    }, {
        title : '发布',
        class : 'w5',
        field : 'published',
        align : 'center',
        valign : 'middle',
        sortable : false,
        formatter: function(value, row, index){
            if(value == 1)
                return "<span class=\"label label-warning\">启用</span>";
            else
                return "<span class=\"label label-info\">停用</span>";
        }
    }, {
        title : '创建人',
        class : 'w5',
        field : 'createUserId',
        align : 'center',
        valign : 'middle',
        sortable : false
    }, {
        title : '创建时间',
        class : 'w10',
        field : 'createTime',
        align : 'center',
        valign : 'middle',
        sortable : false
    },{
        title : '修改人',
        class : 'w5',
        field : 'modifyUserId',
        align : 'center',
        valign : 'middle',
        sortable : false
    }, {
        title : '修改时间',
        class : 'w10',
        field : 'modifyTime',
        align : 'center',
        valign : 'middle',
        sortable : false
    }, {
        title : '操作',
        class : 'w8',
        align : 'center',
        halign : 'center',
        valign : 'middle',
        sortable : false,
        events: rowEvents,
        formatter: function(){
            return [
                '<div class="btn-group">',
                '<button class=\"editOfRow btn btn-primary btn-sm\"><span class="glyphicon glyphicon-edit"></span> 编辑</button>',
                '<button class=\"deleteOfRow btn btn-danger btn-sm\"><span class="glyphicon glyphicon-remove"></span></button>',
                '</div>'
            ].join('');
        }
    } ];
    return columns;
}

// 节点 - 列
function nodeColumns(){
    return [{
        field: 'nodeOrder',
        title: '序号',
        halign: 'center',
        align: 'center',
        class: 'w8'
    },{
        field: 'nodeName_',
        title: '节点名称',
        halign: 'center',
        align: 'left',
        class: 'w90'
    },{
        field: '',
        title: '',
        halign: 'center',
        align: 'left',
        formatter: function(){
            return '';
        }
    }];
}

// 节点子表 - 列
function nodeDetailColumns(){
    return [{
        field: 'id',
        title: '编号',
        halign: 'center',
        valign: 'middle',
        align: 'center',
        class: 'w10'
    },{
        field: 'detailContent', // sub - sub - table
        title: '条目内容',
        halign: 'center',
        align: 'left',
        class: 'w50'
    },{
        field: 'needConfirm',
        title: '二次确认',
        halign: 'center',
        valign: 'middle',
        align: 'center',
        class: 'w10',
        formatter: function(value, row, index){
            if(value == 1)
                return "<span class=\"label label-warning\">二次确认</span>";
            else
                return "";
        }
    },{
        field: 'confirmDeptId',
        title: '二次确认部门（单位）',
        halign: 'center',
        valign: 'middle',
        align: 'center',
        class: 'w15',
        formatter: function(value, row, index){
            if(value.length > 5)
                return value.substring(0, 5) + '...';
            else
                return value;
        }
    },{
        field: 'nextItemId',
        title: '下一节点',
        halign: 'center',
        valign: 'middle',
        align: 'center',
        class: 'w20'
    }];
}
// 节点子表 - data
function fetch_node(index, row){ // row = emergencyNode
    var ref = {},
        data = [],
        mergeNum = [],
        rownum = 0;
    var pushed = true;
    
    var items = row.items;
    
    for(var i=0;i<items.length;i++){
        itemObj = items[i];
        details = itemObj.details;
        pushed = true;
        for(var j=0;j<details.length;j++){
            detailObj = details[j];
            var item = {
                id: row.nodeOrder + '-' + itemObj.itemOrder,
                detailContent: detailObj.detailContent,
                executor: itemObj.itemId,
                needConfirm: itemObj.needConfirm,
                confirmDeptId: itemObj.confirmDeptId,
                nextItemId: itemObj.nextItemId
            };
            data.push(item);
            
            // 计算合并单元格
            if(details.length > 1 && pushed){
                pushed = false;
                mergeNum.push([rownum, details.length]);
            }
            rownum++;
        }
    };
    var ref = {
        data: data,
        merge: mergeNum
    };
    return ref;
}

// 双击操作切换
function toggleDblClick(f){
    if(f){
        $("#add").attr('style','display:none');
        $("#exp").removeAttr('style');
        $("#dblClick").val('0');
    }else{
        $("#add").removeAttr('style');
        $("#exp").attr('style', 'display:none');
        $("#dblClick").val('1');
    }
}

// 获取节点表的记录总数（展开所有和双击前执行，获取表的总行数）
function getNodeRecordCount(){
    if(exStatus.length == 0){
        var dc = $("#table_node").bootstrapTable('getData').length;
        for(var i=0;i<dc;i++)
            exStatus[i] = 0;
    };
}
//合并单元格
function mergeTable(table, rownum, field, rows, cols){
 table.bootstrapTable('mergeCells', {
     index: rownum,      // 行索引[0-n]
     field: field,       // 字段名
     rowspan: rows,      // 合并行数量
     colspan: cols       // 合并列数量
 });
}
