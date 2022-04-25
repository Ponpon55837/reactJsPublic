import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PropTypes from 'prop-types'

const Input = styled('input')({
  display: 'none',
})

const UploadImage = ({
  ImgError = false,
  ImgRef,
  Image,
  onChange = () => {},
  deleteFunc = () => {},
}) => {
  return (
    <>
      <label>
        {Image?.length > 0 && <img src={Image} alt="preview img" width={500} />}
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
          <PhotoCamera size="small" />
        </IconButton>
        <Typography variant="subtitle" sx={{ display: !ImgError && 'none', color: 'red' }}>
          請確認文件是否存在且檔案大小不能超過 2 MB
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
        <DeleteForeverIcon size="small" />
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
