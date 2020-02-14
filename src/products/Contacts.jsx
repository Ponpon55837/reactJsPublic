import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Container, Row, Col, Card, CardGroup, Carousel, Button } from 'react-bootstrap'

const Contacts = ({ contacts }) => {

  return (
    <React.Fragment>
      <center><h1>Contact List</h1></center>
      {
        contacts.map( (contact, contactIndex) => (
          <Card>
            <Card.Body key={contactIndex}>
              <Card.Title>{contact.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{contact.email}</Card.Subtitle>
              <Card.Text>{contact.company.catchPhrase}</Card.Text>
              <Card.Text>{contact.phone}</Card.Text>
              <Card.Text>{contact.address.street}</Card.Text>
            </Card.Body>
          </Card>
        ))
      }
    </React.Fragment>
  )
}

export default Contacts
