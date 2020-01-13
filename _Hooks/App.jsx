import React, { useState, useContext, useEffect } from 'react'
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

const App = () => {
  // [ 這個是state, 這個用來設置state ]
  const [counter, setCounter] = useState(110)

  // 使用useEffect
  useEffect( () => {
    document.title = `do it  ${counter} times `
    console.log('1 useEffect subscribe')
    // const subscription = props.source.subscribe()
    return () => {
      console.log('2 useEffect unSubscribe')
      // subscription.unsubscribe()
    }
  // 將沒有改變值得參數放在第二個位置 那在參數未變動的情況下 不會去render這個參數
  // 例如counter的值沒有變動 那麼就不會render console.log('1 useEffect subscribe')跟return的console.log('2 useEffect unSubscribe')
  }, [counter])

  // 這邊使用useState + useContext
  return (
    <SetCounterContext.Provider value={ () => {
      setCounter(counter + 1)
    } }>
      <CounterContext.Provider value={counter}>
        <DisplayView />
        <Button />
      </CounterContext.Provider>
    </SetCounterContext.Provider>
  )

}


ReactDOM.render(<App />, document.getElementById('root'))
