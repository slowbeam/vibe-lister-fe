import APIAdapter from '../apis/adapter'

export const fetchMoodSearch = (mood) => {

  return (dispatch) => {
    return APIAdapter.searchMood(mood)
        .then(data => {
          console.log(data)
        })
  }
}
