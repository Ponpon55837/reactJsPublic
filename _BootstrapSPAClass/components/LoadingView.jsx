import React, {Component} from 'react'

const str = "Loading"

class LoadingView extends Component {
    constructor (props){
        super(props)

        this.view = React.createRef()
        this.count = 0
    }

    componentDidMount = () => {
        this.timer = setInterval(() => {
            this.count = this.count % 5
            let strMessage = str
            for(let index = 0 ; index <= this.count; index++)
            {
                strMessage = strMessage + "."
            }
            this.view.current.innerHTML = strMessage
            this.count += 1
        }, 500)
    }

    componentWillUnmount = () => {
        if(this.timer){
            clearInterval(this.timer)
        }
    }
    
    render = () => {
        console.log("LoadingView render");

        return (<h1 ref={this.view}>{this.str}</h1>)
    }
}

export default LoadingView