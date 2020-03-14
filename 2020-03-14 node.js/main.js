var http = require('http');
var fs = require('fs');
var url = require('url');
function templateHTML(title, list, data){ // html을 넣어주기 위한 함수
	return `
       <!doctype html>
       <html>
       <head>
         <title>WEB-${title}</title>
         <meta charset="utf-8">
       </head>
       <body>
         <h1><a href="/">WEB</a></h1>
        ${list}
        <a href="/create">create</a>
         <h2>${title}</h2> 	
          </p>${data}</p>		
       </body>
       </html>
       `;
	}
function templateList(filelist){ // list를 넣어주기위한 함수
	var list = '<ul>';
	var i =0;
	while(i < filelist.length){
		 list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
         i = i + 1; 
	}
	
	list = list +'</ul>';
	return list;
	
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; // url.parse: url을 분석한다, url에 넣어준 값 가져오기
    console. log(_url);
    console.log('id: '+queryData.id);// url중 id 값을 가져온다.
    var pathname = url.parse(_url, true).pathname;
    console.log('pathname: ' +pathname);    
      
    //response.end(fs.readFileSync(__dirname + _url));// 사용자가 접속한 url에 따라서 해당 파일을 읽어줌
    //console.log(__dirname + _url);
    if(pathname ==='/'){
    	if(queryData.id === undefined){ // undifned : 정의되지 않은 데이터 -> query String에 id 가 없다면
    		    		
    		fs.readdir('./data', function(error, filelist){
    			
    			var title = 'Welcome';
            	var data = 'Hello, Node.js';
            	var list = templateList(filelist); // list를 함수로 처리
               	var template = templateHTML(title, list, data); // 함수 처리
               	 		response.writeHead(200);//writeHead(200) : 파일을 성공적으로 전송했다.
               	        response.end(template);
    			    			
    		});
    		           
    	}else{
    		fs.readdir('./data', function(error, filelist){
    			
    			var list = templateList(filelist); // list를 함수로 처리한다.
            	
    			fs.readFile(`data/${queryData.id}`,'utf8',function(err,data){
    			var title = queryData.id;
    			var template = templateHTML(title, list, data); // 함수 처리
        	  		response.writeHead(200);//writeHead(200) : 파일을 성공적으로 전송했다.
        	        response.end(template);
          });
    	});
    	}
    	
    	
    }else if(pathname ==='/create'){
    	fs.readdir('./data', function(error, filelist){
			
			var title = 'WEB - create';
        	var data = 'Hello, Node.js';
        	var list = templateList(filelist); // list를 함수로 처리
           	var template = templateHTML(title, list, `
           	<form action="http://localhost:3000/process_create" method="post">
           			<p><input type="text" name="title" placeholder="title"></p>
           			<p>
           			<textarea name="description" placeholder="textarea"></textarea>
           			</p>
           			<p>
           			<input type="submit">
           			</p>
           			</form>
           	`); // 함수 처리
           	 		response.writeHead(200);//writeHead(200) : 파일을 성공적으로 전송했다.
           	        response.end(template);
			    			
		});
    	
    	
    }else{
    	response.writeHead(404); //writeHead(404) : 파일을 찾지 못했다.
    	response.end('Not Found');
    }
    
   
    
    //__dirname = C:\Users\OWNER\workspace-node.js\chap01
    //url = index.html , 1.html, 2.html, 3.html
 
});

app.listen(3000); // port 번호 : 3000
				  // localhost:3000

// http://localhost:3000/main?id=HTML&page=12
// protocol://host(domain):port/path?query string