require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment")
const fs = require("fs")
const Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var divider = "\n------------------------------------------------------------\n\n"


//BandsInTown
var bandEvent = function (artist) {
    
    var artist = process.argv.slice(3).join(" ");
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

var band = new bandEvent();

//Spotify
var spotifySearch = function (song) {

    var song = process.argv.slice(3).join(" ")
   
    spotify.search({type: "track", query: song, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        var jsonData = (data.tracks.items[0])
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

var song = new spotifySearch();


