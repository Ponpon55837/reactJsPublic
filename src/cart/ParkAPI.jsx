import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Container, Row, Col, Card, CardGroup, Carousel, Button } from 'react-bootstrap'

const ParkAPI = ({ parkAPI }) => {

  return (
    <React.Fragment>
      <center><h1>Park List</h1></center>
      {
        parkAPI.map( (park, parkIndex) => (
          <Card>
            <Card.Body key={park.areaId}>
              <Card.Title>{park.parkId}</Card.Title>
              <Card.Text>停車場：{park.parkName}</Card.Text>
              <Card.Text>收費方式：{park.payGuide}</Card.Text>
              <Card.Text>地址：{park.address}</Card.Text>
            </Card.Body>
          </Card>
        ))
      }
    </React.Fragment>
  )
}

export default ParkAPI
