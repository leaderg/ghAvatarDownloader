var request = require('request');
var api = require('./api-key');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var output = "";
  var url = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + api.GITHUB_TOKEN
    }
  };

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
      callback(getAvatars(JSON.parse(output)), "./images");
    });
};

//Goes through API JSON to find Avatar URLs and returns as an array.
function getAvatars(input) {
  let output = [];
  input.forEach(element => {
    output.push(element.avatar_url);
  });
  return output;
}

//Takes an array of URLs pointing towards jpg files and downloads them to a designated folder.
function downloadImageByURL(url, filepath) {
  for (var i = 0; i < url.length; i++){
        request.get(url[i])               // Note 1
         .on('error', function (err) {                                   // Note 2
           throw err;
         }).on('end', () => {
          console.log(`Finished Downloading Image`)
         })
         .pipe(fs.createWriteStream(`${filepath}/img${i}.jpg`));
  }}

getRepoContributors('jquery', 'jquery', downloadImageByURL);