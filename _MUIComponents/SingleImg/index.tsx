import React, { createRef } from 'react'
import { useImmer } from 'use-immer'
import Image from '@components/image'
import { useLocales } from '@locales/index'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import CancelIcon from '@mui/icons-material/Cancel'
import { Grid } from '@mui/material'
import { NewImageBox, StyledPointerBox } from '@styles/styles_normal/Web/addStyle'
import { CloseIconButton, FileIconButton } from '@styles/styles_normal/Web/buttonStyle'
import { CenterGrid } from '@styles/styles_normal/Web/commonStyle'
import {
  FullScreenImagePreview,
  StyledImageClosed,
  StyledImgText,
  StyledImgTextBox,
} from '@styles/styles_normal/Web/imageStyle'
import { CustomBox2 } from '@styles/styles_normal/boxStyle'

const SingleImg = ({
  localStoreImg,
  initialImg,
  onImageChange,
  handleLocalImageDelete,
  handleInitialImageDelete,
  viewStatus = false,
}: {
  localStoreImg: {
    name: string
    file: any
    image: any
  } | null
  initialImg: { id: string; name: string; link: string } | null
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleLocalImageDelete: () => void
  handleInitialImageDelete: () => void
  viewStatus: boolean
  imageLengthLimit?: number
}) => {
  const { t } = useLocales()
  const fieldImgRef = createRef() as any
  const [state, produce] = useImmer<{ showFullImage: boolean; fullImage: string | null }>({
    showFullImage: false,
    fullImage: null,
  })

  // 先清空路徑
  const onImageClick = (event: any) => {
    event.target.value = ''
  }

  // 點擊以選擇圖片
  const handleImageClick = () => {
    const fileElem = fieldImgRef.current
    if (fileElem) {
      fileElem.click()
    }
  }

  // 放大圖片
  const handleImageShow = (link: string) => {
    produce((draft) => {
      draft.fullImage = link
      draft.showFullImage = true
    })
  }
  // 縮小圖片
  const handleImageClose = () => {
    produce((draft) => {
      draft.fullImage = null
      draft.showFullImage = false
    })
  }

  return (
    <>
      <Grid container spacing={0.5}>
        {!viewStatus && !localStoreImg && !initialImg && (
          <CenterGrid item xs={6} md={3} lg={2.4}>
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              hidden
              ref={fieldImgRef}
              onClick={onImageClick}
              onChange={(event: any) => {
                onImageChange(event)
              }}
            />
            <StyledPointerBox onClick={handleImageClick}>
              <NewImageBox sx={{ borderRadius: '10px' }}>
                <FileIconButton>
                  <AddAPhotoIcon fontSize="large" />
                </FileIconButton>
              </NewImageBox>

              <StyledImgTextBox>
                <StyledImgText>{`${t('COMMON.addImage')}`}</StyledImgText>
              </StyledImgTextBox>
            </StyledPointerBox>
          </CenterGrid>
        )}

        <CenterGrid
          item
          xs={6}
          md={3}
          lg={2.4}
          sx={{ display: localStoreImg ? 'default' : 'none' }}
        >
          <StyledPointerBox>
            {!viewStatus && localStoreImg && (
              <StyledImageClosed>
                <CloseIconButton
                  sx={{ color: '#797979' }}
                  onClick={() => {
                    handleLocalImageDelete()
                  }}
                >
                  <CancelIcon />
                </CloseIconButton>
              </StyledImageClosed>
            )}
            <NewImageBox
              sx={{ borderRadius: '10px' }}
              onClick={() => handleImageShow(localStoreImg?.image)}
            >
              <Image src={localStoreImg?.image} alt="picture" />
            </NewImageBox>

            <StyledImgTextBox onClick={() => handleImageShow(localStoreImg?.image)}>
              <StyledImgText>{localStoreImg?.name}</StyledImgText>
            </StyledImgTextBox>
          </StyledPointerBox>
        </CenterGrid>

        <CenterGrid item xs={6} md={3} lg={2.4} sx={{ display: initialImg ? 'default' : 'none' }}>
          <StyledPointerBox>
            {!viewStatus && (
              <StyledImageClosed>
                <CloseIconButton
                  sx={{ color: '#797979' }}
                  onClick={() => {
                    handleInitialImageDelete()
                  }}
                >
                  <CancelIcon />
                </CloseIconButton>
              </StyledImageClosed>
            )}
            <NewImageBox
              sx={{ borderRadius: '10px' }}
              onClick={() => {
                if (initialImg) {
                  handleImageShow(initialImg?.link)
                }
              }}
            >
              <Image src={initialImg?.link} alt="picture" />
            </NewImageBox>
            <StyledImgTextBox
              onClick={() => {
                if (initialImg) {
                  handleImageShow(initialImg?.link)
                }
              }}
            >
              <StyledImgText>{initialImg?.name}</StyledImgText>
            </StyledImgTextBox>
          </StyledPointerBox>
        </CenterGrid>
      </Grid>

      {/* 放大圖片 */}
      {state.showFullImage && (
        <FullScreenImagePreview image={state.fullImage} onClick={handleImageClose} />
      )}
    </>
  )
}

export default SingleImg
