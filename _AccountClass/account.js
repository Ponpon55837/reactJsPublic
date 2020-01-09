function Account(){
  this.keyValueSate = {} // 初始值是空的 , 在initInputField中被放入值
}

// Account.prototype.keyValueSate = function(){},

Account.prototype.IsStringText = function(str){
  // 正規表示式 ID可以填入大小寫英文與數字
  var regex = RegExp('^[a-zA-Z0-9]{3,20}$')
  return regex.test(str)
}

Account.prototype.IsNameText = function(str){
  // 正規表示式 Name最多有三組{0,2},每組最多20個字最少3個字,可以有空格
  var regex = RegExp('^[a-zA-Z]{3,20}(\\s[a-zA-Z]{3,20}){0,2}$')
  return regex.test(str)
}

Account.prototype.IsStringEmail = function(str){
  // 正規表示式 這個沒有用RegExp所以直接用//來寫,用RegExp會遇到跳脫字元的問題
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(str)
}

Account.prototype.IsStringPasswordFormat = function(str){
  // 正規表示式 密碼可以用複雜的特殊字元
  var regex = RegExp('^[\\w\\s#@&><$_\\-\\\\\\.\\*\/]{8,16}$')
  return regex.test(str)
}

Account.prototype.initInputField = function(selectors, key, validateFunc, syncFunc){
  // 當document.querySelector抓到使用的id 或 class時
  var Input = document.querySelector(selectors)
  // 用Input的父元素去抓取 id 或 class
  var warning = Input.parentElement.querySelector(".warningString")
  var IsFormatCorrect = false
  this.keyValueSate[key] = false
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
}

Account.prototype.canSubmit = function(keyValueObject){
  var OriginalKeys = Object.keys(this.keyValueSate) // OriginalKeys是陣列 所以下面可以直接用forEach去跑迴圈
  OriginalKeys.forEach(function(key){ // OriginalKeys會在每次迴圈時 , 將每個Input的key塞入 進行驗證
    if(undefined !== keyValueObject[key]){
      this.keyValueSate[key] = keyValueObject[key]
    }
  }.bind(this))
  var submit = document.querySelector('#submitbutton')

  var canSubmitKey = true
  OriginalKeys.forEach(function(key){
    // 每次迴圈必須 canSubmitKey 跟 this.keyValueSate[key]都是true
      canSubmitKey = canSubmitKey && this.keyValueSate[key]
  }.bind(this))

  submit.disabled = !canSubmitKey
}
