import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Container, Row, Col, Card, CardGroup, Carousel, Button } from 'react-bootstrap'

const TestPage = ({ testPages }) => {

  return (
    <React.Fragment>
      <center><h1>Contact List</h1></center>
      {
        testPages.map( (testPage, testPageIndex) => (
          <Card>
            <Card.Body {...testPage} key={testPageIndex.toString()} >
              <Card.Title>{testPage.id}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{testPage.name}</Card.Subtitle>
              <Card.Text>{testPage.folders.owner}</Card.Text>
              <Card.Text>{testPage.folders.id}</Card.Text>
              <Card.Text>{testPage.folders.description}</Card.Text>
            </Card.Body>
          </Card>
        ))
      }
    </React.Fragment>
  )
}

export default TestPage
