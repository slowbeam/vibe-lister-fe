const defaultState = {
  genreOne: undefined,
  genreTwo: undefined,
  genreThree: undefined
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_GENRE_ONE':
      return {...state, genreOne: action.payload}
    case 'SET_GENRE_TWO':
      return {...state, genreTwo: action.payload}
    case 'SET_GENRE_THREE':
      return {...state, genreThree: action.payload}
    case 'CLEAR_GENRES':
      return defaultState
    default:
      return state;
  }
}
