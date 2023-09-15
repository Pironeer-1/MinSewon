import { createServer } from 'http';  // HTTP 서버 및 클라이언트 기능을 제공하는 모듈
import { readdir, readFile } from 'fs';      // 파일 시스템 관련 기능을 제공하는 모듈 (파일 읽기, 쓰기 등)
import { parse } from 'url';    // URL을 파싱하는 데 사용되는 유틸리티 모듈

// HTML 템플릿을 반환하는 함수
function templateHTML(title, list, body) {
    return `
    <!doctype html>
    <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            ${list}  <!-- 목록 템플릿 삽입 -->
            ${body}  <!-- 본문 삽입 -->
        </body>
    </html>
    `;
}

// 파일 리스트를 반환하는 함수
function templateList(filelist) {
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
    };
    list = list + '</ul>';
    return list;
}

// 웹 서버 생성
	var app = createServer(function (request, response) {
    var _url = request.url; //url모듈이랑 진짜 url 구분
    // URL을 파싱하여 쿼리 데이터와 경로 이름을 가져오기
		var queryData = parse(_url, true).query;  // URL에서 쿼리 문자열을 추출하여 객체로 변환
    var pathname = parse(_url, true).pathname; // URL에서 경로 이름을 추출
    
		// 주 경로에 대한 처리
    if (pathname === '/') {
        if (queryData.id === undefined) {  // ID 쿼리가 정의되지 않았을 때 (메인 페이지)
						//디렉토리 내의 파일 목록을 읽어오기
            readdir('./data', function (error, filelist) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
								response.writeHead(200);  // 200 상태 코드로 응답 헤더를 설정 (성공)
                response.end(template);   // 응답 본문을 설정하고 응답을 종료            
						});
        } else {  // ID 쿼리가 정의되었을 때 (특정 페이지)
            readdir('./data', function (error, filelist) {
                var list = templateList(filelist);
                // 파일을 읽고 해당 내용을 반환
                readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    var title = queryData.id;
                    var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200)
                    response.end(template);
                });
            })
        }
    } else {  // 정의되지 않은 경로에 대한 처리
        response.writeHead(404);
        response.end('Not Found');
    }
});
// 서버 시작, 3000 포트에서 수신 대기
app.listen(3000);

/*
http.createServer: HTTP 서버 객체를 생성하는 메서드입니다. 인자로 전달되는 함수는 각 요청에 대해 실행됩니다.
listen: 서버를 시작하고 주어진 포트에서 연결을 수신 대기합니다.
writeHead: 응답의 상태 코드와, 필요한 경우, 헤더 값을 설정합니다.
end: 응답 프로세스를 완료하고 선택적으로 응답 본문을 전달합니다.
fs.readdir: 지정된 경로의 파일 및 디렉토리 목록을 읽습니다.
url.parse: 주어진 URL 문자열을 URL 객체로 파싱합니다.
*/