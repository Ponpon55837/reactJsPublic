import useApi, { API_METHOD } from '@hooks/use-api'
import { Fetch, DownLoadFetch } from '@interface/api_service'

const useGeneralApi = () => {
  const { FetchApi, DownloadApi, UploadApi } = useApi()

  // 取得列表
  const getListData = async (apiChannel: string, query?: object): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.GET, apiChannel, null, query)
    return { status, message, result }
  }

  // 取得單筆
  const getSingleData = async (apiChannel: string, id: number | string): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.GET, `${apiChannel}/${id}`, null)
    return { status, message, result }
  }

  // 新增單筆
  const createSingleData = async (apiChannel: string, data: object): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.POST, apiChannel, data)
    return { status, message, result }
  }

  // 新增單筆 (帶ID)
  const createSingleDataWithId = async (
    apiChannel: string,
    id: number | string,
    data: object,
  ): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.POST, `${apiChannel}/${id}`, data)
    return { status, message, result }
  }

  // 修改單筆
  const updateSingleData = async (
    apiChannel: string,
    id: number | string,
    data: object,
  ): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(
      API_METHOD.PATCH,
      `${apiChannel}/${id}`,
      data,
    )
    return { status, message, result }
  }

  // 修改整份
  const updateAllThisData = async (apiChannel: string, data: object): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.PATCH, apiChannel, data)
    return { status, message, result }
  }

  // 刪除單筆
  const deleteSingleData = async (apiChannel: string, id: number | string): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(
      API_METHOD.DELETE,
      `${apiChannel}/${id}`,
      null,
    )
    return { status, message, result }
  }

  // 覆寫單筆
  const putSingleData = async (
    apiChannel: string,
    id: number | string,
    data?: object,
  ): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.PUT, `${apiChannel}/${id}`, data)
    return { status, message, result }
  }

  // 覆寫
  const putAllData = async (apiChannel: string, data?: object): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.PUT, apiChannel, data)
    return { status, message, result }
  }

  // 取得整組下拉選單
  const getSelectOptionData = async (apiChannel: string, query?: object): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.GET, apiChannel, null, query)
    return { status, message, result }
  }

  // 取得特定下拉選單
  const getSelectIdOptionData = async (
    apiChannel: string,
    id: number | string,
    query?: object,
  ): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(
      API_METHOD.GET,
      `${apiChannel}/${id}`,
      null,
      query,
    )
    return { status, message, result }
  }

  // 下載檔案
  const getExportResult = async (
    apiChannel: string,
    fileName: string,
    fileFormat?: string,
  ): Promise<DownLoadFetch> => {
    const { status } = await DownloadApi(
      API_METHOD.GET,
      apiChannel,
      null,
      fileName,
      null,
      fileFormat,
    )
    return { status }
  }

  // 下載檔案(帶 query 值)
  const getExportResultWithQuery = async (
    apiChannel: string,
    fileName: string,
    query?: object,
  ): Promise<DownLoadFetch> => {
    const { status } = await DownloadApi(API_METHOD.GET, apiChannel, null, fileName, query)
    return { status }
  }

  // 下載檔案(需帶 data 值)
  const postExportResultWithData = async (
    apiChannel: string,
    data: object,
    fileName: string,
  ): Promise<DownLoadFetch> => {
    const { status } = await DownloadApi(API_METHOD.POST, apiChannel, data, fileName)
    return { status }
  }

  // 下載特定單筆檔案
  const getExportSingleResult = async (
    apiChannel: string,
    id: number | string,
    fileName: string,
    type?: string,
  ): Promise<DownLoadFetch> => {
    const { status } = await DownloadApi(
      API_METHOD.GET,
      `${apiChannel}/${id}`,
      null,
      fileName,
      null,
      type,
    )
    return { status }
  }

  // 上傳檔案(不帶檔名)
  const postSingleFile = async (apiChannel: string, files: any): Promise<Fetch> => {
    const data = new FormData()
    data.append(files, files)

    const { status, message, result } = await UploadApi(API_METHOD.POST, apiChannel, data)
    return { status, message, result }
  }

  // 上傳檔案(帶檔名)
  const postSingleFileWithName = async (apiChannel: string, files: any): Promise<Fetch> => {
    const data = new FormData()
    data.append(files.name, files)

    const { status, message, result } = await UploadApi(API_METHOD.POST, apiChannel, data)
    return { status, message, result }
  }

  return {
    getListData,
    getSingleData,
    createSingleData,
    createSingleDataWithId,
    updateSingleData,
    updateAllThisData,
    deleteSingleData,
    putSingleData,
    putAllData,
    getSelectOptionData,
    getSelectIdOptionData,
    getExportResult,
    getExportResultWithQuery,
    postExportResultWithData,
    getExportSingleResult,
    postSingleFile,
    postSingleFileWithName,
  }
}

export default useGeneralApi
