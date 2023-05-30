import { useImmer } from 'use-immer'
import { useLocales } from '@locales/index'
import CloseIcon from '@mui/icons-material/Close'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { IconButton, Typography } from '@mui/material'
import { CustomBox2 } from '@styles/styles_normal/boxStyle'
import { EditFileDiv, EditSubTitle } from '@styles/styles_normal/generalStyle'
import {
  COMPONENTS_COMMON_CLEAN_GREY_WHITE,
  COMPONENTS_COMMON_DEEP_BLUE,
  COMPONENTS_COMMON_GREY,
  COMPONENTS_COMMON_LOW_GREY_BLUE,
  COMPONENTS_COMMON_LOW_GREY_WHITE,
} from '@theme/colorManager'

interface InputData {
  label?: string
  titleName?: string
  fileObjects: any[]
  uploadFile: any[]
  setUploadFile: any
  produceFunc: any
  labelAcceptFile?: string
  acceptFile?: string
  fileCountLimit?: number
  fileSizeLimit?: number
  fileNameLengthLimit?: number
}

const UploadMultiFile = ({
  label = 'icon-button-file',
  titleName = '',
  fileObjects,
  uploadFile,
  setUploadFile,
  produceFunc,
  labelAcceptFile = 'JPG, PNG, PDF',
  acceptFile = 'image/jpg, image/jpeg, image/png, .csv, .pdf',
  // 檔案數量限制
  fileCountLimit = 5,
  // 檔案大小限制(MB)
  fileSizeLimit = 10,
  // 檔名長度限制
  fileNameLengthLimit = 20,
}: InputData) => {
  const { t } = useLocales()
  const [state, produce] = useImmer({
    checkFileSize: false,
    limitLength: false,
  })

  const { checkFileSize, limitLength } = state

  // 先清空路徑
  const onImageClick = (event: any) => {
    event.target.value = ''
  }

  return (
    <>
      {fileObjects.length + uploadFile?.length < fileCountLimit && (
        <>
          <EditSubTitle variant="subtitle1" fontWeight={500}>
            {titleName !== '' ? titleName : null} {`${t('UPLOAD_FILE.attachedUpload')}`} ({' '}
            {labelAcceptFile} )
          </EditSubTitle>

          <CustomBox2>
            <label htmlFor={label}>
              <input
                id={label}
                type="file"
                accept={acceptFile}
                style={{ display: 'none' }}
                onClick={onImageClick}
                onChange={(e) => {
                  const getFileLimitLength = uploadFile?.length + fileObjects.length
                  if (
                    e.target.files !== null &&
                    getFileLimitLength < fileCountLimit &&
                    e.target.files.length > 0 &&
                    e.target.files[0].size < fileSizeLimit * 1024 * 1024
                  ) {
                    const getFileValue = {
                      id: e.target.files[0].name,
                      file: e.target.files[0],
                    }
                    const storeValue = [...uploadFile, getFileValue]
                    setUploadFile(storeValue)
                  } else if (getFileLimitLength === fileCountLimit) {
                    produce((draft) => {
                      draft.limitLength = true
                    })
                  } else if (
                    e.target.files !== null &&
                    e.target?.files[0].size >= fileSizeLimit * 1024 * 1024
                  ) {
                    produce((draft) => {
                      draft.checkFileSize = true
                    })
                  }
                }}
              />
              <div
                color="primary"
                aria-label="upload picture"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: COMPONENTS_COMMON_CLEAN_GREY_WHITE,
                  borderRadius: '5px',
                  border: `3px dashed ${COMPONENTS_COMMON_LOW_GREY_WHITE}`,
                  textAlign: 'center',
                }}
                title={`${t('UPLOAD_FILE.clickUpload')} ( ${labelAcceptFile} )`}
              >
                <PhotoCamera
                  sx={{
                    fontSize: '6rem',
                    color: COMPONENTS_COMMON_LOW_GREY_BLUE,
                    '&:hover': { color: COMPONENTS_COMMON_DEEP_BLUE, cursor: 'pointer' },
                  }}
                />
              </div>
            </label>

            {checkFileSize && (
              <Typography variant="body2" color="error">
                {`${t('UPLOAD_FILE.attachedFileSizeLimit', { fileSizeLimit: fileSizeLimit })}`}
              </Typography>
            )}
            {limitLength && (
              <Typography variant="body2" color="error">
                {`${t('UPLOAD_FILE.attachedFileCountLimit', { fileCountLimit: fileCountLimit })}`}
              </Typography>
            )}
          </CustomBox2>
        </>
      )}
      {fileObjects.length + uploadFile?.length > 0 && (
        <EditSubTitle variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
          {titleName !== '' ? titleName : null} {`${t('UPLOAD_FILE.attachedSubTitle')}`}
        </EditSubTitle>
      )}
      {fileObjects.map((file: { id: number | string; name: string; link: string }, idx: number) => (
        <EditFileDiv key={idx} sx={{ backgroundColor: COMPONENTS_COMMON_GREY }}>
          <a
            title={`${t('UPLOAD_FILE.clickDownload')}： ${file?.name}`}
            rel="noreferrer"
            target="_blank"
            href={file.link}
            style={{ textDecoration: 'none' }}
          >
            {file?.name.length > fileNameLengthLimit
              ? file?.name.slice(0, fileNameLengthLimit) + '... .' + file?.name.split('.').pop()
              : file?.name}
          </a>
          <IconButton
            edge="end"
            color="error"
            onClick={() => {
              const newFileObjects = fileObjects.filter(
                (item: { id: number | string }) => item.id !== file.id,
              )
              produceFunc(newFileObjects)
            }}
            aria-label="close"
          >
            <CloseIcon
              sx={{
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
            />
          </IconButton>
        </EditFileDiv>
      ))}
      {uploadFile &&
        uploadFile.map((file: { id: number }, idx) => (
          <EditFileDiv key={idx}>
            <div style={{ display: 'inline-block' }}>{file.id}</div>
            <IconButton
              edge="end"
              color="error"
              onClick={() => {
                const newFileObjects = uploadFile.filter((item, index) => idx !== index)
                setUploadFile(newFileObjects)
              }}
              aria-label="close"
            >
              <CloseIcon
                sx={{
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                }}
              />
            </IconButton>
          </EditFileDiv>
        ))}
    </>
  )
}

export default UploadMultiFile
