import React, { ChangeEvent, createRef } from 'react'
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

interface ImageItem {
  name: string
  file: any
  image: any
}

interface InitialImageItem {
  id: string
  name: string
  link: string
}

interface MultiImgProps {
  localStoreImgArr: ImageItem[]
  initialImgArr: InitialImageItem[]
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleLocalImageDelete: (idx: number) => void
  handleInitialImageDelete: (idx: number) => void
  viewStatus?: boolean
  imageLengthLimit?: number
}

const MultiImg: React.FC<MultiImgProps> = ({
  localStoreImgArr,
  initialImgArr,
  onImageChange,
  handleLocalImageDelete,
  handleInitialImageDelete,
  viewStatus = false,
  imageLengthLimit = 10,
}) => {
  const { t } = useLocales()
  const fieldImgRef = createRef<HTMLInputElement>()
  const [state, produce] = useImmer<{ showFullImage: boolean; fullImage: string | null }>({
    showFullImage: false,
    fullImage: null,
  })

  const onImageClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.currentTarget.value = ''
  }

  const handleImageClick = () => {
    const fileElem = fieldImgRef.current
    if (fileElem) {
      fileElem.click()
    }
  }

  const totalLength = localStoreImgArr.length + initialImgArr.length

  const handleImageShow = (link: string) => {
    // 顯示放大的圖片
    produce((draft) => {
      draft.fullImage = link
      draft.showFullImage = true
    })
  }

  const handleImageClose = () => {
    // 關閉放大的圖片
    produce((draft) => {
      draft.fullImage = null
      draft.showFullImage = false
    })
  }

  return (
    <CustomBox2>
      {/* 顯示圖片區域 */}
      <Grid container spacing={0.5}>
        {/* 上傳圖片的按鈕 */}
        {!viewStatus && totalLength < imageLengthLimit && (
          <CenterGrid item xs={6} md={3} lg={2.4}>
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              hidden
              ref={fieldImgRef}
              onClick={onImageClick}
              onChange={onImageChange}
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

        {/* 顯示本地上傳的圖片 */}
        {localStoreImgArr.map((items: ImageItem, idx: number) => (
          <CenterGrid item xs={6} md={3} lg={2.4} key={idx}>
            <StyledPointerBox>
              {!viewStatus && (
                <StyledImageClosed>
                  <CloseIconButton
                    sx={{ color: '#797979' }}
                    onClick={() => {
                      // 刪除本地上傳的圖片
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

        {/* 顯示初始圖片 */}
        {initialImgArr.map((imgItem: InitialImageItem, imgIdx: number) => (
          <CenterGrid item xs={6} md={3} lg={2.4} key={imgIdx}>
            <StyledPointerBox>
              {!viewStatus && (
                <StyledImageClosed>
                  <CloseIconButton
                    sx={{ color: '#797979' }}
                    onClick={() => {
                      // 刪除初始圖片
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

      {/* 顯示放大的圖片 */}
      {state.showFullImage && (
        <FullScreenImagePreview image={state.fullImage} onClick={handleImageClose} />
      )}
    </CustomBox2>
  )
}

export default MultiImg
