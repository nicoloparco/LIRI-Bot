require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment")
const fs = require("fs")
const spotifyAPI = require("node-spotify-api")
// var spotifyKeys = new Spotify(keys.spotify);
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

