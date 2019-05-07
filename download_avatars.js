var request = require('request');
var api = require('./api-key');
var fs = require('fs');

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
      getAvatars(JSON.parse(output));
    });
};

function getAvatars(input) {
  let output = [];
  input.forEach(element => {
    output.push(element.avatar_url);
  });
  return output;
}

function downloadImageByURL(url, filepath) {
  for (var i = 0; i < url.length; i++){
        request.get(url[i])               // Note 1
         .on('error', function (err) {                                   // Note 2
           throw err;
         }).on('end', () => {
          console.log(`Finished Downloading Image`)
         })
         .pipe(fs.createWriteStream(`${filepath}/img${i}`));
  }}
// getRepoContributors('jquery', 'jquery');
downloadImageByURL(['https://avatars1.githubusercontent.com/u/86454?v=4',
  'https://avatars1.githubusercontent.com/u/81942?v=4',
  'https://avatars1.githubusercontent.com/u/43004?v=4' ]
, './images');