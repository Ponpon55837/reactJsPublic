import useApi, { API_METHOD } from '@hooks/use-api'
import {
  LOGIN,
  LOGOUT,
  CHANGE_PASSWORD,
  FORGET_PASSWORD,
  PUBLIC_CHANGE_PASSWORD,
  MENU_LIST,
  REFRESH_TOKEN,
  ENUM_OPTIONS,
  FILE_UPLOAD,
} from '@api_service/API'
import { Fetch } from '@interface/api_service'

const useAdmin = () => {
  const { FetchApi, FetchNoTokenApi, UploadApi } = useApi()

  // 登入
  const postLogin = async (data: object): Promise<Fetch> => {
    const { status, message, result } = await FetchNoTokenApi(API_METHOD.POST, LOGIN, data)
    return { status, message, result }
  }

  // 登出
  const postLogout = async (): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.POST, LOGOUT, null)
    return { status, message, result }
  }

  // 忘記密碼
  const postForgetPassword = async (data: object): Promise<Fetch> => {
    const { status, message, result } = await FetchNoTokenApi(
      API_METHOD.POST,
      FORGET_PASSWORD,
      data,
    )
    return { status, message, result }
  }

  // 變更密碼
  const putChangePassword = async (data: object): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.PUT, CHANGE_PASSWORD, data)
    return { status, message, result }
  }

  // 外部變更密碼
  const putPublicChangePassword = async (data: object): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.PUT, PUBLIC_CHANGE_PASSWORD, data)
    return { status, message, result }
  }

  // 左側選單
  const getMenuList = async (): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.GET, MENU_LIST, null)
    return { status, message, result }
  }

  // refresh token
  const postRefreshToken = async (token: string): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.POST, REFRESH_TOKEN, token)
    return { status, message, result }
  }

  // 取得所有固定選項組
  const getAllUniversalOption = async (): Promise<Fetch> => {
    const { status, message, result } = await FetchApi(API_METHOD.GET, ENUM_OPTIONS, null)
    return { status, message, result }
  }

  // 上傳單一檔案
  const postFileUpload = async (channel: string, files: string | Blob): Promise<Fetch> => {
    const data = new FormData()
    data.append('Files', files)

    const { status, message, result } = await UploadApi(
      API_METHOD.POST,
      `${FILE_UPLOAD}/${channel}`,
      data,
    )
    return { status, message, result }
  }

  // 上傳多檔
  const postFileArrayUpload = async (channel: string, files: any[]): Promise<Fetch> => {
    const data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append('Files', files[i])
    }

    const { status, message, result } = await UploadApi(
      API_METHOD.POST,
      `${FILE_UPLOAD}/${channel}`,
      data,
    )
    return { status, message, result }
  }

  return {
    postLogin,
    postLogout,
    postForgetPassword,
    putChangePassword,
    putPublicChangePassword,
    getMenuList,
    postRefreshToken,
    getAllUniversalOption,
    postFileUpload,
    postFileArrayUpload,
  }
}

export default useAdmin
