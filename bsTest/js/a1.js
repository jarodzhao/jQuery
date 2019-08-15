$(function() {
    $("#div1").draggable();
    initTable();
    $("#kal").click(function() {
        $kal2 = $("#kal2");
        console.log($kal2.val());
    });
})

function getBaidu() {
    $.ajax({
        url: 'https://www.baidu.com/',
        dataType: 'jsonp',
        type: 'get',
        success: function(data, status) {
            var html = "<tr><td colspan='5'>";
            html += status;
            html += "</td></tr>";
            $tbody.append(html);
        }
    })
}

function initTable() {
    $thead = $("#table1 thead");
    $tbody = $("#table1 tbody");
    var heads = 5;

    //表头行
    var html = "<tr>";
    for (var i = 0; i < heads; i++) {
        html += "<th>" + "表头" + "</th>"
    }
    html += "</tr>"
    $thead.append(html);

    // 表格数据行
    for (var i2 = 0; i2 < 3; i2++) {

        html = "<tr>";

        for (var j = 0; j < heads; j++)
            html += "<td>-</td>"
        html += "</tr>";

        $tbody.append(html);
    }
}