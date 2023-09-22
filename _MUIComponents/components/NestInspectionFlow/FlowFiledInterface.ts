export interface FlowProps {
  data: {
    locationName: string
    scannedAt: string
    notes: string
    dailyTaskLocationTaskData: {
      name: string
      finishedAt: string
      fileObjects: { id: string; name: string; link: string }[]
      pictureArray: string[]
      storeImgArr: { name: string; file: any; image: any }[]
    }[]
  }[]
}
