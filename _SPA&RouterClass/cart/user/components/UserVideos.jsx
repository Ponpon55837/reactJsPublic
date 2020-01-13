import React from 'react'

const UserVideos = ({ likes }) => {
  console.log("UserVideos render")

  return (<div>
    {
      likes.map((videoUrl) => {
        return (
          // 文字格式
          //<p key={videoUrlLink}>{videoUrlLink}</p>
          // iframe格式
          <iframe src={videoUrl} key={videoUrl}></iframe>
        )
      })
    }
  </div>)
}


export default UserVideos;
