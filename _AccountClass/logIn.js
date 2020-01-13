function LogIn(){
  Account.call(this)

  // 串接initInputField 要抓取的id 或 class
  this.initInputField(
    "#user_email", // 抓的id 或 class
    "IsEmailFormatCorrect", // key值
    this.IsStringEmail, // 驗證
    function(value){ // canSubmit function
    this.canSubmit(value)
    }.bind(this))
  this.initInputField(
    "#user_password", // 抓的id 或 class
    "IsPassWordFormatCorrect", // key值
    this.IsStringPasswordFormat, // 驗證
    function(value){ // canSubmit function
      this.canSubmit(value)
    }.bind(this))
}

LogIn.prototype = Object.create(Account.prototype)
LogIn.prototype.constructor = LogIn
