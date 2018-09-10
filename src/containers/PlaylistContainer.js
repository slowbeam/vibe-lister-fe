import React, { Component } from 'react';
import { connect } from 'react-redux'
import SongCard from '../components/SongCard'
import SavePlaylistButton from '../components/SavePlaylistButton'
import withAuth from '../hocs/withAuth';
import { setCurrentMood } from '../actions/currentMood'
import uuid from 'uuid';


class PlaylistContainer extends Component {

  pullMoodFromUrl = (url) => {
    const moodWords = url.split("/")[3].split("-")
    const mood = moodWords[1]
    this.props.setCurrentMood(mood)
  }

  componentDidMount(){
    this.pullMoodFromUrl(window.location.href)
  }

  renderEmoji = () => {
    switch(this.props.currentMood) {
      case 'sad':
        return <img alt="" src="/images/emojis/sad-2.png"/>
      case 'content':
        return <img alt="" src="/images/emojis/content-2.png"/>
      case 'ecstatic':
        return <img alt="" src="/images/emojis/ecstatic-2.png"/>
      default:
        return
    }
  }

  renderAllSongs = () => {
    switch(this.props.currentMood) {
      case 'sad':
        const lastSadList = this.props.sadLists[this.props.sadLists.length - 1]
        if (lastSadList) {
          return lastSadList.map(song =>  <SongCard key={uuid()} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} />)
        }
      break;
      case 'content':
          const lastContentList = this.props.contentLists[this.props.contentLists.length - 1]
          if (lastContentList) {
            return lastContentList.map(song => <SongCard key={uuid()} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} />)
          }
        break;
      case 'ecstatic':
        const lastEcstaticList = this.props.ecstaticLists[this.props.ecstaticLists.length - 1]
        if (lastEcstaticList){
          return lastEcstaticList.map(song => <SongCard key={uuid()} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} />)
        }
        break;
      default:
        return <div></div>
    }
  }

  render() {
    return (
        <div className="section playlist-container">
          {this.renderEmoji()}
          <SavePlaylistButton />
          <div className="song-card-container">
          {this.renderAllSongs()}
          </div>
          {console.log("CONTENT LISTS", this.props.contentLists)}
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sadLists: state.moodLists.sadLists,
    contentLists: state.moodLists.contentLists,
    ecstaticLists: state.moodLists.ecstaticLists,
    currentMood: state.currentMood
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentMood: (mood) => dispatch(setCurrentMood(mood))
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer))
