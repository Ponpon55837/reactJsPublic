import { INCREMENT, DECREMENT } from './actionTypes.jsx'

// 使用function的結構，利用return來回傳物件
// 因為const store = createStore(reducer, { counter: 0 })有傳入reducer，所以可以直接return這兩個型別
export const increment = () => { return { type: INCREMENT } }
export const decrement = () => { return { type: DECREMENT } }
