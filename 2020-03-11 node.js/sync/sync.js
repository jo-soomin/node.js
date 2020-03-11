var fs = require('fs');

//readFileSync : Sync가 붙으면 동기 -> 순차적 처리
//readFile : Sync가 없으면 비동기 -> 동시 처리
/*
console.log('a');
var result = fs.readFileSync('sample.txt', 'utf-8'); // 동기
console.log(result);
console.log('c');
--> a, b, c
*/
console.log('a');
fs.readFile('sample.txt', 'utf-8',function(err, data){ // 비동기
	console.log(data);	
}); 
console.log('c');
// --> a, c, b