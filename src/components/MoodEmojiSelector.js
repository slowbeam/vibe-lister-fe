import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import GenreSelectDialog from './GenreSelectDialog';
import SelectedGenresList from './SelectedGenresList'

class MoodEmojiSelector extends React.Component {




  handleSubmit = (mood) => {
    const token = localStorage.getItem('jwt');

    if (this.props.genreOne !== undefined && this.props.genreTwo !== undefined && this.props.genreThree !== undefined ){
      window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne + "&genretwo=" + this.props.genreTwo + "&genrethree=" + this.props.genreThree
    }
    else if (this.props.genreOne !== undefined && this.props.genreTwo !== undefined) {
      window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne + "&genretwo=" + this.props.genreTwo
    }
    else if (this.props.genreOne !== undefined) {
      window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne
    }



  }

  render(){
    return (
      <div className="mood-selector-container">

        <GenreSelectDialog />
        <SelectedGenresList />
        <h4>Choose a Mood:</h4>
        <br />
        <div className="mood-emoji-container">
        <img onClick={() => this.handleSubmit('sad')} alt="" src="/images/emojis/sad.png"/>
        <img onClick={() => this.handleSubmit('content')} alt="" src="/images/emojis/content.png"/>
        <img onClick={() => this.handleSubmit('ecstatic')} alt="" src="/images/emojis/ecstatic.png"/>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    genreOne: state.currentGenres.genreOne,
    genreTwo: state.currentGenres.genreTwo,
    genreThree: state.currentGenres.genreThree
  }
}

export default withAuth(connect(mapStateToProps)(MoodEmojiSelector));
