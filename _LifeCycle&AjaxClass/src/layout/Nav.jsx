import React from 'react'

class Nav extends React.Component{
  constructor(props){
    super(props)
  }

  linkHandler = (e) => {
    e.preventDefault()

    // 這邊的{href}去抓createPageLinks的<a>裡面的href
    const {href} = e.target
    const {pathService} = this.props
    // 調用在PathService.js裡面的setPath 這個function
    pathService.setPath(href)
  }

  createPageLinks = (navRoutes) => {
    // 用map把navRoutes對應的值做match
    return navRoutes.map( (navRoute) => {
      return (
        // 要設定navRoute的key值才能夠使用navRoute裡面的內容
        <li key={navRoute.name}><a href={navRoute.url} onClick={this.linkHandler}>{navRoute.name}</a></li>
      )
    })
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // 如果舊的props裡面的user不等於接下來的props的user就回傳true，不然就回傳false
    if(this.props.user != nextProps.user){
      return true
    }
    return false
  }

  render = () => {
    console.log("Nav Render")
    // 由super(props)把 NavRoutes接近來使用
    const {navRoutes} = this.props
    // 再由links 把{navRoute}的值傳進createPageLinks 這個function
    const links = this.createPageLinks(navRoutes)
    return(
      <ul>
        {links}
      </ul>
    )
  }
}

export default Nav
