const logInUrl = (username, password) => {
  // 如果登入是對的username，回傳userFailed.json
  return `https://vuetest-69b45.firebaseapp.com/json/${username}.json`
}

const getUserSuccessUrl = () => {
  // 如果登入成功，回傳userFailed.json
  return `https://vuetest-69b45.firebaseapp.com/json/user1.json`
}

const getUserFailedUrl = () => {
  // 如果登入錯誤，回傳userFailed.json
  return `https://vuetest-69b45.firebaseapp.com/json/userFailed.json`
}


class UserService {
  // 因為現在沒有直接引入json的資料所以要先幫key寫好位置
  // 從App.jsx 傳入會是寫成 likes={user.videos.likes}
  static defaultUser = {
    videos: {
      likes: []
    }
  }

  constructor (){
    this.currentUser = this.constructor.defaultUser
  }

  // 是否有登入，有登入的話currentUser.id必須大於0
  isLoggedIn = () => {
    return this.currentUser.id > 0
  }

  getCurrentUser = () => {
    return this.currentUser
  }

  // 從App.jsx來調用這裡進行註冊
  register = (setStateFunc) => {
    this.setStateFunc = setStateFunc
  }

  // 判斷在使用者登入時,資料被改變使用的是哪個使用者資料
  getUserFromServer = async () => {
    const url = getUserFailedUrl()
    const response = await fetch(url)
    if (!response.ok) {
      throw Error(response.statusText)
    }
    this.currentUser = await response.json()

    if (this.setStateFunc){
      this.setStateFunc(this.currentUser)
    }

    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  logIn = async (username, password) => {
    const url = logInUrl(username, password)
    const response = await fetch(url)
    // 如果回應不是ok的話回傳錯誤訊息
    if (!response.ok) {
      throw Error(response.statusText)
    }
    this.currentUser = await response.json()

    if (this.setStateFunc){
      // 上面setStateFunc就是為了在這邊擷取currentUser
      this.setStateFunc(this.currentUser)
    }

    return new Promise((resolve, reject) => {
      resolve()
    })
  }
}

export default UserService;
