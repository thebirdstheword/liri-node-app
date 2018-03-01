require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");

//OMDB
function movies() {
    var movieName = [];
    for (var i=3; i<process.argv.length; i++) {
         movieName += process.argv[i] + "+"; 
    } 
    // console.log(movieName);
    var queryUrl = "http://www.omdbapi.com/?t="+ movieName +"&y=&plot=short&apikey=1e18f2e5";

    request(queryUrl, function(error, response, body) {
        if (error) {
            console.log("error");
        }
        var response = JSON.parse(body)
        console.log(response.Title);
        console.log(response.Year);
        console.log(response.Rated);
        console.log(response.Ratings[1].Value);
        console.log(response.Country);
        console.log(response.Language);
        console.log(response.Plot);
        console.log(response.Actors);
    });
}


// twitter
function tweets() {
    client.get('statuses/user_timeline', params, function (err, tweets, response) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text)
        }
        if (err) {
            return console.log(err)
        }
    });
}
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var params = {
    screename: "tweet_ebird",
    count: 20
 }; 
    

// spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

function songs () {
    var songName = "";
    for (var i=3; i<process.argv.length; i++) {
        songName += process.argv[i] + "+"; 
    } 
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

    var track = data.tracks.items[0];    

    console.log(track.artists[0].name);
    console.log(track.name); 
    console.log(track.external_urls.spotify);
    console.log(track.album.name);
    })
}

    
    switch (process.argv[2]) {
        case "my-tweets":
            tweets()
            break;
    
        case "spotify-this-song":
            songs()
            break;
    
        case "movie-this":
            movies()
            break;
    
        case "do-what-it-says":
            doIt()
            break;
    }


// do-what-it-says

var thingToSearch

function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        console.log(data);
    
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
    
      // We will then re-display the content as an array for later use.
      console.log(dataArr);

      switch (dataArr[0]) {
        case "my-tweets":
        tweets()
        break;

        case "spotify-this-song":
        thingToSearch = dataArr[2];
        songs()
        break;

        case "movie-this":
        movies()
        break;
      }
    
});
}


