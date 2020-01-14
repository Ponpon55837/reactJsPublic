import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { fadeInDown, fadeInRight, fadeInLeft } from 'react-animations'
import Radium, {StyleRoot} from 'radium'
import { Container, Row, Col, Card, CardGroup, Carousel, Button } from 'react-bootstrap'

const styles = {
  fadeInDown: {
    animation: 'x 3s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  },
  fadeInLeft: {
    animation: 'x 3s',
    animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
  },
  fadeInRight: {
    animation: 'x 3s',
    animationName: Radium.keyframes(fadeInRight, 'fadeInRight')
  }
}

class Carousels extends Component {
  constructor(props){
    super(props)
  }

  render = () => {
    return (
      <StyleRoot>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images2.alphacoders.com/103/thumb-1920-1039238.jpg"
              alt="First slide"
              style={styles.fadeInRight}
              
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.alphacoders.com/104/thumb-1920-1044294.jpg"
              alt="Third slide"
              style={styles.fadeInDown}
              
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images2.alphacoders.com/103/thumb-1920-1039239.jpg"
              alt="Third slide"
              style={styles.fadeInLeft}
              
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </StyleRoot>
    )
  }
}

export default Carousels
