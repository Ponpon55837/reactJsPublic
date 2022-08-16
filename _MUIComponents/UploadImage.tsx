import { styled } from '@mui/material/styles'
import { Typography, IconButton } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PropTypes from 'prop-types'

const Input = styled('input')({
  display: 'none',
})

interface Props {
  ImgError?: boolean
  ImgRef?: React.Ref<HTMLInputElement>
  Image?: string
  onChange?: () => void
  deleteFunc?: () => void
  imgLimit?: number
}

const UploadImage = ({
  ImgError = false,
  ImgRef,
  Image,
  onChange = () => {},
  deleteFunc = () => {},
  imgLimit = 2,
}: Props) => {
  const imgLength: boolean = Image && Image?.length > 0 ? true : false

  return (
    <>
      <label>
        {imgLength && <img src={Image} alt="preview img" width={500} />}
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          ref={ImgRef}
          onChange={onChange}
          hidden
        />
        <IconButton
          color="primary"
          component="span"
          onClick={() => {}}
          sx={{
            display: Image !== undefined ? 'none' : 'flex',
            justifyContent: 'flex-start',
            width: 'fit-content',
          }}
        >
          <PhotoCamera fontSize="small" />
        </IconButton>
        <Typography
          variant="subtitle2"
          sx={{ display: !ImgError ? 'none' : 'default', color: 'red' }}
        >
          請確認文件是否存在且檔案大小不能超過 {imgLimit} MB
        </Typography>
      </label>
      <IconButton
        color="error"
        onClick={() => deleteFunc()}
        sx={{
          display: Image === undefined ? 'none' : 'flex',
          justifyContent: 'center',
          width: 'fit-content',
        }}
      >
        <DeleteForeverIcon fontSize="small" />
      </IconButton>
    </>
  )
}

export default UploadImage

UploadImage.propTypes = {
  ImgError: PropTypes.bool,
  ImgRef: PropTypes.object,
  Image: PropTypes.string,
  onChange: PropTypes.func,
  deleteFunc: PropTypes.func,
}
