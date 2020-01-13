import React from 'react'
import UserEditor from '../user/component/UserEditor.jsx'
import UserVideos from '../user/component/UserVideos.jsx'

class UserPage extends React.Component{
  constructor(props){
    super(props)
  }

  // 利用componentDidMount,在載入時進行網址的改寫,但是不進行頁面的重新導向
  componentDidMount = () => {
    window.history.pushState("", "", '/_LifeCycle&AjaxClass/user/index.html')
  }

  handler = (name, value) => {
    this.setState({[name] : value})
  }

  // 因為撈取fetch要使用非同步的方式，所以要用async跟await，不然會撈不到資料
  // fetchData = async () => {
  //   const userService = this.userService
  //   try {
  //     const user = await this.userService.logIn("user", "")
  //     this.handler("user", user)
  //   } catch (error) {
  //     this.handler("error", error)
  //   }
  // }

  render = () => {
    console.log('UserPage render :' + this.state.user)
    const {user} = this.props
    return (
      <div>
        <div>
          <h1>Say Something</h1>
          <UserEditor
            user={user}
            handler={this.handler}
            />
          <UserVideos
            user={user}/>
        </div>
      </div>
    )
  }
}

export default UserPage
