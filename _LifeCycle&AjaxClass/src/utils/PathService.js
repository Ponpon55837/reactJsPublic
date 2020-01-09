class PathService {
  constructor(){
    // 這邊的path由App.jsx傳入，在App.jsx中的const pathService = new PathService()這段
    // 利用dom的方式去找到location底下的路徑
    this.path = window.location.pathname
  }

  register = (setStateFunc) => {
    this.setStateFunc = setStateFunc
  }

  setPath = (path) => {
    window.history.pushState("", "", path)
    this.path = window.location.pathname
    if(this.setStateFunc){
      this.setStateFunc(this.path)
    }
  }
}

export default PathService
