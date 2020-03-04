var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; // url.parse: url을 분석한다, url에 넣어준 값 가져오기
    console. log(_url);
    console.log('id: '+queryData.id);// url중 id 값을 가져온다.
    var title = queryData.id;
    if(request.url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
    	response.writeHead(404);
    	response.end();
    	return;
    }
    response.writeHead(200);
    //response.end(fs.readFileSync(__dirname + _url));// 사용자가 접속한 url에 따라서 해당 파일을 읽어줌
    //console.log(__dirname + _url);
    fs.readFile(`data/${queryData.id}`,'utf8',function(err,data){
    	 var template = `
    	        <!doctype html>
    	        <html>
    	        <head>
    	          <title>WEB-${title}</title>
    	          <meta charset="utf-8">
    	        </head>
    	        <body>
    	          <h1><a href="/">WEB</a></h1>
    	          <ul>
    	            <li><a href="/?id=html">HTML</a></li>
    	            <li><a href="/?id=css">CSS</a></li>
    	            <li><a href="/?id=javascript">JavaScript</a></li>
    	          </ul>
    	          <h2>${title}</h2> 	//url의 id 값을 title로 사용
    	           </p>${data}</p>		//파일을 읽어서 나온 데이터를 사용
    	        </body>
    	        </html>
    	        `;
    	        response.end(template);
    	
    	
    })
    
    //__dirname = C:\Users\OWNER\workspace-node.js\chap01
    //url = index.html , 1.html, 2.html, 3.html
 
});
app.listen(3000); // port 번호 : 3000
				  // localhost:3000

// http://localhost:3000/main?id=HTML&page=12
// protocol://host(domain):port/path?query string