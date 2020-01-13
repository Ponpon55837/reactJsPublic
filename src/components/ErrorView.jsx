import React from 'react'

const ErrorView = ({error}) => {
  console.log("ErrorView render");
  return (<h1>Error: {error.message}</h1>)
}

export default ErrorView
