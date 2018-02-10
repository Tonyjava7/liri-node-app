var fs = require("fs");
var request = require("request");
var dotenv = require("dotenv").config();
var keys = require("./keys.js");

//Input command from user
switch (liriInput) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("\nType any of the below commands after 'node liri.js'" +
            "\n1. my-tweets 'twitter user name'" +
            "\n2. spotify-this-song 'song name' (if song name is not a single word, enclose the song title in quotes)" +
            "\n3. movie-this 'movie name' (if movie title is not a single word, enclose the song title in quotes)" +
            "\n4. do-what-it-says")
};

//Twitter function which uses the Twitter api module
function myTweets() {
    var client = new Twitter(keys.twitter);
    var twitterUserName = process.argv[3];
    if (!twitterUserName) {
        twitterUserName = "tonychung7777";
    }
    params = { screen_name: twitterUserName };
    client.get("statuses/user_timeline/", params, function(error, data, response) {
        if (!error) {
            for (var i = 0; i < 21; i++) {
                console.log(data[i].text + "\n" +
                    data[i].created_at + "\n" + "\n-------------------------------");
            }
        } else {
            console.log(error);
            return;
        }
    })
};

//Spotify function which uses the Spotify api module
function spotifyThisSong(songName) {
    var spotify = new Spotify(keys.spotify);
    var songName = process.argv[3];
    if (!songName) {
        songName = "The Sign";
    }
    params = songName;
    spotify.search({ type: "track", query: params }, function(error, data) {
        if (!error) {
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                        console.log("Artist: " + songInfo[i].artists[0].name + "\nSong: " + songInfo[i].name + "\nPreview URL: " + songInfo[i].preview_url + "\nAlbum: " + songInfo[i].album.name + "\n-------------------------------");
                }
            }
        } else {
            console.log(err);
            return;
        }

    })

};

//Movie function which uses the OMDB api module
function movieThis() {
    if (!movie) {
        movie = "mr nobody";
    }
    params = movie;
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            console.log("Title: " + movieObject.Title + "\nYear: " + movieObject.Year + "\nIMDB Rating: " +
                movieObject.imdbRating + "\nRotten Tomatoes Rating: " + movieObject.tomatoeRating + "\nCountry: " + movieObject.Country + "\nLanguage of movie: " + movieObject.Language + "\nPlot: " + movieObject.Plot + "\nActors: " + movieObject.Actors + "\n-------------------------------");
        } else {
            console.log(error);
        }
    });

    //DoWhatItSays function reads and writes to access random.txt file.

    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (!error) {
                doWhatItSaysResults = data.split(",");
                spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
            } else {
                console.log(error);
            }
        });
    }