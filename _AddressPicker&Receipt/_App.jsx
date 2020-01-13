import React from 'react'
import ReactDOM from 'react-dom'
import AddressPicker from './_AddressPicker.jsx'
import Receipt from './_Receipt.jsx'
import TaiwanPostalCode from './TaiwanPostalCode.json'
import Button from '@material/react-button'

/*
  因為要讓Receipt跟AddressPicker裡面的值能控制外面的submit button
  所以要在constructor拉出state來控制
  而且這樣才能避免元件render完之後回到第一層又重新render這樣它會再跑回元件層去render一次
  例如:
    有3層元件
    就會先render第三層然後到第二層render，
    再回到第三層render然後再到第一層render，
    接著跑到第二層render再跑到第三層render，
    但是都是做相同的事情，
    為了避免這樣的情況發生，所以在第二層之下包含第二層就不要有state跟setState
*/
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      // Receipt.jsx的state
      forReceipt : {
        // radio checked的預設值
        receiptType   : 2,
        taxId         : "",
        // 將勾選的內容做為陣列寫入,所以handler要另外寫,這邊用的是checkboxHandler
        receiptOption : ["byMail"]
      },
      forAddressPicker : {
        // 這邊的city是key值,會去從import進來的TaiwanPostalCode.json中找有沒有對應的內容
        city       : "台北市",
        district   : "",
        postalCode : "",
        address    : "",
      }
    }
  }
  handler = (name, value) => {
    this.setState({ [name] : value }, () => {
      console.log(this.state)
    })


    // const {name, value} = e.target
    // this.setState({
    //   forReceipt : {
    //     // 使用串接將原先在Receipt.jsx中的值串接出來
    //     // 寫在[name]: value前面這樣在value改變時才能將前面的值蓋掉
    //     ...this.state.forReceipt,
    //     [name] : value } }, () => {
    //   console.log(this.state)
    // })
  }
  // 這個checkIsReceiptTypeReady的function是藉由上面的this.state.forReceipt<Receipt />中傳入Receipt.jsx中的constructor(props)
  checkIsReceiptTypeReady = () => {
    let result = false
    // 如果radio button選擇為2時 true
    if(this.state.forReceipt.receiptType == 2){
      result = true
    }
    // 如果radio button選擇為2 且 統一編號不為空時 true
    else if(this.state.forReceipt.receiptType == 3 && this.state.forReceipt.taxId !=""){
      result =  true
    }
    return result
  }

  checkIsAddressReady = () => {
    const { city, district, postalCode, address } = this.state.forAddressPicker
    // 當 city, district, postalCode, address 都不為空時為true
    if(city != "" && district != "" && postalCode != "" && address != "") {
      return true
    }
    return false
  }

  // 回傳receiptTypeIsReady和addressPickerIsReady的值是true還是false
  isReady = () => {
    return this.checkIsReceiptTypeReady() && this.checkIsAddressReady()
    console.log(isReady)
  }

  render = () => {
    return (
      <form>
        <Receipt
          handler = {this.handler}
          forReceipt = {this.state.forReceipt}
        />
        <br />
        <AddressPicker
          handler = {this.handler}
          forAddressPicker = {this.state.forAddressPicker}
          taiwanPostalCode = {TaiwanPostalCode}
        />
        <br />
        <Button outlined type="submit" disabled={!this.isReady()}>Submit</Button>
      </form>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
