// 根据对象属性进行内部排序
var obj = {
    'wei': [100, 6],
    'tao': [-9, 38],
    'ze': [8, 0],
    'bing': [6, 34],
    'yu': [9, 2],
};

var arr = Object.keys(obj);
arr.sort(function(a, b) {
    return ((obj[b][0] + obj[b][1]) - (obj[a][0] + obj[a][1]));
});

var obj2 = {};
for (var i = 0; i < arr.length; i++) {
    obj2[arr[i]] = obj[arr[i]];
}

//console.log(obj2);

for(var x in obj2)
	console.log(x);
