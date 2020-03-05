var args = process.argv;
console.log(args[4]);
// cmd(콘솔) 창에서 node 실행 시 실행할 파일이름 뒤에 값을 주면 입력값이 됨
// ex> node main.js jo soo min 입력하면 jo, soo, min은 입력 값 처리 됨
// args[0] : node.js runtime이 어디에 위치하는지에 대한 정보
// args[1] : 실행시킨 파일의 위치
// args[2] : 여기부터는 차례대로 입력 해준 값
// ex> node main.js jo soo min 입력하면 arrgs[2] : jo, arrgs[3] : soo, arrgs[4] : min
if(args[2]==='1'){ // == 1 : 숫자 1, === '1' : 문자 1
	console.log('true다');
}else{
	console.log('false다');
}
