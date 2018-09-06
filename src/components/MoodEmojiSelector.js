import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import GenreSelectDialog from './GenreSelectDialog';
import SelectedGenresList from './SelectedGenresList'

class MoodEmojiSelector extends React.Component {


  handleSubmit = (mood) => {
    const token = localStorage.getItem('jwt');

    window.location='http://localhost:3000/api/v1/search/?mood=' + mood + '&jwt=' + token

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

export default withAuth(connect()(MoodEmojiSelector));
