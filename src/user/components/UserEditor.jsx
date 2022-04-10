import React from 'react'
import { Container, Row, Col, Card, CardGroup, Carousel, Button } from 'react-bootstrap'

const fragmentStyle = {
  marginTop: '30px',
  marginBottom: '30px',
}

// 原本寫成 const UserEditor = (props, handler) => {
const UserEditor = ({ user, handler }) => {
  // 原本寫成 const {user} = props
  const { id, name, email, description} = user

  let textareaHandler = (e) => {
    const {name, value} = e.target
    // 在handler中放入 {name , value}的值
    handler("user", {...user, [name]: value})
  }

  console.log("UserEditor render")

  // 因為使用textarea的關係,所以value值要直接寫進來,而不是放在textarea之間</textarea>
  // 因為這邊用是let textareaHandler 是變數所以不用this.textareaHandler
  return (
    <React.Fragment>
      <Card style={fragmentStyle}>
        <Card.Body>
          <Card.Title>{id}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{name}</Card.Subtitle>
          <Card.Text>{email}</Card.Text>
          <Card.Text>
            <textarea
              name="description"
              rows="10"
              value={description}
              onChange={textareaHandler}
            ></textarea>
          </Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default UserEditor
