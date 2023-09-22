/* eslint-disable max-len */
import React from 'react'
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import useAdmin from 'src/service/AdminService'
import { useImmer } from 'use-immer'
import { AdminBackDrop as BackDrop } from '@components/BackDrop'
import MultiImage from '@components/MultiImg'
import { FlowProps } from '@components/NestTicketFlow/FlowFiledInterface'
import TicketsTextField from '@components/NestTicketFlow/TicketsTextField'
import { StylesTaskAddButton, StylesTaskDeleteButton } from '@components/NestTicketFlow/styles'
import { AdminSelectAutoComplete as SelectAutoComplete } from '@components/SelectAutoComplete'
import { AdminSelectGroupAutoComplete as SelectGroupAutoComplete } from '@components/SelectGroupAutoComplete'
import { useLocales } from '@locales/index'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import DeleteIcon from '@mui/icons-material/Delete'
import LinkIcon from '@mui/icons-material/Link'
import { Divider, Grid, Link } from '@mui/material'
import { CustomBox2, CustomBox3 } from '@styles/styles_normal/boxStyle'
import { EditSubTitle } from '@styles/styles_normal/generalStyle'
import { ADMIN_TABLE_BG_WHITE, WEB_BORDER_DARK, WEB_COMMON_WHITE_GREY } from '@theme/colorManager'
import Regex from '@utils/regex'
import { HandleFormError, HasValueNotEmpty } from '@utils/utilsFunction'

const backSx = {
  background: ADMIN_TABLE_BG_WHITE,
  border: `1px solid #DDDDDD`,
}

const frontSx = {
  background: 'none',
  border: `2px solid ${WEB_BORDER_DARK}`,
  color: WEB_COMMON_WHITE_GREY,
}

