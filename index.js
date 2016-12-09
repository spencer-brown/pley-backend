const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send('hello world');
});

app.post('/new-app', function(req, res, next) {
  console.log('req.body', req.body);
  res.send(200);
});

app.listen(3000);


// const cp = require('child_process');
// 
// const githubURL = 'https://github.com/spencer-brown/pley-proxy';
// const subdomain = 'my-subdomain';
// const userId = 'meowcat';
// 
// const cmd = `./foobar.sh ${githubURL} ${subdomain} ${userId}`;
// 
// cp.exec(cmd, (err, stdout, stderr) => {
//   console.log('err', err);
//   console.log('stdout', stdout);
//   console.log('stderr', stderr);
// });
