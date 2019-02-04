import { combineReducers } from "redux";
import songs from "./songs";
import currentUser from "./currentUser";
import users from "./users";
import moods from "./moods";
import ecstaticSongs from "./ecstaticSongs";
import contentSongs from "./contentSongs";
import sadSongs from "./sadSongs";
import currentMood from "./currentMood";
import deviceId from "./deviceId";
import audioPlayer from "./audioPlayer";
import currentPlaylistUri from "./currentPlaylistUri";
import currentGenres from "./currentGenres";
import moodLists from "./moodLists";
import currentVibelist from "./currentVibelist";
import currentMoods from "./currentMoods";
import playlistSaved from "./playlistSaved";
import playlist from "./playlist";

export default combineReducers({
  songs,
  users,
  currentUser,
  moods,
  ecstaticSongs,
  contentSongs,
  sadSongs,
  currentMood,
  deviceId,
  audioPlayer,
  currentPlaylistUri,
  currentGenres,
  moodLists,
  playlist,
  currentVibelist,
  currentMoods,
  playlistSaved
});
