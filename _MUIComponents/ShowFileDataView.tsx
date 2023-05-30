import { useLocales } from '@locales/index'
import { EditFileDiv, EditSubTitle } from '@styles/styles_normal/generalStyle'
import { COMPONENTS_COMMON_GREY } from '@theme/colorManager'

interface InputData {
  fileObjects: any[]
}

const ShowFileObjectsView = ({ fileObjects }: InputData) => {
  const { t } = useLocales()

  return (
    <>
      {fileObjects.length > 0 && (
        <EditSubTitle variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
          {`${t('UPLOAD_FILE.attachedSubTitle')}`}
        </EditSubTitle>
      )}

      {fileObjects.map((file: { id: number; name: string; link: string }, idx: number) => (
        <EditFileDiv key={idx} sx={{ backgroundColor: COMPONENTS_COMMON_GREY }}>
          <a
            title={`${t('UPLOAD_FILE.clickDownload')}： ${file?.name}`}
            href={file.link}
            style={{ textDecoration: 'none' }}
          >
            {file?.name.length > 20
              ? file?.name.slice(0, 20) + '... .' + file?.name.split('.').pop()
              : file?.name}
          </a>
        </EditFileDiv>
      ))}
    </>
  )
}

export default ShowFileObjectsView
