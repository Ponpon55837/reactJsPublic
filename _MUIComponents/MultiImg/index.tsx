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

const MultiImg = ({
  localStoreImgArr,
  initialImgArr,
  onImageChange,
  handleLocalImageDelete,
  handleInitialImageDelete,
  viewStatus = false,
  imageLengthLimit = 10,
}: {
  localStoreImgArr: {
    name: string
    file: any
    image: any
  }[]
  initialImgArr: { id: string; name: string; link: string }[]
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleLocalImageDelete: (e: number) => void
  handleInitialImageDelete: (e: number) => void
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

  const totalLength = localStoreImgArr?.length + initialImgArr?.length
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
    <CustomBox2>
      <Grid container spacing={0.5}>
        {!viewStatus && totalLength < imageLengthLimit && (
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

        {localStoreImgArr?.map((items: any, idx: number) => (
          <CenterGrid item xs={6} md={3} lg={2.4} key={idx}>
            <StyledPointerBox>
              {!viewStatus && (
                <StyledImageClosed>
                  <CloseIconButton
                    sx={{ color: '#797979' }}
                    onClick={() => {
                      handleLocalImageDelete(idx)
                    }}
                  >
                    <CancelIcon />
                  </CloseIconButton>
                </StyledImageClosed>
              )}
              <NewImageBox
                sx={{ borderRadius: '10px' }}
                onClick={() => handleImageShow(items.image)}
              >
                <Image src={items.image} alt="picture" />
              </NewImageBox>

              <StyledImgTextBox onClick={() => handleImageShow(items.image)}>
                <StyledImgText>{items.name}</StyledImgText>
              </StyledImgTextBox>
            </StyledPointerBox>
          </CenterGrid>
        ))}

        {initialImgArr?.map((imgItem: { name: string; link: string }, imgIdx: number) => (
          <CenterGrid item xs={6} md={3} lg={2.4} key={imgIdx}>
            <StyledPointerBox>
              {!viewStatus && (
                <StyledImageClosed>
                  <CloseIconButton
                    sx={{ color: '#797979' }}
                    onClick={() => {
                      handleInitialImageDelete(imgIdx)
                    }}
                  >
                    <CancelIcon />
                  </CloseIconButton>
                </StyledImageClosed>
              )}
              <NewImageBox
                sx={{ borderRadius: '10px' }}
                onClick={() => handleImageShow(imgItem.link)}
              >
                <Image src={imgItem.link} alt="picture" />
              </NewImageBox>

              <StyledImgTextBox onClick={() => handleImageShow(imgItem.link)}>
                <StyledImgText>{imgItem.name}</StyledImgText>
              </StyledImgTextBox>
            </StyledPointerBox>
          </CenterGrid>
        ))}
      </Grid>

      {/* 放大圖片 */}
      {state.showFullImage && (
        <FullScreenImagePreview image={state.fullImage} onClick={handleImageClose} />
      )}
    </CustomBox2>
  )
}

export default MultiImg
