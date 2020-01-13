import React from 'react'
import css from '../lib/css/main.css'
import Card, { CardPrimaryContent,} from "@material/react-card";
import { Body2, Headline6,} from '@material/react-typography';
import Radio, {NativeRadioControl} from '@material/react-radio';
import Checkbox from '@material/react-checkbox';
import TextField, {HelperText, Input} from '@material/react-text-field';


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
    // 因為使用material design component 的套件 所以checkbox要先去抓到.mdc-checkbox來使用
    const checkboxParent = e.target.closest('.mdc-checkbox')
    // 這邊解構了name的部份,原先寫成 const {name, valeu} = e.target
    const newValue = checkboxParent.getAttribute("value")
    // 這邊的name使用getAttribute去抓attributeName的內容
    const name = checkboxParent.getAttribute("attributeName")
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

  componentDidMount = () => {
    // 這邊因為byMail跟promptRegist使用material design component所以value值要另外寫上去,原本的value跑到包住的div上了
    document.getElementById("byMail").value = "byMail"
    document.getElementById("promptRegist").value = "promptRegist"
  }

  render = () => {
    // 原先在checked裡面寫成
    // this.props.receipt.receiptType跟this.props.handler
    // this.props.receipt.taxId和this.props.receipt.receiptOption
    // 這樣太長用解構縮短程式
    const {forReceipt, handler} = this.props
    const {receiptType, taxId, receiptOption} = forReceipt
    return(
      <Card>
        <CardPrimaryContent>
          <div className="cardDivClass">
            <Headline6 tag="h3" className="headLine6Margin">統一發票：</Headline6>
            <div>
              <Radio label='個人' key='personal'>
                <NativeRadioControl
                  id="personal"
                  name="receiptType"
                  value="2"
                  checked={receiptType == 2}
                  onChange={this.inputHandler} />
              </Radio><br />
              <Radio label='公司' key='company'>
                <NativeRadioControl
                  id="company"
                  name="receiptType"
                  value="3"
                  checked={receiptType == 3}
                  onChange={this.inputHandler} />
              </Radio>
              <TextField outlined label='統一編號' className="textFieldMargin">
                <Input
                  value={taxId}
                  onChange={this.inputHandler} />
              </TextField>
            </div>
            <div>
              <React.Fragment>
                <Headline6 tag="h3" className="headLine6Margin">郵寄選項：</Headline6>
                <Checkbox
                    name="receiptOption[]"
                    attributeName="receiptOption"
                    value="byMail"
                    nativeControlId='byMail'
                    checked={receiptOption.includes("byMail")}
                    onChange={this.checkboxHandler}/>
                <label htmlFor='byMail'>實體寄送(+ $30)</label>
              </React.Fragment>
              <br />
              <React.Fragment>
                <Checkbox
                  name="receiptOption[]"
                  attributeName="receiptOption"
                  value="promptRegist"
                  nativeControlId='promptRegist'
                  checked={receiptOption.includes("promptRegist")}
                  disabled={ !receiptOption.includes("byMail")}
                  onChange={this.checkboxHandler} />
                <label htmlFor='promptRegist'>限時掛號(再 + $30 = $60)</label>
              </React.Fragment>
            </div>
          </div>
        </CardPrimaryContent>
      </Card>
    )
  }
}

export default Receipt
