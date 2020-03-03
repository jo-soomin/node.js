var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){ // 첫 실행시 url = '/'
      url = '/index.html';
    }
    if(url == '/favicon.ico'){
    	response.writeHead(404);
    	response.end();
    	return;
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));// 사용자가 접속한 url에 따라서 해당 파일을 읽어줌
    //__dirname == C:\Users\OWNER\workspace-node.js\chap01
    //url == index.html, 1.html, 2.html, 3.html
 
});
app.listen(3000); // 포트 번호
				  //localhost:3000