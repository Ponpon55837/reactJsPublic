import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { merge, bounce, fadeInDownBig, rotateInDownLeft, zoomInLeft } from 'react-animations'
import Radium, {StyleRoot} from 'radium'
import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap'


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
            <CardGroup>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to additional
                    content.{' '}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This card has even longer content than the first to
                    show that equal height action.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </CardGroup>
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
