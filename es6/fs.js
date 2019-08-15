const fs = require('fs');

var options = {
	encoding: 'utf-8',
	withFileTypes: true
}

//console.log(typeof(options));

fs.readdir('D:\\workspace0\\jee_kysc_zzd\\src\\main\\java\\com\\enter\\net\\fhbusiness', 
	//options,
	function(err, fs){
	if(err){
		console.log(err);
	}else{
		test(fs);
	}
});

function test(fs){

	console.log(typeof(fs));

	console.log(fs.length);

	console.log(fs);

	console.log(fs.web);
}
