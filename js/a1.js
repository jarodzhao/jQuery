$(function() {

    var obj = {
        'wei': [2, 6],
        'tao': [1, 38],
        'ze': [9, 0],
        'bing': [4, 34],
        'yu': [202, 2]
    };

    var o = objSort2(obj);
    for(var i in o){
        console.log(i[0]);
    }
});

function objSort2(obj) {
    var arr = Object.keys(obj);
    arr.sort(function(a, b) {
        return (obj[b][0] + obj[b][1]) - (obj[a][0] + obj[a[1]]);
    });
    var obj2 = {};
    for(var i = 0;i<arr.length;i++){
        obj2[arr[i]] = obj[arr[i]];
    }
    return obj2;
}

function objSort(obj, col) {
    var arr = [];
    //遍历对象，生成数组
    for (var k in obj) {
        var s = [];
        s.push(k, obj[k]);
        arr.push(s);
    }

    // 冒泡法
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            var firstVal = arr[j].toString().split(',')[col];
            var secondVal = arr[j + 1].toString().split(',')[col];

            //console.log(firstVal + " : " + secondVal + " : " + (firstVal*1 < secondVal*1));

            if (firstVal * 1 < secondVal * 1) {
                var tmp_obj = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp_obj;
            }
        }
    }

    obj = {};

    //还原对象
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i][0]] = arr[i][1];
    }

    return obj;
}