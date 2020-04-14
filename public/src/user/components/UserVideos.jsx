import React from 'react'
import { Container, Row, Col, Card, CardGroup, Carousel, Button } from 'react-bootstrap'

const iframStyle = {
  width: 'auto',
  height: 'auto',
}

const UserVideos = ({ likes }) => {
  console.log("UserVideos render")

  return (
    <Card>
      <Card.Body>
        {
          likes.map((videoUrl) => {
            return (
              // 文字格式
              //<p key={videoUrlLink}>{videoUrlLink}</p>
              // iframe格式
              <iframe style={iframStyle} src={videoUrl} key={videoUrl}></iframe>  
            )
          })
        }
      </Card.Body>
    </Card>
  )
}


export default UserVideos;
