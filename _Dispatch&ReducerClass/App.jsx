import React, { useContext, useReducer } from 'react'
import ReactDOM from 'react-dom'

// hooks跟redux最大的差別在於  hooks通常使用function 而redux則使用class  一個是functional component 一個是 class component


// 創建一個context來做為橋接
const CounterContext = React.createContext()
const SetCounterContext = React.createContext()

const Button = () => {
  const handler = useContext(SetCounterContext)
  return (
    <button type="button" onClick={ handler }>+ 1
    </button>
  )
}

const DisplayView = () => {
  // 使用useContext把CounterContext中的內容接進來，這邊接到的內容是useState的值
  const counter = useContext(CounterContext)
  return (
    <p>Counter: {counter}</p>
  )
}

const reducer = (counter, action) => {
  switch (action.type) {
    case 'increment' :
      return counter + 1
    case 'decrement' :
      return counter - 1
    default:
      throw new Error()
  }
}

const App = () => {
  // [ 這個是state, 這個用來設置state ]
  const [counter, dispatch] = useReducer(reducer, 110)

  // 這邊使用useState + useContext
  return (
    <SetCounterContext.Provider value={ () => {
      dispatch({type: 'increment'})
    } }>
      <CounterContext.Provider value={counter}>
        <DisplayView />
        <Button />
      </CounterContext.Provider>
    </SetCounterContext.Provider>
  )

}


ReactDOM.render(<App />, document.getElementById('root'))
