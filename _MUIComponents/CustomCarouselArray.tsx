import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from '@components/image'
import { useLocales } from '@locales/index'
import CloseIcon from '@mui/icons-material/Close'
import { Backdrop, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  COMPONENTS_COMMON_GREY_BLUE,
  COMPONENTS_COMMON_GREY_WHITE,
  COMPONENTS_COMMON_PURE_BLACK,
  COMPONENTS_COMMON_PURE_WHITE,
} from '@theme/colorManager'

// requires a loader

const StyledDiv = styled('div')(() => ({
  width: 'fit-content !important',
  margin: '0 auto',
  '& .bVoXXg': {
    width: 'fit-content !important',
    margin: '0 auto',
  },
}))

interface backDropProps {
  backDropOpen: boolean
  onClick: () => void
  content: string
}

interface inputProps {
  imgArr: {
    id: string
    name: string
    link: string
  }[]
}

const BackDrop = ({ backDropOpen = false, onClick, content }: backDropProps) => {
  const { t } = useLocales()
  return (
    <Backdrop
      sx={{ color: COMPONENTS_COMMON_PURE_WHITE, zIndex: 6000 }}
      open={backDropOpen}
      onClick={onClick}
    >
      <Typography
        sx={{
          color: COMPONENTS_COMMON_PURE_WHITE,
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
            '&:hover': { backgroundColor: COMPONENTS_COMMON_GREY_BLUE, borderRadius: '3rem' },
          }}
        />
      </Typography>
      <Image
        title={`${t('CAROUSEL.clickCloseImg')}`}
        alt={`${t('CAROUSEL.clickCloseImg')}`}
        style={{ alignContent: 'center', cursor: 'pointer', height: '100%', width: 'auto' }}
        src={content}
      />
    </Backdrop>
  )
}

const CustomCarouselArray = ({ imgArr }: inputProps) => {
  const { t } = useLocales()
  const [open, setOpen] = useState(false)
  const [addImg, setAddImg] = useState('')

  return (
    <StyledDiv>
      <Carousel autoPlay infiniteLoop>
        {imgArr.map(({ id, name, link }) => (
          <div
            key={id}
            title={`${t('CAROUSEL.clickEnlarge')}`}
            onClick={() => {
              setAddImg(link)
              setOpen(!open)
            }}
          >
            <Image
              alt={`圖片 ${name + 1}`}
              style={{ cursor: 'pointer', objectFit: 'none', width: '100%', height: 'auto' }}
              src={link}
            />
            <Box
              sx={{
                position: 'absolute',
                backgroundColor: COMPONENTS_COMMON_PURE_BLACK,
                color: COMPONENTS_COMMON_GREY_WHITE,
                opacity: '0',
                borderRadius: '8px',
                bottom: '20%',
                width: '100%',
                height: '10%',
                '&:hover': { opacity: '.4' },
              }}
            >
              {name}
            </Box>
          </div>
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
