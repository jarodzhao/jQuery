// Ӧ���������̹��� 2018-11-27 - zht

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

//  ���ض�����˲���
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
         // 1. �첽ɾ������
         // 2. �ر� modal
         // 3. ˢ�¸�����
         if(deleteEmergency(row)){
             initDataTable();
             $("#alertDeleteModal").modal('hide');
         }else{
             console.log('ɾ��ʧ�ܣ�');
         }
     });
     $("#alertDeleteModal").modal('show');
 }
};

// �Զ����¼�
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


// �������
function submit_addform(){
    // ���б���֤
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

// �༭Ӧ������
function submit_editform(){
    // ���б���֤
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

// ��ӽڵ� - �󶨽ڵ������2��
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
                    $("#addNodeModal").modal('hide');               // ������ӽڵ�
                                                                    // modal
                    $("#table_node").bootstrapTable('destroy').bootstrapTable({    // ˢ��
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

// ��ӽڵ� - ��Ŀ
function submit_addDetailForm(row){ // row = emergencyNode
    var bv = $("#addDetailForm").data('bootstrapValidator');
    bv.validate();
    if (bv.isValid()) {
        
        // ��װ detail_content �����б�
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
        }; // ��װ����
        
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'json',                   // �������ݵĸ�ʽ
            contentType: 'application/json',    // �������ݵĸ�ʽ
            url: path + '/emergencyItem/saveEmergencyItem.do',
            //https://www.cnblogs.com/htoooth/p/7242217.html == $.ajax �е� contentType�������Ӷ���
            data: JSON.stringify(data),
            error: function(d){
                console.log(d);
            },
            success: function(d){
                if(d){
                    // ������ϣ�ˢ�� nodeModal �б�
                    $("#addDetailModal").modal('hide');
                    loadNodeData({ emergencyId: row.emergencyId });

                    // ���ýڵ���Ŀ��ӱ�
                }else{
                    console.log(d);
                }
                
            }
        });

    
    }
}
// ��֤ - �������
function validate_addform(){
    $("#addform").bootstrapValidator({
        message : '����ֵ���Ϸ�',
        feedbackIcons : {
            valid : 'glyphicon glyphicon-ok',
            invalid : 'glyphicon glyphicon-remove',
            validating : 'glyphicon glyphicon-refresh'
        },
        fields : {
            emergencyName : {
                validators : {
                    notEmpty : {
                        message : 'Ӧ���������Ʋ���Ϊ��'
                    },
                    stringLength : {
                        min : 2,
                        max : 50,
                        message : '������2��50���ַ�'
                    },
                    regexp : {
                        regexp : /^[a-zA-Z0-9_\-\��\u3001\uff08\uff09\. \u4e00-\u9fa5 ]+$/,
                        message : '����ֻ������ĸ�����֡��㡢�»��ߺͺ������ '
                    }
                }
            },
            emergencyDesc : {
                validators : {
                    notEmpty : {
                        message : '������Ӧ����������'
                    }
                }
            },
            keypoint : {
                validators : {
                    notEmpty : {
                        message : '�ؼ��㲻��Ϊ��'
                    }
                }
            },
        }
    });
}
// ��֤ - �༭����
function validate_editform(){
 $("#editform").bootstrapValidator({
     message : '����ֵ���Ϸ�',
     feedbackIcons : {
         valid : 'glyphicon glyphicon-ok',
         invalid : 'glyphicon glyphicon-remove',
         validating : 'glyphicon glyphicon-refresh'
     },
     fields : {
         emergencyName : {
             validators : {
                 notEmpty : {
                     message : 'Ӧ���������Ʋ���Ϊ��'
                 },
                 stringLength : {
                     min : 2,
                     max : 50,
                     message : '������2��50���ַ�'
                 },
                 regexp : {
                     regexp : /^[a-zA-Z0-9_\-\��\u3001\uff08\uff09\. \u4e00-\u9fa5 ]+$/,
                     message : '����ֻ������ĸ�����֡��㡢�»��ߺͺ������ '
                 }
             }
         },
         emergencyDesc : {
             validators : {
                 notEmpty : {
                     message : '������Ӧ����������'
                 }
             }
         },
         keypoint : {
             validators : {
                 notEmpty : {
                     message : '�ؼ��㲻��Ϊ��'
                 }
             }
         },
     }
 });
}
// ��֤ - ��ӽڵ�
function validate_addNodeForm(){ // debugger;
        $('#addNodeForm').bootstrapValidator({
        message : '����ֵ���Ϸ�',
        feedbackIcons : {
            valid : 'glyphicon glyphicon-ok',
            invalid : 'glyphicon glyphicon-remove',
            validating : 'glyphicon glyphicon-refresh'
        },
        fields : {
            nodeName_ : {
                validators : {
                    notEmpty : {
                        message : '�ڵ����Ʋ���Ϊ��'
                    },
                    stringLength : {
                        min : 2,
                        max : 50,
                        message : '������2��50���ַ�'
                    },
                    regexp : {
                        regexp : /^[a-zA-Z0-9_\-\��\u3001\uff08\uff09\. \u4e00-\u9fa5 ]+$/,
                        message : '����ֻ������ĸ�����֡��㡢�»��ߺͺ������ '
                    }
                }
            }
        }
    });
}
// ��֤ - �����Ŀ��detail��
function validate_addDetailForm(){ // debugger;
    $('#addDetailForm').bootstrapValidator({
        message : '����ֵ���Ϸ�',
        feedbackIcons : {
            valid : 'glyphicon glyphicon-ok',
            invalid : 'glyphicon glyphicon-remove',
            validating : 'glyphicon glyphicon-refresh'
        },
        fields : {
            detailContent : {
                validators : {
                    notEmpty : {
                        message : '����¼��һ����Ŀ����'
                    },
                    stringLength : {
                        min : 2,
                        max : 500,
                        message : '������2��500���ַ�'
                    },
                    regexp : {
                        regexp : /^[a-zA-Z0-9_\-\��\u3001\uff08\uff09\. \u4e00-\u9fa5 ]+$/,
                        message : '����ֻ������ĸ�����֡��㡢�»��ߺͺ������ '
                    }
                }
            }
        }
    });
}


// ˫���¼���Ӧ�����̣� - �༭
function showEmergency(row){
    loadEmergencyData(row);
    $("#editModal").modal('show');
}

// ����Ӧ���༭��Ϣ
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

// ��ʾ�ڵ��б� - �󶨽ڵ������1��
function showNodeData(row){
    $("#nodeModal").modal('show').on('hide.bs.modal', function(){
        $("#btnAddDetail").off('click'); // ȡ�������ϸ��Ŀ��ť����¼�
        // loadEmergencyData(row); // �ر� nodeModal �����¼���һ�� Ӧ���������ݣ���� iCheck ����������ʾ���⣩
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

// ����ģ̬���еĽڵ���Ϣ
function loadNodeData(row){ // row = emergency
    // ajax ��ȡ�����ݣ�Ȼ�󱾵ؼ��أ�bootstrapTable �첽��ȡ���ݺ��޷��� modal ����ʾ
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
                console.log("���ݸ�ʽ����");
            }
        },
        error: function(data){
            console.log(data);
        }
    });
}
// ���Ӧ��
function showAddEmergency(){
    $("#addEmergencyModal").modal('show').on('hidden.bs.modal', function(e){
        $("#addEmergencyModal").find('#emergencyName').val('');
        $("#addEmergencyModal").find('#emergencyDesc').val('');
        $("#addEmergencyModal").find('#keypoint').val('');
        $("#addform").data('bootstrapValidator').resetForm(true);
    });
}
// ��ӽڵ�
function showAddNode(row){
    $("#addNodeModal").find('#nodeName_').val('');
    $("#addNodeModal").find("#emergencyId").val(row.emergencyId);
    $("#addNodeModal").modal('show').on('hidden.bs.modal', function(){
        $('body').addClass('modal-open');
    });
    $("#addNodeForm").data('bootstrapValidator').resetForm(true);
}
// ��ӽڵ���Ŀ
function showAddDetail(row){ // debugger;
    $("#addDetailModal").find("#nodeName_").text(row.nodeName_);
    $("#addDetailModal").find("#nodeId").val(row.nodeId);
    $('#no').iCheck('check');    // ������ˣ�Ĭ�ϲ���Ҫ
    $("#addDetailModal").modal('show').on('hidden.bs.modal', function(){
        $("div[id^=detailContentRow_").remove(); // �Ƴ���ӵ���Ŀ¼���
        $('#addDetailForm').setForm({ needConfirm: '', nodeId: '' });
        $("#btnAddDetailInput").popover('destroy');
        $('#no').iCheck('uncheck');
        $('body').addClass('modal-open');
    });
    $("#btnAddDetailInput").off('click').on('click', function(){
        insertDetailInput(row);
    });
     // 1.���� form ��֤
     // 2.�󶨱��水ť�¼�
    $("#addDetailForm").data('bootstrapValidator').resetForm(true);
    $("#btnSaveDetail").off('click').on('click', function(){ submit_addDetailForm(row) });
}
// ����һ���µ���Ŀ¼���
function insertDetailInput(row){
    if($("input[id^=detailContent").length < 5){
        var randomId = Math.random().toString(36).substr(2);
        var html = '<div class="form-group" id="detailContentRow_' + randomId + '">';
        html += '<label for="detailContent" class="col-sm-3 control-label">��Ŀ���ݣ�</label>';
        html += '<div class="col-sm-9"><div class="input-group">';
        html += '<input type="text" class="form-control" id="detailContent_' + randomId + ' name="detailContent" placeholder="��Ŀ����">';
        html += '<span class="input-group-btn">';
        html += '<button onclick="btnDelDetailInput(\''+ randomId +'\')" class="btn btn-default" type="button">';
        html += '<span class="glyphicon glyphicon-minus"></span> ��Ŀ</button></span></div></div></div>';
        $("#firstDetailInput").after(html);
    }else{
        $("#btnAddDetailInput").popover('show');
    }
}
// �Ƴ����ӵ���Ŀ¼���
function btnDelDetailInput(rid){
    $("#btnAddDetailInput").popover('destroy');
    $('#detailContentRow_' + rid).remove();
}
// ���� - �ڵ��ӱ�
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
// ����ӽڵ���Ŀ��ť�¼�
function bindBtnAddDetail(row){
    $("#btnAddDetail").off('click').on('click', function(){
        showAddDetail(row);
    });
}
//�첽ɾ��Ӧ������
function deleteEmergency(row){
 var ref = false;
 $.ajax({
     url: path + '/emergency/deleteEmergency.do?emergencyId=' + row.emergencyId,
     async: false,
     success: function(data){
         if(data == '1'){
             console.log('��ɾ��!!!');
             ref = true;
         }else{
             console.log('ɾ��ʧ��...');
             ref = false;
         }
     },
     error: function(e){
         ref = false;
     }
 });
 return ref;
}
// Ӧ������ - ��
function emergencyColumns() {
    var columns = [ {
        field : 'emergencyId',
        visible : false,
        align : 'center'
    }, {
        title : '���',
        class : 'w5',
        align : 'center',
        valign : 'middle',
        sortable : false,
        formatter : function(value, row, index) {
            // �õ�ÿҳ������
            var pageSize = $('#table0').bootstrapTable('getOptions').pageSize; // ͨ��table��#id
            // �õ���ǰ�ڼ�ҳ
            var pageNumber = $('#table0').bootstrapTable('getOptions').pageNumber; // ͨ��table��#id
            // ÿҳ���� *����ǰҳ - 1 ��+ ���
            return pageSize * (pageNumber - 1) + index + 1; // ����ÿ������ţ�
        }
    }, {
        title : 'Ӧ������',
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
        title : '����',
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
        title : '�ؼ���',
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
        title : '����',
        class : 'w5',
        field : 'published',
        align : 'center',
        valign : 'middle',
        sortable : false,
        formatter: function(value, row, index){
            if(value == 1)
                return "<span class=\"label label-warning\">����</span>";
            else
                return "<span class=\"label label-info\">ͣ��</span>";
        }
    }, {
        title : '������',
        class : 'w5',
        field : 'createUserId',
        align : 'center',
        valign : 'middle',
        sortable : false
    }, {
        title : '����ʱ��',
        class : 'w10',
        field : 'createTime',
        align : 'center',
        valign : 'middle',
        sortable : false
    },{
        title : '�޸���',
        class : 'w5',
        field : 'modifyUserId',
        align : 'center',
        valign : 'middle',
        sortable : false
    }, {
        title : '�޸�ʱ��',
        class : 'w10',
        field : 'modifyTime',
        align : 'center',
        valign : 'middle',
        sortable : false
    }, {
        title : '����',
        class : 'w8',
        align : 'center',
        halign : 'center',
        valign : 'middle',
        sortable : false,
        events: rowEvents,
        formatter: function(){
            return [
                '<div class="btn-group">',
                '<button class=\"editOfRow btn btn-primary btn-sm\"><span class="glyphicon glyphicon-edit"></span> �༭</button>',
                '<button class=\"deleteOfRow btn btn-danger btn-sm\"><span class="glyphicon glyphicon-remove"></span></button>',
                '</div>'
            ].join('');
        }
    } ];
    return columns;
}

