import React from 'react'

const UserVideos = (props) => {
  const {user} = props
  return (
    <div>
      {
        user.videos.likes.map((videoUrlLink) => {
          return(
            // 文字格式
            //<p key={videoUrlLink}>{videoUrlLink}</p>
            // iframe格式
            <iframe src={videoUrlLink} key={videoUrlLink}></iframe>
          )
        })
      }
    </div>
  )
}

export default UserVideos
