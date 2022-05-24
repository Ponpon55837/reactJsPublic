import { useState } from 'react'
import { FormLabel, Backdrop, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import Carousel from 'react-grid-carousel'
import PropTypes from 'prop-types'

const StyledDiv = styled('div')(() => ({
  width: 'fit-content !important',
  margin: '0 auto',
  '& .bVoXXg': {
    width: 'fit-content !important',
    margin: '0 auto',
  },
}))

const BackDrop = ({ backDropOpen = false, onClick, content }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: 6000 }} open={backDropOpen} onClick={onClick}>
      <Typography
        sx={{
          color: '#fff',
          zIndex: 7000,
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        <CloseIcon
          sx={{
            fontSize: '3rem',
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#32404F', borderRadius: '3rem' },
          }}
        />
      </Typography>
      <img
        title="點擊關閉圖片"
        alt="放大圖片"
        width="auto"
        height="100%"
        style={{ alignContent: 'center', cursor: 'pointer' }}
        src={content}
      />
    </Backdrop>
  )
}

const CustomCarouselArray = ({ imgArr }) => {
  const [open, setOpen] = useState(false)
  const [addImg, setAddImg] = useState('')

  return (
    <StyledDiv>
      <Carousel
        cols={1}
        rows={1}
        gap={1}
        loop
        showDots={imgArr.length !== 1}
        hideArrow={imgArr.length === 1}
      >
        {imgArr.map((img, index) => (
          <Carousel.Item key={index}>
            <FormLabel
              component="legend"
              sx={{
                zIndex: 7000,
                position: 'absolute',
                display: 'block',
                ml: '.2rem',
                fontSize: '1rem',
                fontWeight: 600,
                WebkitTextFillColor: '#1E333F',
                WebkitTextStroke: '1px white',
              }}
            >{`${index + 1}/${imgArr.length}`}</FormLabel>
            <img
              title="點擊查看放大圖片"
              alt={`圖片 ${index + 1}`}
              width="100%"
              height="auto"
              style={{ cursor: 'pointer', objectFit: 'none' }}
              src={img}
              onClick={() => {
                setAddImg(img)
                setOpen(!open)
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <BackDrop
        backDropOpen={open}
        content={addImg}
        onClick={() => {
          setOpen(!open)
          setAddImg('')
        }}
      />
    </StyledDiv>
  )
}

export default CustomCarouselArray

CustomCarouselArray.propTypes = {
  imgArr: PropTypes.array,
}

BackDrop.propTypes = {
  backDropOpen: PropTypes.bool,
  onClick: PropTypes.func,
  content: PropTypes.string,
}
