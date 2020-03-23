/*
function a(){
	console.log('A');
}

a();
console.log(a);
*/

var a = function(){  // == function a()
	console.log('A');
}

function slowfunc(callback){
	callback();
}
slowfunc(a); // == A