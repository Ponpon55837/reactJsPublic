const logInUrl = (username, password) => {
  return `https://vuetest-69b45.firebaseapp.com/json/${username}.json`
}

const getUserSuccessUrl = () => {
  return `https://vuetest-69b45.firebaseapp.com/json/user.json`
}

const getUserFailedUrl = () => {
  return `https://vuetest-69b45.firebaseapp.com/json/userFailed.json`
}

class UserService {
  static defaultUser = {
    // 因為現在沒有直接引入json的資料所以要先幫key寫好位置
    videos: {
      likes: []
    }
  }
  constructor(){
    this.currentUser = this.constructor.defaultUser
  }
  getCurrentUser = () => {
    return this.currentUser
  }
  register =(setStateFunc) => {
    this.setStateFunc = setStateFunc
  }

  // 如果user已經登入的話，就跳到對應的路徑
  // redirectIfUserLogin = (path) => {
  //   const user = this.getCurrentUser();
  //   if(user.id){
  //       window.location.pathname = path
  //   }
  // }


  // 判斷在使用者登入時,資料被改變使用的是哪個使用者資料
  getUserFromServer = async () => {
    const url = getUserFailedUrl()
    const response = await fetch(url)
    if (!response.ok) {
      throw Error(response.statusText)
    }
    this.currentUser = await response.json()

    if(this.setStateFunc){
      // 上面setStateFunc就是為了在這邊擷取currentUser
      this.setStateFunc(this.currentUser)
    }

    return new Promise((resolve, reject) => {
      resolve()
    })
  }
  logIn = async (username, password) => {
    const url = logInUrl(username, password)
    const response = await fetch(url)
    if(!response.ok){
      throw Error(response.statusText)
    }
    this.currentUser = response.json()

    if(this.setStateFunc){
      // 上面setStateFunc就是為了在這邊擷取currentUser
      this.setStateFunc(this.currentUser)
    }

    return new Promise( (resolve, reject) => {
      resolve()
    })
  }
}

export default UserService
