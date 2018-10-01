import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import GenreSelectDialog from './GenreSelectDialog';
import SelectedGenresList from './SelectedGenresList';
import * as actions from '../actions'


class MoodEmojiSelector extends React.Component {




  handleSubmit = (mood) => {
    const token = localStorage.getItem('jwt');

    if (this.props.genreOne !== undefined && this.props.genreTwo !== undefined && this.props.genreThree !== undefined ){
      window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne + "&genretwo=" + this.props.genreTwo + "&genrethree=" + this.props.genreThree
    }
    else if (this.props.genreOne !== undefined && this.props.genreTwo !== undefined && this.props.genreThree === undefined) {
      window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne + "&genretwo=" + this.props.genreTwo
    }

    else if (this.props.genreOne !== undefined && this.props.genreTwo === undefined && this.props.genreThree === undefined ) {
      window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne
    }
    else if (this.props.genreOne !== undefined && this.props.genreTwo === undefined && this.props.genreThree !== undefined) {
        window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne + "&genrethree=" + this.props.genreThree
    }
    else if (this.props.genreOne === undefined && this.props.genreTwo !== undefined && this.props.genreThree !== undefined) {
        window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token + "&genretwo=" + this.props.genreTwo + "&genrethree=" + this.props.genreThree
    }
    else if (this.props.genreOne === undefined && this.props.genreTwo !== undefined && this.props.genreThree === undefined) {
        window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token + "&genretwo=" + this.props.genreTwo
    }
    else if (this.props.genreOne === undefined && this.props.genreTwo === undefined && this.props.genreThree !== undefined) {

        window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token + "&genrethree=" + this.props.genreThree
    }
    else {
      window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token
    }

  }

  handleSubmitNoRefresh = (mood) => {
    this.props.fetchMoodSearch(mood)
  }

  render(){
    return (
      <div className="mood-selector-container">

        <GenreSelectDialog />
        <SelectedGenresList />
        <h4>Choose a Mood:</h4>
        <div className="mood-emoji-container">
        <img onClick={() => this.handleSubmit('sad')} alt="" src="/images/emojis/sad-2.png"/>
        <img onClick={() => this.handleSubmit('content')} alt="" src="/images/emojis/content-2.png"/>
        <img onClick={() => this.handleSubmit('ecstatic')} alt="" src="/images/emojis/ecstatic-2.png"/>
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

export default withAuth(connect(mapStateToProps, actions)(MoodEmojiSelector));
