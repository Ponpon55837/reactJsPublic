import { UPDATE_FULL_ADDRESS } from '../actionTypes.jsx'

const initialState = {}

let reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FULL_ADDRESS:
      return {
        ...action.fullAddress
      }
    default:
      return state;
  }
}

export default reducer
