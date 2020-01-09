function SignUp(){
  Account.call(this)

  // 串接initInputField 要抓取的id 或 class
  // 使用者名稱
  this.initInputField(
    "#user_id", // 抓的id 或 class
    "IsUserIdFormatCorrect", // key值
    this.IsStringText, // 驗證
    function(value){ // canSubmit function
    this.canSubmit(value)
    }.bind(this))
  // 使用者email
  this.initInputField(
    "#user_email", // 抓的id 或 class
    "IsEmailFormatCorrect", // key值
    this.IsStringEmail, // 驗證
    function(value){ // canSubmit function
    this.canSubmit(value)
    }.bind(this))
  // 密碼
  this.initInputField(
    "#user_password", // 抓的id 或 class
    "IsPassWordFormatCorrect", // key值
    this.IsStringPasswordFormat, // 驗證
    function(value){ // canSubmit function
      this.canSubmit(value)
    }.bind(this))
  // 密碼驗證
  this.initInputField(
    "#user_password_confirmate", // 抓的id 或 class
    "IsPassWordConfirmationCorrect", // key值
    this.IsPasswordEqualToPasswordConfirmation, // 驗證
    function(value){ // canSubmit function
    this.canSubmit(value)
    }.bind(this))
}

// SignUp的prototype由Account中被創造出來
SignUp.prototype = Object.create(Account.prototype)
// 將SignUp結構子塞入SignUp中
SignUp.prototype.constructor = SignUp

// 用來判斷密碼驗證 , 填入的內容需要和密碼欄位填入內容完全相同才能通過
SignUp.prototype.IsPasswordEqualToPasswordConfirmation = function(str){
  var passwordInput = document.querySelector("#user_password")
  return str === passwordInput.value
}
