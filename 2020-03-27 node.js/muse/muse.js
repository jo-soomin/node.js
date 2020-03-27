
var part = require('./mpart.js'); // 모듈을 export한 파일
console.log(part); // { v: 'v', f: [Function: f] } 형태로 나옴
part.f();