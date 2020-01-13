var account = {
  keyValueSate : {},
  IsStringEmail(str){
    // 回傳值
    return str.indexOf("@") != -1
  },
  IsStringPasswordFormat(str){
    return str.length >= 8
  },
  initInputField(selectors, key, validateFunc, syncFunc){
    // 當document.querySelector抓到使用的id 或 class時
    var Input = document.querySelector(selectors)
    // 用Input的父元素去抓取 id 或 class
    var warning = Input.parentElement.querySelector(".warningString")
    var IsFormatCorrect = false
    // 監聽input的內容 , 判斷輸入的字串的長度 , 使用IsStringPasswordFormat進行判斷 , 呼叫canSubmit
    Input.addEventListener('input', function(e){
      var thisInput = e.target
      if(validateFunc(thisInput.value)){
        // 驗證成功的話,清除warning的文字
        warning.style.display = "none"
        IsFormatCorrect = true
      }
      else{
        warning.style.display = ""
        IsFormatCorrect = false
      }
      // ES5寫法是這樣 把key塞到陣列裡面 這樣它才能判斷key是變數
      // ES6的話直接寫成 syncFunc([key] : IsFormatCorrect)
      var newValue = {}
      newValue[key] = IsFormatCorrect
      // 串接key , 把key丟到canSubmit function中進行判斷
      syncFunc(newValue)
    })
    warning.style.display = "none"
  },
  initEmailInputField(selectors, key, validateFunc, syncFunc){
    this.initInputField(selectors, key, validateFunc, syncFunc)
  },
  // 在init中this.initPasswordInputField的(在這裡面被串接), 所以validateFunc = IsStringPasswordFormat
  initPasswordInputField(selectors, key, validateFunc, syncFunc){
    this.initInputField(selectors, key, validateFunc, syncFunc)
  },
  init(){
    this.keyValueSate = {
      "IsEmailFormatCorrect" : false,
      "IsPassWordFormatCorrect" : false
    }
    // 串接initEmailInputField 和 initPasswordInputField 要抓取的id 或 class
    this.initEmailInputField(
      "#user_email", // 抓的id 或 class
      "IsEmailFormatCorrect", // key值
      this.IsStringEmail, // 驗證
      function(value){ // canSubmit function
      this.canSubmit(value)
      }.bind(this))
    this.initPasswordInputField(
      "#user_password", // 抓的id 或 class
      "IsPassWordFormatCorrect", // key值
      this.IsStringPasswordFormat, // 驗證
      function(value){ // canSubmit function
        this.canSubmit(value)
      }.bind(this))
  },
  canSubmit(keyValueObject){
    if(undefined !== keyValueObject["IsEmailFormatCorrect"]){
      this.keyValueSate["IsEmailFormatCorrect"] = keyValueObject["IsEmailFormatCorrect"]
    }
    if(undefined !== keyValueObject["IsPassWordFormatCorrect"]){
      this.keyValueSate["IsPassWordFormatCorrect"] = keyValueObject["IsPassWordFormatCorrect"]
    }
    var submit = document.querySelector('#submitbutton')
    // 在每次被呼叫時確認 IsPassWordFormatCorrect 和 IsPassWordFormatCorrect的值 , 來確定submit button是否disable
    if(this.keyValueSate["IsEmailFormatCorrect"] && this.keyValueSate["IsPassWordFormatCorrect"]){
      submit.disabled = false
    }else {
      submit.disabled = true
    }
  },
}
