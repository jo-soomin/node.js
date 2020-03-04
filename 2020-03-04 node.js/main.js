var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; // url.parse: url을 분석한다, url에 넣어준 값 가져오기
    											 //qeuryData.id = url중 id 값을 가져온다.
    console. log(_url);
    console.log('id: '+queryData.id);
    var title = queryData.id;
    if(request.url == '/'){
      _url= 'index.html';
    }
    if(_url == '/favicon.ico'){
    	response.writeHead(404);
    	response.end();
    	return;
    }
    response.writeHead(200);
    response.end(queryData.id);// id값 화면에 보여주기
    
    
  
 
});
app.listen(3000); // port 번호 : 3000
				  // localhost:3000


// http://localhost:3000/main?id=HTML&page=12
//protocol://host(domain):port/path?query string