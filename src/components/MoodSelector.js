import React from 'react';
import uuid from 'uuid'
import genres from '../Genres'

class MoodSelector extends React.Component {

  state = {
    selectedMood: 'sad'
  }

  moods = [
    'sad',
    'content',
    'ecstatic'
  ]

  renderGenreOptions = () => {
    return genres.map(genre => <option key={uuid()}>{genre}</option>)
  }

  renderMoodOptions = () => {
    return this.moods.map(mood => <option key={uuid()}>{mood}</option>)
  }

  handleChange = (event) => {
    this.setState({
      selectedMood: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    window.location='http://localhost:3000/api/v1/search/?mood=' + this.state.selectedMood
  }

  render(){
    return (
      <div className="genre-selector-container">
        Choose a Mood:
        <form className="genre-form" onSubmit={this.handleSubmit}>
        <select onChange={this.handleChange} value={this.state.selectedMood}>
        {this.renderMoodOptions()}
        </select>
        <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
};


export default MoodSelector;
