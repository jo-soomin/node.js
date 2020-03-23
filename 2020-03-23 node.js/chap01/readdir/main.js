var testFolder = '../data'; 
var fs = require('fs');

fs.readdir(testFolder, function(err, filelist){// fs.readdir : 디렉토리 내의 파일 읽기
	console.log(filelist);
})