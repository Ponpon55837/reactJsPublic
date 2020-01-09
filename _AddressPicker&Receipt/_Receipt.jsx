import React from 'react'
class Receipt extends React.Component{
  constructor(props){
    super(props)
  }
  /*
    因為要避免多層重複render的問題，
    這邊的state跟setState都改由App.jsx中的state
    藉由<Receipt />中的receipt={this.state.receipt}和handler={this.handler}傳進來
    所以將原先的state跟setState都刪除移到外部
   */

  inputHandler = (e) => {
   const {name, value} = e.target
   const {forReceipt, handler} = this.props
   // handler取得name:'forReceipt',串接...forReceipt
   handler("forReceipt", { ...forReceipt, [name] : value })
  }

  removeValueFromArray = (array, value) => {
    // 當element傳進來的值不等於value時,retrun回array用filter將其移除
    return array.filter( (element) => {
      return element != value
    })
  }

  checkboxHandler = (e) => {
    // 這邊解構了name的部份,原先寫成 const {name, valeu} = e.target
    const newValue = e.target.value
    // 這邊的name使用getAttribute去抓attributeName的內容
    const name = e.target.getAttribute("attributeName")
    // 先拿到props中的receipt
    const {forReceipt, handler} = this.props
    // 才能讓values使用receipt裡面的name
    let values = forReceipt[name]
    // 如果valus includes進來的newValue是正確的,values就使用removeValueFromArray去移除進來的values,newValue
    if(values.includes(newValue)){
      // 如果第一個checkbox沒有勾起來, 第二個checkbox的勾勾就會被移除
      values = this.removeValueFromArray(values, newValue)
    }
    // 否則進push newValue
    else{
      values.push(newValue)
    }
    // 如果name是receiptOption 並且 values includes進來的不是byMail的話
    if(name == "receiptOption" && !values.includes("byMail")){
      // values清空陣列 , 因為這邊設定的是如果第一個checkbox沒有被打勾,第二個勾的值就要清除,而且會checkbox disabled = false
      values = []
    }
    // 這邊的[name]對應到的是values 不是 value
    handler("forReceipt", { ...forReceipt, [name] : values })
  }

  render = () => {
    // 原先在checked裡面寫成
    // this.props.receipt.receiptType跟this.props.handler
    // this.props.receipt.taxId和this.props.receipt.receiptOption
    // 這樣太長用解構縮短程式
    const {forReceipt, handler} = this.props
    const {receiptType, taxId, receiptOption} = forReceipt
    return(
      <div>
        <span>統一發票：</span><br />
        <label>
          <input
            type="radio"
            name="receiptType"
            value="2"
            checked={receiptType == 2}
            onChange={this.inputHandler} />
          個人
        </label><br />
        <label>
          <input
            type="radio"
            name="receiptType"
            value="3"
            checked={receiptType == 3}
            onChange={this.inputHandler} />
          公司
          統一編號：
          <input
            type="text"
            name="taxId"
            value={taxId}
            onChange={this.inputHandler} />
        </label><br /><br />
        <div>
          <span>郵寄選項：</span><br />
          <label>
            <input
              type="checkbox"
              name="receiptOption[]"
              attributeName="receiptOption"
              value="byMail"
              checked={receiptOption.includes("byMail")}
              onChange={this.checkboxHandler}/>
            實體寄送(+ $30)
          </label><br />
          <label>
            <input
              type="checkbox"
              name="receiptOption[]"
              attributeName="receiptOption"
              value="promptRegist"
              checked={receiptOption.includes("promptRegist")}
              disabled={ !receiptOption.includes("byMail")}
              onChange={this.checkboxHandler} />
            限時掛號(再 + $30 = $60)
          </label>
        </div>
      </div>
    )
  }
}

export default Receipt
