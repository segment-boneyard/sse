var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
  if (req.url == '/updates') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    
    res.write('data: foo\n\n');
    setTimeout(function(){
      res.write('data: bar\n\n');
      setTimeout(function(){
        res.end('data: quit\n\n');
      }, 1000);
    }, 1000);
  } else {
    if (req.url == '/') req.url = '/example.html';
    var file = fs.createReadStream(req.url.slice(1));
    file.on('error', res.end.bind(res, 'oops', null));
    file.pipe(res);
  }
}).listen(8774, function(){
  console.log('open http://localhost:8774');
});