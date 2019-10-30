require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs")
const spotifyAPI = require("node-spotify-api")
// var spotifyKeys = new Spotify(keys.spotify);
var divider = "\n------------------------------------------------------------\n\n"


//BandsInTown
var bandEvent = function (artist) {
    
    var artist = process.argv.slice(3).join(" ");
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function(response) {
        var jsonData = response.data;
        console.log(response.data[0])

        var eventData = [
            "Venue Name: " + jsonData.name,
            "Venue Location: " + jsonData.location,
            "Event Date: " + jsonData.date
            ].join("\n\n");

            fs.appendFile("random.txt", eventData + divider, function(err) {
                if (err) throw err;
                console.log(eventData)
            })
    });
} 



var band = new bandEvent();

