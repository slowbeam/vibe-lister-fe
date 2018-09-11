const defaultState = {
  sadLists: [],
  contentLists: [],
  ecstaticLists: []
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SAD_LISTS':
      return {...state, sadLists: action.payload}
    case 'SET_CONTENT_LISTS':
      return {...state, contentLists: action.payload}
    case 'SET_ECSTATIC_LISTS':
        return {...state, ecstaticLists: action.payload}
    default:
      return state;
  }
}
