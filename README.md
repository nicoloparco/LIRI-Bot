# LIRI-bot
Node js drive application
Takes in user input through the command line
Allows user to access 3 different API'S : Spotify, BandsInTown, and OMBD
Returns related information based on which API is accessed 
Prints the information in the random.txt document as well as in the command line interface

Directions for use
To use this app you must begin every query with node liri.js followed by your query
The three different queries are:

1) concert-this followed by a band/artists name. This query will return concert information including country, city, venue, date, and time. Information is from BandsInTown API.
ex. node liri.js concert-this ozzy osbourne
If the artist is not touring or does not have any concerts available, no information will be returned

2) spotify-this-song followed by the name of the song. This query will return information about the song and artist. Information is from Spotify API.
ex. node liri.js spotify-this-song when the levee breaks

3) movie-this followed by the name of the movie. This query will return a variety of informatiuon about the movie. Information is from OMDB API.