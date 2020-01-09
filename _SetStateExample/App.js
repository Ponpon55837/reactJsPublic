import Main from './Tool.js'

export default class App{
  constructor(){
    // 這裡的Main是從Tool.js傳過來的
    this.tool = new Main()
  }
}
