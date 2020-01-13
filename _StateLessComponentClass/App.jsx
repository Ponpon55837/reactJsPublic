import React from 'react'
import ReactDOM from 'react-dom'
import User from './user.json'
import UserEditor from './UserEditor.jsx'
import UserVideos from './UserVideos.jsx'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: User
    }
  }

  handler = (name, value) => {
    this.setState({[name] : value}, () => {
      console.log(this.state)
    })
  }

  render = () => {
    return(
      <div>
        <UserEditor
        // 可以寫成 {...this.state.user} UserEditor的props就可以改成user 下面的內容就可以直接使用如 {id}, {name}, {email}...等
          user={this.state.user}
          handler={this.handler}
        />
        <UserVideos
        // 可以寫成 {...this.state.user.vidoes} UserVideos的props就可以直接改成likes來用
        // 也可以寫成 likes = {this.user.videos.likes} UserVideos就改成const {likes} = props
          user={this.state.user}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
