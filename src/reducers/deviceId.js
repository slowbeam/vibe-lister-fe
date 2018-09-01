export default (state = null, action) => {
  switch (action.type) {
    case 'SET_DEVICE_ID':
      return action.id
    default:
      return state;
  }
}
