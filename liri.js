require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment")
const fs = require("fs")
const Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var divider = "\n------------------------------------------------------------\n\n"
var command = process.argv[2]
var search = process.argv.slice(3).join(" ")


//BandsInTown
function bandsSearch (artist) {
    
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function(response) {
        var jsonData = (response.data);
        

        for (var i=0; i < jsonData.length; i++){
            
            var venueName = jsonData[i].venue.name;
            var venueCity = jsonData[i].venue.city;
            var venueCountry = jsonData[i].venue.country
            var eventTime = jsonData[i].datetime
            var convertedDate = moment(eventTime).format()

            var eventData = [
                "Artist Name: " + artist,
                "Event Number: " + i,
                "Venue Name: " + venueName,
                "Venue City: " + venueCity,
                "Venue Country: " + venueCountry,
                "Event Date and Time: " + convertedDate
                ].join("\n\n");
            
                console.log(eventData)

                fs.appendFile("random.txt", eventData + divider, function(err) {
                    if (err) throw err;
                })
        }

    });
} 


//Spotify
function spotifySearch (song) {

   
    spotify.search({type: "track", query: song}, function(err, response) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        var jsonData = (response.tracks.items[0])
        var songName = jsonData.name
        var artistsName = jsonData.artists[0].name
        var albumName = jsonData.album.name
        var spotifyLink = jsonData.preview_url

        var songData = [
            "Song Name: " + songName,
            "Artist Name: " + artistsName,
            "Album Name: " + albumName,
            "Spotify Link:  " + spotifyLink
        ].join("\n\n");
        
        console.log(songData)

        fs.appendFile("random.txt", songData + divider, function(err) {
            if (err) throw err
        })

    })
    
}


//OMDB API
function movieSearch (movie) {

    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie

    axios.get(URL).then(function (response) {
       
        var jsonData = response.data

        var movieTitle = jsonData.Title
        var movieYear = jsonData.Released
        var movieIMDB = jsonData.Ratings[0].Value
        var movieRotten = jsonData.Ratings[1].Value
        var movieCountry = jsonData.Country
        var movieLanguage = jsonData.Language
        var moviePlot = jsonData.Plot
        var movieActors = jsonData.Actors

        var movieData = [
            "Title: " + movieTitle,
            "Year Released: " + movieYear,
            "IMDB Rating: " + movieIMDB,
            "Rotten Tomatoes Rating: " + movieRotten,
            "Country/ies: " + movieCountry,
            "Language: " + movieLanguage,
            "Plot: " + moviePlot,
            "Cast: " + movieActors
        ].join("\n\n")

        console.log(movieData)

        fs.appendFile("random.txt", movieData + divider, function(err) {
            if (err) throw err
        })
    })


}

//FS Action
function doThing () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var text = data.split(" , ")
        console.log(text[0])
        spotifySearch(text)
    })

}


switch (command) {
    case ('concert-this'):
        bandsSearch();
    break;
    case ('spotify-this-song'):
        if(search){
            spotifySearch(search);
         } else{
            spotifySearch("The Sign Ace Of Bass");
         }
    break;
    case ('movie-this'):
        if(search){
            movieSearch(search);
        } else{
            movieSearch("Mr Nobody");
        }
    break;
    case ('do-what-it-says'):
         doThing();
    break;
    default:
        console.log('Try again')
}