const TaskStructure = ({
  nestIndex,
  viewStatus = false,
  control,
  register,
  watch,
  setValue,
  getValues,
  errors,
  locationOptions,
  equipmentOptions,
  getEquipmentOptionList,
  uploadAPI = 'CleanTicket',
  colorStyle = 'back',
}: {
  nestIndex: number
  viewStatus: boolean
  control: Control<FlowProps>
  register: UseFormRegister<FlowProps>
  setValue: UseFormSetValue<FlowProps>
  getValues: UseFormGetValues<FlowProps>
  watch: UseFormWatch<FlowProps>
  errors: any
  locationOptions: Array<{ id: string; name: string; group: string }>
  equipmentOptions: { id: string; name: string }[]
  getEquipmentOptionList: (zoneId: string) => void
  uploadAPI: string
  colorStyle: 'back' | 'front'
}) => {
  const { t } = useLocales()
  const { postFileArrayUpload } = useAdmin()
  const { fields, insert, remove } = useFieldArray({
    control,
    name: `workflowStepData.${nestIndex}.workflowTaskData` as const,
  })

  const [state, produce] = useImmer({
    subLoading: false,
  })

  const { subLoading } = state

  const viewLabelText = (label: string) => {
    return viewStatus ? `${label}` : `* ${label}`
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
    <div
      style={{
        borderRadius: '10px',
      }}
    >
      {fields.map((field, taskIndex) => {
        // 設定一個變數名稱來取取代 `workflowStepData.${nestIndex}.workflowTaskData.${taskIndex}`
        const propertyPath = `workflowStepData.${nestIndex}.workflowTaskData.${taskIndex}` as const
        // 編輯時後端給的圖片資料
        const getInitialImgArray = watch(`${propertyPath}.fileObjects`) ?? []
        // 新增或編輯時上傳完圖片後，後端回返的字串組成陣列
        const getArrayValue = watch(`${propertyPath}.pictureArray`) ?? []
        // 新增或編輯時，本地端組成的圖片陣列
        const getStoreImgArrValue = watch(`${propertyPath}.storeImgArr`) ?? []

        const onImageChange = (event: any) => {
          if (!(event.target.files && event.target.files[0])) return
          let file = event.target.files[0]
          let reader = new FileReader()

          reader.readAsDataURL(file)
          reader.onload = async () => {
            produce((draft) => {
              draft.subLoading = true
            })
            const { status, result } = await postFileArrayUpload(uploadAPI, [file])
            if (status === 200) {
              getArrayValue?.splice(0, 0, result)
              getStoreImgArrValue?.splice(0, 0, {
                name: file.name,
                file: file,
                image: reader.result,
              })
              setValue(`${propertyPath}.pictureArray`, getArrayValue)
              setValue(`${propertyPath}.storeImgArr`, getStoreImgArrValue)
            }
            produce((draft) => {
              draft.subLoading = false
            })
          }
        }

        // 新增或編輯本地端圖片與上傳後回返圖片字串陣列刪除
        const handleLocalImageDelete = (idx: any) => {
          const newSpliceImgArr = getArrayValue
          const newSpliceStoreArr = getStoreImgArrValue
          newSpliceImgArr?.splice(idx, 1)
          newSpliceStoreArr?.splice(idx, 1)
          setValue(`${propertyPath}.pictureArray`, newSpliceImgArr)
          setValue(`${propertyPath}.storeImgArr`, newSpliceStoreArr)
        }

        // 編輯時，刪除已有的圖片陣列
        const handleInitialImageDelete = (idx: any) => {
          const newSpliceInitialImgArr = getInitialImgArray
          newSpliceInitialImgArr?.splice(idx, 1)
          setValue(`${propertyPath}.fileObjects`, newSpliceInitialImgArr)
        }

        return (
          <div
            key={field.id}
            style={{
              borderRadius: '10px',
              padding: '0.5rem 1rem',
              marginBottom: '8px',
              position: 'relative',
              ...returnSx(),
            }}
          >
            <EditSubTitle variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
              {`${t('COMMON.task')} ${nestIndex + 1}.${taskIndex + 1}`}
            </EditSubTitle>
            <CustomBox3 sx={{ position: 'absolute', top: '0.5rem', right: 0 }}>
              {fields?.length > 1 && !viewStatus && (
                <StylesTaskDeleteButton
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon fontSize="small" />}
                  onClick={() => remove(taskIndex)}
                >
                  Delete
                </StylesTaskDeleteButton>
              )}
            </CustomBox3>

            {/* <Divider sx={{ opacity: 0 }} />

            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <SelectGroupAutoComplete
                  minWidth="100%"
                  required={!viewStatus}
                  viewStatus={viewStatus}
                  label={`${t('COMMON.location')}`}
                  name={`${propertyPath}.locationLevelId`}
                  control={control}
                  selectOptions={locationOptions}
                  triggerOnChange={() => {
                    setValue(
                      `${propertyPath}.locationZoneId`,
                      null,
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SelectAutoComplete
                  minWidth="100%"
                  required={!viewStatus}
                  viewStatus={viewStatus}
                  label={`${t('COMMON.area')}`}
                  name={`${propertyPath}.locationZoneId`}
                  control={control}
                  disabled={
                    !HasValueNotEmpty(
                      watch(
                        `${propertyPath}.locationLevelId`,
                      ),
                    )
                  }
                  selectOptions={
                    locationOptions
                      .filter(
                        (fil: { id: string | number }) =>
                          fil.id ===
                          getValues(
                            `${propertyPath}.locationLevelId`,
                          ),
                      )
                      .map((item: any) => item.locationZoneData)[0]
                  }
                  triggerOnChange={() => {
                    setValue(
                      `${propertyPath}.equipmentId`,
                      null,
                    )
                    const getZoneId = getValues(
                      `${propertyPath}.locationZoneId`,
                    )
                    HasValueNotEmpty(getZoneId) && getEquipmentOptionList(getZoneId!)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SelectAutoComplete
                  minWidth="100%"
                  viewStatus={viewStatus}
                  label={`${t('REPAIR_COMMON.equipment')}`}
                  name={`${propertyPath}.equipmentId`}
                  control={control}
                  disabled={
                    !HasValueNotEmpty(
                      watch(
                        `${propertyPath}.locationZoneId`,
                      ),
                    )
                  }
                  selectOptions={equipmentOptions}
                />
              </Grid>
            </Grid> */}

            <CustomBox2>
              <TicketsTextField
                label={viewLabelText(`${t('COMMON.taskTitle')} ${taskIndex + 1}`)}
                placeholder={viewStatus ? '' : `${t('COMMON.taskTitlePlaceholder')}`}
                readOnly={viewStatus}
                iconStatus
                colorStyle={colorStyle}
                register={{
                  ...register(`${propertyPath}.name` as const, {
                    required: `${t('COMMON.taskTitlePlaceholder')}`,
                    maxLength: {
                      value: 100,
                      message: `${t('COMMON.maxLengthMessage', { count: 100 })}`,
                    },
                  }),
                }}
                error={HandleFormError(
                  errors?.workflowStepData?.[nestIndex]?.workflowTaskData?.[taskIndex]?.name?.type,
                )}
                helperText={
                  errors?.workflowStepData?.[nestIndex]?.workflowTaskData?.[taskIndex]?.name
                    ?.type &&
                  errors?.workflowStepData?.[nestIndex]?.workflowTaskData?.[taskIndex]?.name
                    ?.message
                }
              />
            </CustomBox2>

            <CustomBox2>
              {!viewStatus && (
                <TicketsTextField
                  colorStyle={colorStyle}
                  label={`${t('COMMON.taskLink')} ${taskIndex + 1}`}
                  placeholder={viewStatus ? '' : `${t('COMMON.taskLinkPlaceholder')}`}
                  readOnly={viewStatus}
                  iconStatus
                  icon={<LinkIcon fontSize="small" />}
                  register={{
                    ...register(`${propertyPath}.link` as const, {
                      pattern: {
                        value: Regex.SYSTEM_DOMAIN,
                        message: `${t('SYSTEM_CONFIG.urlPatternMessage')}`,
                      },
                    }),
                  }}
                  error={HandleFormError(
                    errors?.workflowStepData?.[nestIndex]?.workflowTaskData?.[taskIndex]?.link
                      ?.type,
                  )}
                  helperText={
                    errors?.workflowStepData?.[nestIndex]?.workflowTaskData?.[taskIndex]?.link
                      ?.type &&
                    errors?.workflowStepData?.[nestIndex]?.workflowTaskData?.[taskIndex]?.link
                      ?.message
                  }
                />
              )}

              {viewStatus && (
                <div style={{ display: 'inline-flex', wordBreak: 'break-all' }}>
                  <LinkIcon sx={{ my: 'auto', mr: 1 }} />
                  {watch(`${propertyPath}.link`) && (
                    <Link
                      underline="always"
                      rel="noreferrer"
                      target="_blank"
                      href={watch(`${propertyPath}.link`)}
                    >
                      {watch(`${propertyPath}.link`)}
                    </Link>
                  )}
                </div>
              )}
            </CustomBox2>

            <MultiImage
              localStoreImgArr={getStoreImgArrValue}
              initialImgArr={getInitialImgArray}
              {...{
                onImageChange,
                handleLocalImageDelete,
                handleInitialImageDelete,
                viewStatus,
              }}
            />
            {!viewStatus && (
              <StylesTaskAddButton
                variant="outlined"
                size="small"
                color="info"
                startIcon={<AddCircleSharpIcon />}
                onClick={() =>
                  insert(taskIndex + 1, {
                    name: '',
                    link: '',
                    locationLevelId: null,
                    locationZoneId: null,
                    equipmentId: null,
                    fileObjects: [],
                    pictureArray: [],
                    storeImgArr: [],
                  })
                }
              >
                Add Task
              </StylesTaskAddButton>
            )}
          </div>
        )
      })}
      <BackDrop backDropOpen={subLoading} />
    </div>
  )
}

export default TaskStructure
