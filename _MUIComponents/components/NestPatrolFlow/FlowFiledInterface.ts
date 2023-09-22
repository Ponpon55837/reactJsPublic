export interface FlowProps {
  routeFlowStepData: {
    locationName: string
    locationLevelId: string | null
    locationZoneId: string | null
    routeFlowTaskData: {
      name: string
      fileObjects: { id: string; name: string; link: string }[]
      pictureArray: string[]
      storeImgArr: { name: string; file: any; image: any }[]
    }[]
  }[]
}
