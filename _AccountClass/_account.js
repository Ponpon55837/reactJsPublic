var account = {
  IsEmailFormatCorrect : false,
  IsPassWordFormatCorrect : false,
  init: function(){
    var emailInput = document.querySelector("#user_email")
    var passwordInput = document.querySelector("#user_password")

    emailInput.addEventListener('input', function(e){
      this.IsEmailFormatCorrect = true
      this.canSubmit()
    }.bind(this))

    passwordInput.addEventListener('input', function(e){
      var value = e.target.value
      var warning = document.querySelector('#warningString')
      if(value.length >= 8){
        warning.innerHTML = ""
        this.IsPassWordFormatCorrect = true
      }
      else{
        this.IsPassWordFormatCorrect = false
        warning.innerHTML = 'it is not enough'
      }
      this.canSubmit()
    }.bind(this))

    this.canSubmit = function (){
      var submit = document.querySelector('#submitbutton')
      if(this.IsEmailFormatCorrect && this.IsPassWordFormatCorrect){
        submit.disabled = false
      }else {
        submit.disabled = true
      }
    }
  }
}
