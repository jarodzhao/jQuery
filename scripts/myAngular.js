angular.module('notesApp', [])
.controller('MainCtrl', [function(){
	var self = this;
	self.msg='zhaoht';	//控制器成员变量
	self.hello = 'abcdef';
	self.changeMsg=function(){
		console.info("It is change");
	};
	// console.log(hello);
	console.info(self.msg);
}]);

var test = function(){
	console.log(Math.round(Math.random()*100));
}