import React from 'react'
import css from '../lib/css/main.css'
import Card, { CardPrimaryContent,} from "@material/react-card";
import { Body2, Headline6, Subtitle1} from '@material/react-typography';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Select, {Option} from '@material/react-select';

class AddressPicker extends React.Component{
  constructor(props){
    super(props)
    // this.cities把this.postalCode當成key值去使用
    this.cities = Object.keys(this.props.taiwanPostalCode)

    // 新增一個div來控制底下的內容
    // 這個是要用來刪除matertial design component的enhance-select標籤用的
    this.div = React.createRef()
  }

  // 這邊會使用到render底下的<div ref={this.div}>去抓取所有在這個div底下的input中name為enhanced-select並且移除這個元素的name
  componentDidMount = () => {
    let enhancedSelects = this.div.current.querySelectorAll("input[name='enhanced-select']")
    enhancedSelects.forEach( (element) => {
      element.removeAttribute('name')
    })
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

  // 使用onEnhacedCahnge要額外寫function,然後再額外使用bind進行綁定
  onEnhancedChange = (name, index, item) => {
    const value = item.getAttribute('data-value')
    const {forAddressPicker, handler} = this.props
    const mergeObject = this.handlerRelated(name, value)
    handler("forAddressPicker", {...forAddressPicker, ...mergeObject, [name] : value})
    //this.setState({value: item.getAttribute('data-value')})
  }

  // 清除地址的內容
  clearAddressIconButton = () => {
    const name = 'address'
    const value = ''
    const {forAddressPicker, handler} = this.props
    const mergeObject = this.handlerRelated(name, value)
    handler("forAddressPicker", {...forAddressPicker, ...mergeObject, [name] : value})
  }

  // 因為改為外部傳入handler所以用不到,傳入的handler在App.jsx中
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
      return (
        // 這邊return的Option是使用material design component的方式
        <Option key={city} value={city}>{city}</Option>
      )
    })
  }

  setDistrictSelector = (districts) => {
    console.log(districts)
    return districts.map((district) => {
      return (
        // 這邊return的Option是使用material design component的方式
        <Option key={district} value={district}>{district}</Option>
      )
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
      <div ref={this.div}>
        <Card>
          <CardPrimaryContent>
            <div className="cardDivClass">
              <Select
                label='城市'
                name="city"
                value={city}
                // 因為使用了enhanced,所以onChange要改成onEnhancedChange
                onEnhancedChange={this.onEnhancedChange.bind(this, "city")}
                outlined
                // 因為原本沒有值,要在上面的城市有選取之後才有值,為了避免出現文字跑版的問題,所以要使用enhanced
                enhanced
              >
                {citySelector}
              </Select>
              <input type="hidden" name="city" value={city} />
              <br />
              <Select
                label='市/區'
                name="district"
                value={district}
                // 因為使用了enhanced,所以onChange要改成onEnhancedChange,裡面的this.inputHandler改為this.onEnhancedChange
                onEnhancedChange={this.onEnhancedChange.bind(this, "district")}
                outlined
                // 因為原本沒有值,要在上面的城市有選取之後才有值,為了避免出現文字跑版的問題,所以要使用enhanced
                enhanced
              >
                {districtsSelector}
              </Select>
              <input type="hidden" name="district" value={district} />
              <br />
              <TextField outlined label='郵遞區號' className="textFieldMargin textFieldMarginTop">
                <Input
                  id="postalCodeInput"
                  name="postalCode"
                  value={postalCode}
                  disabled={true}/>
              </TextField>
              <input type="hidden" name="postalCode" value={postalCode} />
              <br />
              <TextField
              helperText = {<HelperText>請輸入正確地址以方便郵寄</HelperText>}
              // Icon在前面的寫法
              // onLeadingIconSelect={this.clearAddressIconButton}
              // leadingIcon={<MaterialIcon role="button" icon="delete_outline"/>}
              onTrailingIconSelect={this.clearAddressIconButton}
              trailingIcon={<MaterialIcon role="button" icon="delete_outline"/>}
              outlined
              label='郵寄地址'
              className="textFieldMargin textFieldMarginTop">
                <Input
                  id="address"
                  name="address"
                  value={address}
                  onChange={this.inputHandler}/>
              </TextField>
            </div>
          </CardPrimaryContent>
        </Card>
      </div>
    )
  }
}

export default AddressPicker