// �ڵ� - ��
function nodeColumns(){
    return [{
        field: 'nodeOrder',
        title: '���',
        halign: 'center',
        align: 'center',
        class: 'w8'
    },{
        field: 'nodeName_',
        title: '�ڵ�����',
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

// �ڵ��ӱ� - ��
function nodeDetailColumns(){
    return [{
        field: 'id',
        title: '���',
        halign: 'center',
        valign: 'middle',
        align: 'center',
        class: 'w10'
    },{
        field: 'detailContent', // sub - sub - table
        title: '��Ŀ����',
        halign: 'center',
        align: 'left',
        class: 'w50'
    },{
        field: 'needConfirm',
        title: '����ȷ��',
        halign: 'center',
        valign: 'middle',
        align: 'center',
        class: 'w10',
        formatter: function(value, row, index){
            if(value == 1)
                return "<span class=\"label label-warning\">����ȷ��</span>";
            else
                return "";
        }
    },{
        field: 'confirmDeptId',
        title: '����ȷ�ϲ��ţ���λ��',
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
        title: '��һ�ڵ�',
        halign: 'center',
        valign: 'middle',
        align: 'center',
        class: 'w20'
    }];
}
// �ڵ��ӱ� - data
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
            
            // ����ϲ���Ԫ��
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

// ˫�������л�
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

// ��ȡ�ڵ��ļ�¼������չ�����к�˫��ǰִ�У���ȡ�����������
function getNodeRecordCount(){
    if(exStatus.length == 0){
        var dc = $("#table_node").bootstrapTable('getData').length;
        for(var i=0;i<dc;i++)
            exStatus[i] = 0;
    };
}
//�ϲ���Ԫ��
function mergeTable(table, rownum, field, rows, cols){
 table.bootstrapTable('mergeCells', {
     index: rownum,      // ������[0-n]
     field: field,       // �ֶ���
     rowspan: rows,      // �ϲ�������
     colspan: cols       // �ϲ�������
 });
}
