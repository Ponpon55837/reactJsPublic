import { useFieldArray } from 'react-hook-form'
import { useEffectOnce } from 'react-use'
import { useImmer } from 'use-immer'
import FreeSelectAutoComplete from '@components/NestPatrolFlow/FreeSoloSelect'
import TaskStructure from '@components/NestPatrolFlow/TaskStructure'
import {
  StylesFlowAddButton,
  StylesFlowDeleteButton,
  StylesFlowSmallAddButton,
  StylesNoDataTypography,
} from '@components/NestTicketFlow/styles'
import { AdminSelectGroupAutoComplete as SelectGroupAutoComplete } from '@components/SelectGroupAutoComplete'
import { useLocales } from '@locales/index'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import DeleteIcon from '@mui/icons-material/Delete'
import { Divider, Grid } from '@mui/material'
import { LOCATION_ZONE_OPTIONS } from '@service/API_Admin'
import useGeneralApi from '@service/GeneralAPIService'
import { CustomBox3 } from '@styles/styles_normal/boxStyle'
import { EditSubTitle } from '@styles/styles_normal/generalStyle'
import { ADMIN_TABLE_BG_WHITE, WEB_BORDER_DARK } from '@theme/colorManager'
import { HasValueNotEmpty } from '@utils/utilsFunction'

interface FlowProps {
  locationOptions: Array<{ id: string; name: string; group: string }>
}

const FlowStructure = ({
  control,
  register,
  setValue,
  getValues,
  watch,
  errors,
  viewStatus = false,
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
  uploadAPI: string
  colorStyle: 'front' | 'back'
}) => {
  const { t } = useLocales()
  // flow array
  const { append, remove, insert, fields } = useFieldArray({
    control,
    name: 'routeFlowStepData',
  })

  const [state, produce] = useImmer<FlowProps>({
    locationOptions: [],
  })

  const { locationOptions } = state
  const { getSelectOptionData } = useGeneralApi()

  const getLocationOptions = async () => {
    const { status, result } = await getSelectOptionData(LOCATION_ZONE_OPTIONS)
    if (status === 200) {
      produce((draft) => {
        draft.locationOptions = result?.map((ma: any) => ({
          id: ma.id,
          name: ma.locationLevelName,
          group: ma.locationSiteName,
          locationZoneData: ma.locationZoneData,
        }))
      })
    }
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

  useEffectOnce(() => {
    getLocationOptions()
  })

  return (
    <>
      {fields?.length === 0 && viewStatus && (
        <StylesNoDataTypography>{`${t('TABLE.noData')}`}</StylesNoDataTypography>
      )}
      {fields?.map((field, index: number) => {
        const propertyPath = `routeFlowStepData.${index}` as const

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
              {`${t('COMMON.patrolFlow')} ${index + 1}`}
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

            <Grid container spacing={1} sx={{ pt: 1 }}>
              <Grid item xs={12} md={6}>
                <SelectGroupAutoComplete
                  minWidth="100%"
                  required={!viewStatus}
                  label={`${t('COMMON.location')} ${index + 1}`}
                  name={`${propertyPath}.locationLevelId`}
                  selectSx={{ backgroundColor: ADMIN_TABLE_BG_WHITE }}
                  selectOptions={locationOptions}
                  triggerOnChange={() => {
                    setValue(`${propertyPath}.locationZoneId`, null)
                    setValue(`${propertyPath}.locationName`, '')
                  }}
                  {...{ viewStatus, control }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FreeSelectAutoComplete
                  defaultValue={getValues(`${propertyPath}.locationName`)}
                  minWidth="100%"
                  required={!viewStatus}
                  label={`${t('COMMON.area')} ${index + 1}`}
                  name={`${propertyPath}.locationZoneId`}
                  selectSx={{ backgroundColor: ADMIN_TABLE_BG_WHITE }}
                  disabled={
                    !HasValueNotEmpty(watch(`${propertyPath}.locationLevelId`)) ||
                    locationOptions.filter(
                      (fil: { id: string | number }) =>
                        fil.id === getValues(`${propertyPath}.locationLevelId`),
                    )?.length === 0
                  }
                  selectOptions={
                    locationOptions
                      .filter(
                        (fil: { id: string | number }) =>
                          fil.id === getValues(`${propertyPath}.locationLevelId`),
                      )
                      .map((item: any) => item.locationZoneData)[0]
                  }
                  {...{ setValue, propertyPath, viewStatus, control }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ opacity: 0, my: 1 }} />

            <TaskStructure
              nestIndex={index}
              viewStatus={viewStatus}
              uploadAPI={uploadAPI}
              {...{
                control,
                register,
                setValue,
                watch,
                errors,
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
                    locationName: '',
                    locationLevelId: '00000000-0000-0000-0000-000000000000',
                    locationZoneId: null,
                    routeFlowTaskData: [
                      {
                        name: '',
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
              locationName: '',
              locationLevelId: '00000000-0000-0000-0000-000000000000',
              locationZoneId: null,
              routeFlowTaskData: [{ name: '', fileIdSet: [], pictureArray: [], storeImgArr: [] }],
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
