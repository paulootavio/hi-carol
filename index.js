const express = require('express');
var request = require('request');
const app = express();
const port = 3000;
const urlGitHub = 'https://api.github.com/users/username/repos'

var options = {
    host: 'api.github.com',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/users/repos/count', function(req, res) {

    var endpoint = urlGitHub.replace('username', req.query.userName)

    request(endpoint,options, function (error, response, body) {
       
      if (!error && response.statusCode == 200) {
          var repos = JSON.parse(body);
          var languagesCountDict = CountLanguages(repos)

          if(Object.keys(languagesCountDict).length == 0)
            res.send('Repositories Not Found');

          for (const [key, value] of Object.entries(languagesCountDict)) {           
            if(key != 'null')
            console.log(key, value);
          }
          
          res.send('OK');
        }

        res.send(response.body);
        res.statusCode = 400;
      })
});

function   CountLanguages(repos) {
    var countLanguages = {};

    for (var i in repos) {
        var repo = repos[i];
        countLanguages[repo.language] = countLanguages[repo.language] ? countLanguages[repo.language] + 1 : 1;
    }
    return  countLanguages
};