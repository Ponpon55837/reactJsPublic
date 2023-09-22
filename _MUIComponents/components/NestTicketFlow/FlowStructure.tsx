import React from 'react'
import { useFieldArray } from 'react-hook-form'
import TaskStructure from '@components/NestTicketFlow/TaskStructure'
import TicketsTextField from '@components/NestTicketFlow/TicketsTextField'
import {
  StylesFlowAddButton,
  StylesFlowDeleteButton,
  StylesFlowSmallAddButton,
  StylesNoDataTypography,
} from '@components/NestTicketFlow/styles'
import { useLocales } from '@locales/index'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import DeleteIcon from '@mui/icons-material/Delete'
import { CustomBox2, CustomBox3 } from '@styles/styles_normal/boxStyle'
import { EditSubTitle } from '@styles/styles_normal/generalStyle'
import { WEB_BORDER_DARK } from '@theme/colorManager'
import { HandleFormError } from '@utils/utilsFunction'

const FlowStructure = ({
  control,
  register,
  setValue,
  getValues,
  watch,
  errors,
  viewStatus = false,
  locationOptions,
  equipmentOptions,
  getEquipmentOptionList,
  uploadAPI = '',
  colorStyle = 'back',
}: {
  control: any
  register: any
  setValue: any
  getValues: any
  watch: any
  errors: any
  viewStatus?: boolean
  locationOptions: { id: string; name: string; group: string }[]
  equipmentOptions: { id: string; name: string }[]
  getEquipmentOptionList: (zoneId: string) => void
  uploadAPI: string
  colorStyle: 'front' | 'back'
}) => {
  const { t } = useLocales()
  // flow array
  const { append, remove, insert, fields } = useFieldArray({
    control,
    name: 'workflowStepData',
  })

  const viewLabelText = (label: string) => {
    return viewStatus ? `${label}` : `* ${label}`
  }

  const backSx = {
    background: WEB_BORDER_DARK, // #a4cee833
    border: `1px solid #DDDDDD`,
  }

  const frontSx = {
    background: 'none',
    border: `2px solid ${WEB_BORDER_DARK}`,
  }

  const returnSx = () => {
    switch (colorStyle) {
      case 'front':
        return frontSx
      case 'back':
        return backSx
      default:
        return backSx
    }
  }

  return (
    <>
      {fields?.length === 0 && viewStatus && (
        <StylesNoDataTypography>{`${t('TABLE.noData')}`}</StylesNoDataTypography>
      )}
      {fields?.map((field, index: number) => {
        return (
          <div
            key={field.id}
            style={{
              borderRadius: '10px',
              padding: '0.5rem 0.5rem 0.1rem 0.5rem',
              marginBottom: '0.5rem',
              position: 'relative',
              ...returnSx(),
            }}
          >
            <EditSubTitle variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
              {`${t('COMMON.workflow')} ${index + 1}`}
            </EditSubTitle>
            {!viewStatus && (
              <CustomBox3
                sx={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                }}
              >
                <StylesFlowDeleteButton
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon fontSize="small" />}
                  sx={{ mr: -1 }}
                  onClick={() => {
                    remove(index)
                  }}
                >
                  Delete
                </StylesFlowDeleteButton>
              </CustomBox3>
            )}

            <CustomBox2>
              <TicketsTextField
                colorStyle={colorStyle}
                label={viewLabelText(`${t('COMMON.workflowName')} ${index + 1}`)}
                placeholder={viewStatus ? '' : `${t('COMMON.workflowNamePlaceholder')}`}
                readOnly={viewStatus}
                iconStatus
                register={{
                  ...register(`workflowStepData.${index}.name` as const, {
                    required: `${t('COMMON.workflowNamePlaceholder')}`,
                    maxLength: {
                      value: 100,
                      message: `${t('COMMON.maxLengthMessage', { count: 100 })}`,
                    },
                  }),
                }}
                error={HandleFormError(errors?.workflowStepData?.[index]?.name?.type)}
                helperText={
                  errors?.workflowStepData?.[index]?.name?.type &&
                  errors?.workflowStepData?.[index]?.name?.message
                }
              />
            </CustomBox2>

            <TaskStructure
              nestIndex={index}
              viewStatus={viewStatus}
              uploadAPI={uploadAPI}
              {...{
                control,
                register,
                setValue,
                getValues,
                watch,
                errors,
                locationOptions,
                equipmentOptions,
                getEquipmentOptionList,
                colorStyle,
              }}
            />
            {!viewStatus && (
              <StylesFlowSmallAddButton
                variant="outlined"
                size="small"
                color="info"
                startIcon={<AddCircleSharpIcon />}
                onClick={() =>
                  insert(index + 1, {
                    name: '',
                    workflowTaskData: [
                      {
                        name: '',
                        link: '',
                        locationLevelId: null,
                        locationZoneId: null,
                        equipmentId: null,
                        fileObjects: [],
                        pictureArray: [],
                        storeImgArr: [],
                      },
                    ],
                  })
                }
              >
                Add Flow
              </StylesFlowSmallAddButton>
            )}
          </div>
        )
      })}

      {!viewStatus && fields?.length === 0 && (
        <StylesFlowAddButton
          variant="outlined"
          size="small"
          color="info"
          startIcon={<AddCircleSharpIcon />}
          onClick={() =>
            append({
              name: '',
              workflowTaskData: [
                { name: '', link: '', fileIdSet: [], pictureArray: [], storeImgArr: [] },
              ],
            })
          }
        >
          Add Flow
        </StylesFlowAddButton>
      )}
    </>
  )
}

export default FlowStructure
