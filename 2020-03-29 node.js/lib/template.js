module.exports ={//template 객체 생성 
		html:function(title, list, data,control){ // html을 넣어주기 위한 함수
			return `
		       <!doctype html>
		       <html>
		       <head>
		         <title>WEB1-${title}</title>
		         <meta charset="utf-8">
		       </head>
		       <body>
		         <h1><a href="/">WEB</a></h1>
		        ${list}
		        ${control} // update 태그를 추가하기 위한 값
		        ${data}
		        </body>
		       </html>
		       `;
			},
		list:function(filelist){ // list를 넣어주기위한 함수
				var list = '<ul>';
				var i =0;
				while(i < filelist.length){
					 list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
			         i = i + 1; 
				}
				
				list = list +'</ul>';
				return list;
				
			}
		
}
