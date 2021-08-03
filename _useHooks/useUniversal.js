import useApi, { API_METHOD } from "@/hooks/use-api"
import { FILEUPLOADE } from "./API"

const useUniversal = () => {
  const { UploadApi } = useApi()

  const uploadFile = async (files) => {
    const arrayOfYourFiles=files
    const data = new FormData()
    arrayOfYourFiles.forEach((file, idx) => {
      data.append(`file${idx}`, file)
    })

    const { status, message, result } = await UploadApi(
      API_METHOD.POST,
      `${FILEUPLOADE}/leave`,
      data,
    )
    return { fileStatus: status, fileMessage: message, fileResult: result }
  }

  return {
    uploadFile
  }
}

export default useUniversal
