import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Container, Row, Col, Card, CardGroup, Carousel, Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


const useStyles = makeStyles(
  theme => ({
    rootBorder: {
      width: '100%',
      marginBottom: '2rem',
    },
    root: {
      width: '100%',
      marginBottom: '1rem',
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }
))


const Contacts = ({ contacts }) => {
  const classes = useStyles();

  return (
    <div className={classes.rootBorder}>
      <center><h1>Contact List</h1></center>
      {
        contacts.map( (contact, contactIndex) => (
          <div className={classes.root} {...contact} key={contactIndex.toString()}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="{contact.id}a-content"
                id={contact.id}
              >
                <Typography className={classes.heading}>{contact.name}，{contact.email}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                {contact.company.catchPhrase}，{contact.phone}，{contact.address.street}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        ))
      }
    </div>
  )
}

export default Contacts

// <Card>
//   <Card.Body {...contact} key={contactIndex.toString()} >
//     <Card.Title>{contact.name}</Card.Title>
//     <Card.Subtitle className="mb-2 text-muted">{contact.email}</Card.Subtitle>
//     <Card.Text>{contact.company.catchPhrase}</Card.Text>
//     <Card.Text>{contact.phone}</Card.Text>
//     <Card.Text>{contact.address.street}</Card.Text>
//   </Card.Body>
// </Card>
