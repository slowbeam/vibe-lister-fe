import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import GenreSelectDialog from './GenreSelectDialog';
import SelectedGenresList from './SelectedGenresList';
import * as actions from '../actions';
import { withRouter } from 'react-router';
import { compose } from 'redux';



class MoodEmojiSelector extends React.Component {


  handleSubmit = (mood) => {

    const token = localStorage.getItem('jwt');

    if (this.props.genreOne !== undefined && this.props.genreTwo !== undefined && this.props.genreThree !== undefined ){

      const fetchUrl = 'http://localhost:3000/api/v1/search-two/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne + "&genretwo=" + this.props.genreTwo + "&genrethree=" + this.props.genreThree
      this.props.fetchMoodSearch(fetchUrl);
      this.props.history.push('/current-vibelist')
    }
    else if (this.props.genreOne !== undefined && this.props.genreTwo !== undefined && this.props.genreThree === undefined) {
      const fetchUrl = 'http://localhost:3000/api/v1/search-two/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne + "&genretwo=" + this.props.genreTwo;
      this.props.fetchMoodSearch(fetchUrl);
      this.props.history.push('/current-vibelist')
    }

    else if (this.props.genreOne !== undefined && this.props.genreTwo === undefined && this.props.genreThree === undefined ) {
      const fetchUrl = 'http://localhost:3000/api/v1/search-two/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne;
      this.props.fetchMoodSearch(fetchUrl);
      this.props.history.push('/current-vibelist')
    }
    else if (this.props.genreOne !== undefined && this.props.genreTwo === undefined && this.props.genreThree !== undefined) {
        const fetchUrl = 'http://localhost:3000/api/v1/search-two/?mood=' + mood + '&jwt=' + token + "&genreone=" + this.props.genreOne + "&genrethree=" + this.props.genreThree;
        this.props.fetchMoodSearch(fetchUrl);
        this.props.history.push('/current-vibelist')
    }
    else if (this.props.genreOne === undefined && this.props.genreTwo !== undefined && this.props.genreThree !== undefined) {
        const fetchUrl = 'http://localhost:3000/api/v1/search-two/?mood=' + mood + '&jwt=' + token + "&genretwo=" + this.props.genreTwo + "&genrethree=" + this.props.genreThree;
        this.props.fetchMoodSearch(fetchUrl);
        this.props.history.push('/current-vibelist')
    }
    else if (this.props.genreOne === undefined && this.props.genreTwo !== undefined && this.props.genreThree === undefined) {
        const fetchUrl = 'http://localhost:3000/api/v1/search-two/?mood=' + mood + '&jwt=' + token + "&genretwo=" + this.props.genreTwo;
        this.props.fetchMoodSearch(fetchUrl);
        this.props.history.push('/current-vibelist')
    }
    else if (this.props.genreOne === undefined && this.props.genreTwo === undefined && this.props.genreThree !== undefined) {
        const fetchUrl = 'http://localhost:3000/api/v1/search-two/?mood=' + mood + '&jwt=' + token + "&genrethree=" + this.props.genreThree;
        this.props.fetchMoodSearch(fetchUrl);
        this.props.history.push('/current-vibelist')
    }
    else {

      const fetchUrl = `http://localhost:3000/api/v1/search-two/?mood=${mood}&jwt=${token}`;
      this.props.fetchMoodSearch(fetchUrl);
      this.props.history.push('/current-vibelist')
    }
  }

  render(){
    console.log(this.props.history)
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

const mapStateToProps = (state, ownProps) => {

  return {
    genreOne: state.currentGenres.genreOne,
    genreTwo: state.currentGenres.genreTwo,
    genreThree: state.currentGenres.genreThree,
    currentVibelist: state.currentVibelist,
    history: ownProps.history
  }
}

export default compose(
  withAuth,
  withRouter,
  connect(mapStateToProps, actions),
)(MoodEmojiSelector);
