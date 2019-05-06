var request = require('request');
var api = require('./api-key');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName/*, callback*/) {
  var url = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + api.GITHUB_TOKEN
    }
  };

  var output = "";
  request.get(url)
    .on('error', (err) => {
      throw err;
    })
    .on('response', res => {
      console.log('Response Status Code: ', res.statusCode);
    })
    .on('data', (res) => {               // Note 3
      output += res;
    })
    .on('end', () => {
      console.log('data transfer complete!');
      console.log(JSON.parse(output));
    });
};

getRepoContributors('jquery', 'jquery');