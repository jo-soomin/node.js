var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring'); // url을 통해 넘어온 데이터를 가져오기 위한 node.js 모듈
// 객체 :  서로 연관된 데이터와 그 데이터를 처리하는 방법인 함수를 그룹핑해서 코드의 복잡성을 낮추는 수납상자
//refactoring --> 동작방식은 유지하면서 내부의 코드를 효율적으로 바꾸는 행위 
var template = require('./lib/template.js');

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
    	if(queryData.id === undefined){ // undifned : 정의되지 않은 데이터 -> query String에 id 가 없다면 --> home
    		    		
    		fs.readdir('./data', function(error, filelist){
    			
    			var title = 'Welcome';
            	var data = 'Hello, Node.js';
            	/*
            	var list = templateList(filelist); // list를 함수로 처리
               	var template = templateHTML(title, list,
               			`<h2>${title}</h2>${data}`,	 // data 값
               			`<a href="/create">create</a>` // control 값
               			); // 함수 처리
               	 		response.writeHead(200);//writeHead(200) : 파일을 성공적으로 전송했다.
               	        response.end(template);
    			  */ 
            	var list = template.list(filelist); // list를 함수로 처리
               	var html = template.html(title, list,
               			`<h2>${title}</h2>${data}`,	 // data 값
               			`<a href="/create">create</a>` // control 값
               			); // 함수 처리
               	 		response.writeHead(200);//writeHead(200) : 파일을 성공적으로 전송했다.
               	        response.end(html);
    		});
    		           
    	}else{
    		fs.readdir('./data', function(error, filelist){
    			
    			var list = template.list(filelist); // list를 함수로 처리한다.
            	
    			fs.readFile(`data/${queryData.id}`,'utf8',function(err,data){
    			var title = queryData.id;
    			var html = template.html(title, list, 
               			`<h2>${title}</h2>${data}`,	 // data 값
               			`<a href="/create">create</a> <a href="/update?id=${title}">update</a> 
               			<form action="delete_process" method="post">
               				<input type="hidden" name="id" value="${title}">
               				<input type="submit" value="delete">
               			</form>` // control 값
               			
               			
    			); // 함수 처리
        	  		response.writeHead(200);//writeHead(200) : 파일을 성공적으로 전송했다.
        	        response.end(html);
          });
    	});
    	}
    	
    	
    }else if(pathname ==='/create'){
    	fs.readdir('./data', function(error, filelist){
			
			var title = 'WEB - create';
        	var list = template.list(filelist); // list를 함수로 처리
           	var html = template.html(title, list, `
           	<form action="/create_process" method="post">
           			<p><input type="text" name="title" placeholder="title"></p>
           			<p>
           			<textarea name="description" placeholder="textarea"></textarea>
           			</p>
           			<p>
           			<input type="submit" value="클릭">
           			</p>
           			</form>
           	`,``); // 함수 처리
           	 		response.writeHead(200);//writeHead(200) : 파일을 성공적으로 전송했다.
           	        response.end(html);
			    			
		});
    	
    	
    }else if(pathname==='/create_process'){
    	var body = '';
    	request.on('data', function(data){	// post방식으로 전송된 데이터가 많을 경우를 대비해서 node.js 에서 data를 받아올때마다 callback 함수를 호출하는 방식
    		body = body+data;
    	});
    	request.on('end', function(){ // post방식으로 전송된 데이터가 더이상 없을 경우 호출
    		var post = qs.parse(body); // 넘어온 데이터를 json 타입{key:value}으로 바꿔줌 
    								   //ex) { title: '제목', description: '내용' }
    		var title = post.title; // 받아온 데이터 중 title의 value를 출력한다.
    		var description = post.description;	// 받아온 데이터 중 description의 value를 출력한다.
    		fs.writeFile(`data/${title}`, description, 'utf-8', function(err){ // fs.writeFile(`생성할 파일 이름`, 내용, 옵션, callback) --> 파일 생성하기
    			//response.writeHead(200);//writeHead(200) : 파일을 성공적으로 전송했다.
    			response.writeHead(302, {Location: `/?id=${title}`});// 302 : 페이지를 다른 곳으로 redirect 해라 
    	        response.end();
    		})
    	});
    	
    		    	
    }else if(pathname === '/update'){
    	fs.readdir('./data', function(error, filelist){
			
			var list = template.list(filelist); // list를 함수로 처리한다.
        	
			fs.readFile(`data/${queryData.id}`,'utf8',function(err,data){
			var title = queryData.id;
			var html = template.html(title, list, 
           			`
           			<form action="update_process" method="post">
           			<input type = "hidden" name = "id" value = "${title}"
           			<p><input type="text" name="title" placeholder="title" value="${title}"></p>
           			<p>
           			<textarea name="description" placeholder="textarea">${data}</textarea>
           			</p>
           			<p>
           			<input type="submit" value="클릭">
           			</p>
           			</form>
           			
           			`,	 // data 값
           			`<a href="/create">create</a> <a href="/update?id=${title}">update</a>` // control 값
			); // 함수 처리
    	  		response.writeHead(200);//writeHead(200) : 파일을 성공적으로 전송했다.
    	        response.end(html);
      });
	});
    }else if(pathname === '/update_process'){ // form 태그를 통해 받아온 데이터를 이용하여 파일의 이름과 내용을 수정
    	var body = '';
    	request.on('data', function(data){	// post방식으로 전송된 데이터가 많을 경우를 대비해서 node.js 에서 data를 받아올때마다 callback 함수를 호출하는 방식
    		body = body+data;
    	});
    	request.on('end', function(){ // post방식으로 전송된 데이터가 더이상 없을 경우 호출
    		var post = qs.parse(body); // 넘어온 데이터를 json 타입{key:value}으로 바꿔줌 
    								   //ex) { title: '제목', description: '내용' }
    		var id = post.id;
    		var title = post.title; // 받아온 데이터 중 title의 value를 출력한다.
    		var description = post.description;	// 받아온 데이터 중 description의 value를 출력한다.
    		fs.rename(`data/${id}`,`data/${title}`, function(error){// fs.rename : 파일 이름 바꾸기 fs.rename(`old path`,`new path`, function(error)
    			 fs.writeFile(`data/${title}`, description, 'utf-8', function(err){ // fs.writeFile(`생성할 파일 이름`, 내용, 옵션, callback) --> 파일 생성하기
    	    			//response.writeHead(200);//writeHead(200) : 파일을 성공적으로 전송했다.
    	    			response.writeHead(302, {Location: `/?id=${title}`});// 302 : 페이지를 다른 곳으로 redirect 해라 
    	    	        response.end();
    	    		})
    			})
       	});
    	
    }else if(pathname === '/delete_process'){ // 삭제
    	var body = '';
    	request.on('data', function(data){	
    		body = body+data;
    	});
    	request.on('end', function(){
    		var post = qs.parse(body);
    		var id = post.id;
    		
    		fs.unlink(`data/${id}`, function(err){ // fs.unlink : (`삭제할 파일`, callback)
        		console.log(err);
        	})
        	response.writeHead(302, {Location: `/`});// 302 : 페이지를 다른 곳으로 redirect 해라 
            response.end();
        	
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