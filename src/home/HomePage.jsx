import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { merge, bounce, fadeInDownBig, rotateInDownLeft, zoomInLeft } from 'react-animations'
import Radium, {StyleRoot} from 'radium'
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap'


const divCenter = {
  position: 'absolute', left: '50%', top: '50%',
  transform: 'translate(-50%, -50%)'
}

const rotateInDownLeftZoomInLeft = merge(rotateInDownLeft, zoomInLeft)

const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce')
  },
  fadeInDownBig: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInDownBig, 'fadeInDownBig')
  },
  rotateInDownLeftZoomInLeft: {
    animation: 'x 3s',
    animationName: Radium.keyframes(rotateInDownLeftZoomInLeft, 'rotateInDownLeftZoomInLeft')
  }
}


class HomePage extends Component {
  constructor(props) {
	super(props)
  	this.state = {
  		hover: false
  	}
  }

  toggleHover = () => {
    this.setState({hover: !this.state.hover})
  }

  render = () => {
    console.log("HomePage render");

    let linkStyle
    if(this.state.hover){
      linkStyle = [styles.rotateInDownLeftZoomInLeft, {color: 'pink'}]
    }
    else {
      linkStyle = styles.bounce
    }

    return (
      <StyleRoot>
        <Container>
          <Row>
            <Col>
              <Card>
                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  <Button style={linkStyle} onMouseEnter={this.toggleHover}>Button</Button>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  <Button style={linkStyle} onMouseEnter={this.toggleHover}>Button</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>1 of 3</Col>
            <Col>
              <button style={linkStyle} onMouseLeave={this.toggleHover}>HomePage</button>
            </Col>
            <Col>3 of 3</Col>
          </Row>
        </Container>
      </StyleRoot>
    )
  }
}

export default HomePage
