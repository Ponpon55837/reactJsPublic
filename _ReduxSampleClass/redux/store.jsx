import { createStore } from "redux"
import reducer from "./reducers/main.jsx"

// 在createStore時，要給予counter初始值
// 意思就是createStore(丟進去的function, {初始值: 數值})
// 同時因為還有傳入reducer所以可以使用reducer裡面的case
// const store = createStore(reducer, { counter: 0 })

// 原本用const去寫，獨立來寫直接用export就好了
export default createStore(reducer, { counter: 0 })
