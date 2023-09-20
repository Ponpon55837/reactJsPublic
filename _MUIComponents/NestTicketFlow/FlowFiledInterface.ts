export interface FlowProps {
  workflowStepData: {
    name: string
    workflowTaskData: {
      name: string
      link: string
      locationLevelId: null | string
      locationZoneId: null | string
      equipmentId: null | string
      fileObjects: { id: string; name: string; link: string }[]
      pictureArray: string[]
      storeImgArr: { name: string; file: any; image: any }[]
    }[]
  }[]
}
