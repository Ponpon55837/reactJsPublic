import React from 'react'
import css from '../lib/css/main.css'

class AddressPicker extends React.Component{
  constructor(props){
    super(props)
    // this.cities把this.postalCode當成key值去使用
    this.cities = Object.keys(this.props.taiwanPostalCode)
  }
  /*
    因為要避免多層重複render的問題，
    這邊的state跟setState都改由App.jsx中的state
    藉由<Receipt />中的receipt={this.state.receipt}和handler={this.handler}傳進來
    所以將原先的state跟setState都刪除移到外部
   */
  handlerRelated = (name, value) => {
    // 設置一個為mergeObject的物件用來在後面的陣列中使用...mergeObject串接其他物件
    let mergeObject = {}
    const {taiwanPostalCode, forAddressPicker : {city, district, postalCode, address}} = this.props

    // 如果name的值與city相同 且 在this.state.city中的值不相符的話
    if( name == "city" && city != value){
      // 清空district的值
      mergeObject['district'] = ""
      // 清空postalCode的值
      mergeObject['postalCode'] = ""
    }
    // 如果name的值與district相同 且 在this.state.city中的值不相符的話
    else if( name == "district" && district != value){
      const cityData = taiwanPostalCode[city]
      const postalCode = cityData[value]
      mergeObject['postalCode'] = postalCode

      // 這邊的[name]是拿來當作上面this.state的title來用的 因為這樣才可以當作key值
      // this.setState({ [name] : value })
      // if( name == "city" && this.state.city != value){
      //   this.setState({ [name] : value, "district": ""},() => {
      //     console.log(this.state)
      //   })
      // }else{
      //   this.setState({ [name] : value }, () => {
      //     console.log(this.state)
      //   })
      // }
    }

    return mergeObject
  }

  inputHandler = (e) => {
    const {name, value} = e.target
    const {forAddressPicker, handler} = this.props
    const mergeObject = this.handlerRelated(name, value)
    handler("forAddressPicker", {...forAddressPicker, ...mergeObject, [name] : value})
  }

  // handler = (element) => {
  //   let {name,value} = element.target
  //
  //   const mergeObject = this.handlerRelated(name, value)
  //
  //   this.setState({ ...mergeObject, [name] : value}, () => {
  //     console.log(this.state)
  //   })
  // }


  // 拿來將city return到render中的function
  setCitySelector = (cities) => {
    console.log(cities)
    return cities.map((city) => {
      return (<option key={city} vlaue={city}>{city}</option>)
    })
  }

  setDistrictSelector = (districts) => {
    console.log(districts)
    return districts.map((district) => {
      return (<option key={district} vlaue={district}>{district}</option>)
    })
  }

  render = () => {
    // 原先寫成
    // this.props.forAddressPicker.city跟this.props.forAddressPicker.district
    // thisprops.forAddressPicker.postalCode和this.props.forAddressPicker.address
    // 這樣太長用解構縮短程式
    const {taiwanPostalCode, forAddressPicker : {city, district, postalCode, address}} = this.props
    // 用citySelector來接setCitySelector中的內容並且把直傳進setCitySelector中
    const citySelector = this.setCitySelector(this.cities)
    // 抓取從外部傳進來的taiwanPostalCode裡面的key,這個key來自於state底下forAddressPicker的city
    const cityData = taiwanPostalCode[city]
    const districts = Object.keys(cityData)
    const districtsSelector = this.setDistrictSelector(districts)

    return (
      <div>
        <label>
          城市：
            <select
              name="city"
              value={city}　
              onChange={this.inputHandler}>
              {citySelector}
            </select>
        </label><br />
        <label>
          市/區：
            <select
              name="district"
              value={district}　
              onChange={this.inputHandler}>
              {districtsSelector}
            </select>
        </label><br />
        <label>郵遞區號：</label>
        <input
          id="postalCodeInput"
          name="postalCode"
          value={postalCode} />
        <br />
        <input
          name="address"
          value={address}
          onChange={this.inputHandler}/>
      </div>
    )
  }
}

export default AddressPicker
