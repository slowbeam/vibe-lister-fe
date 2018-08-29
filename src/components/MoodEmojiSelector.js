import React from 'react';
import { connect } from 'react-redux'
import { setCurrentList } from '../actions/currentList'

class MoodEmojiSelector extends React.Component {


  handleSubmit = (mood) => {
    this.props.setCurrentList(mood)
    window.location='http://localhost:3000/api/v1/search/?mood=' + mood

  }

  render(){
    return (
      <div className="mood-selector-container">
        Choose a Mood:
        <div className="mood-emoji-container">
        <img onClick={() => this.handleSubmit('sad')} alt="" src="/images/emojis/sad.png"/>
        <img onClick={() => this.handleSubmit('content')} alt="" src="/images/emojis/content.png"/>
        <img onClick={() => this.handleSubmit('ecstatic')} alt="" src="/images/emojis/ecstatic.png"/>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentList: (mood) => dispatch(setCurrentList(mood))
  }
}

export default connect(null, mapDispatchToProps)(MoodEmojiSelector);
