import React from 'react'

const ErrorView = ({error}) => {
  return(<div><h2>Error : {error.message}</h2></div>)
}

export default ErrorView
