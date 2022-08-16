import { useState } from 'react'
import { Backdrop, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import Carousel from 'react-grid-carousel'
import PropTypes from 'prop-types'

const StyledDiv = styled('div')(() => ({
  width: 'fit-content !important',
  margin: '0 auto',
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
        alt={`圖片${content}`}
        width="auto"
        height="100%"
        style={{ alignContent: 'center', cursor: 'pointer', objectFit: 'contain' }}
        src={content}
      />
    </Backdrop>
  )
}

const CustomCarousel = ({ inputImg }) => {
  const [open, setOpen] = useState(false)
  const [addImg, setAddImg] = useState('')

  return (
    <StyledDiv>
      <Carousel cols={1} rows={1} gap={10} loop hideArrow>
        <Carousel.Item>
          <img
            title="點擊查看放大圖片"
            alt={`圖片${inputImg}`}
            width="100%"
            height="auto"
            style={{ cursor: 'pointer', objectFit: 'none' }}
            src={inputImg}
            onClick={() => {
              setAddImg(inputImg)
              setOpen(!open)
            }}
          />
        </Carousel.Item>
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

export default CustomCarousel

CustomCarousel.propTypes = {
  inputImg: PropTypes.string,
}

BackDrop.propTypes = {
  backDropOpen: PropTypes.bool,
  onClick: PropTypes.func,
  content: PropTypes.string,
}
