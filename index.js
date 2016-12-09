const express = require('express');
const bodyParser = require('body-parser');
const cp = require('child_process');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/app-data', function(req, res, next) {
  console.log('got POST request at /app-data with req.body:', req.body);

  //TODO(evan): Change this to be the correct command.
  //const cmd = `./make-new-app.sh ${githubURL} ${subdomain} ${userId}`;

  //TODO(evan): Uncomment when cmd is correct.
  //cp.exec(cmd, (err, stdout, stderr) => {
  //  console.log('err', err);
  //  console.log('stdout', stdout);
  //  console.log('stderr', stderr);
  //
  //  // TODO(Evan): Do something with `stdout` to get necessary data.

  //  res.send(200);
  //});
});

app.post('/new-app', function(req, res, next) {
  console.log('got POST request at /new-app with req.body:', req.body);

  const githubURL = req.body.githubURL;
  const subdomain = req.body.subdomain;
  const userId = req.body.userId;

  const cmd = './make-new-app.sh' + ' ' + githubURL + ' ' + subdomain + ' ' + userId;

  cp.exec(cmd, function(err, stdout, stderr) {
    console.log('./make-new-app.sh finished');

    console.log('err', err);
    console.log('stdout', stdout);
    console.log('stderr', stderr);

    res.send(200);
  });
});

app.listen(3000);
