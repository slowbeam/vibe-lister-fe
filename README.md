# vibelist
> Javascript & react front end to vibelist, an application for creating Spotify playlists in the genre & mood of the user's choice. 

Vibelist is powered by the Spotify web API and the Spotify Web Player SDK to provide the user with an elegant, fun and useful tool for creating Spotify playlists in a certain mood and genre. Users can log in through Spotify's 3rd party authorization and create multiple playlists, listen to them in the browser and save them to their Spotify account for later use.

Back end Ruby on Rails API repo available here: https://github.com/slowbeam/vibe-list-server

##

![vibelist demo 1](https://media.giphy.com/media/41ey7D0UVpOibdPVEt/giphy.gif)

## Installation

OS X & Linux:

```sh
npm install
```

## Usage example

Vibelist can create dynamic playlists through the user's selection of up to 3 genres and a mood:

![vibelist demo 2](https://media.giphy.com/media/WvvtNtiefZGD1I74aP/giphy.gif)

Vibelist can play individual songs, or full playlists created with the app in the browser:

![vibelist demo 3](https://media.giphy.com/media/2uInVFNC4m77q6Lrge/giphy.gif)

Vibelist can save playlists to your Spotify account:

![vibelist demo 4](https://media.giphy.com/media/1yLmZ4mGhpFxkm9SG9/giphy.gif)

## Development setup

vibelist uses the npm node-sass-chokidar package to compile SCSS into CSS for React. This package is saved to the project but the npm listing can be found here: https://www.npmjs.com/package/node-sass-chokidar

```sh
npm start
npm run watch-css
```


## Release History

* 0.1.0
    * First official release
   


## Meta

Sandy Edwards – [@sedwardscode](https://twitter.com/sedwardscode) – sedwardscode@gmail.com

[https://github.com/slowbeam](https://github.com/slowbeam)

## Contributing

1. Fork it (<https://github.com/slowbeam/vibe-list-client/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
