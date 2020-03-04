var fs = require('fs'); // fs: node.js의 모듈인 filesystem의 약자.
fs.readFile('sample.txt', 'utf8', function(err, data){
  console.log(data);
 
});


//fs.readFile(path, [ options], callback) -- 파일 읽기
// -> callback에는 err,data 두 개의 인수가 전달 된다.
// -> path : 파일의 이름
// -> err : 에러
// -> data : 파일의 내용
// [options] : 인코딩