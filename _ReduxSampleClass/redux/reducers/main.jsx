import { INCREMENT, DECREMENT } from '../actionTypes.jsx'

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      // 要先...state串接舊的值，再加上counter執行後的結果
      return { ...state, counter: state.counter + 1 }
    case DECREMENT:
      // 要先...state串接舊的值，再加上counter執行後的結果
      return { ...state, counter: state.counter - 1 }
    default:
      return state
  }
}

export default reducer
