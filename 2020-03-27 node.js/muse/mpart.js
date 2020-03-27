var M = {
		v:'v',
		f:function(){
			console.log(this.v);
		}
}

module.exports = M; // 모듈이 담겨있는 mpart.js 파일의 M의 객체들을 외부에서 사용하겠다.
