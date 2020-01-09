import React, { Component } from 'react'
import UserEditor from './components/UserEditor.jsx'
import UserVideos from './components/UserVideos.jsx'

class UserPage extends Component {
  constructor(props) {
    super(props)
  }

  // 利用componentDidMount,在載入時進行網址的改寫,但是不進行頁面的重新導向
  componentDidMount = () => {
    window.history.pushState("", "", '/user/');
  }

  inputHandler = (name, value) => {
    this.setState({ [name]: value })
  }

  render = () => {
    console.log("UserPage render")

    const {user} = this.props
    return (
      <div>
        <h2>Say Something</h2>
        <UserEditor user={user} handler={this.inputHandler} />
        <UserVideos likes={user.videos.likes} />
      </div>
    )
  }
}

export default UserPage
