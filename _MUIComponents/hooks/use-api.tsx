import axios, { AxiosInstance, AxiosResponse } from 'axios'
import moment from 'moment-timezone'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useSnackbar } from '@components/snackbar'
import useMiddleWare from '@hooks/use-middleware'
import { API_METHOD, ApiContextInterface, ApiProviderProps, ApiResponse } from '@interface/apiProps'
import { useLocales } from '@locales/index'
import { Button } from '@mui/material'
import { REFRESH_TOKEN } from '@service/API_Admin'
import { HandleApiAcceptLanguage } from '@utils/utilsFunction'

const BASE_API_URL = `${process.env.NEXT_PUBLIC_SERVER_HOST}${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}`
const BASE_APP_URL = `${process.env.NEXT_PUBLIC_SERVER_HOST}${process.env.NEXT_PUBLIC_SERVER_APP_ENDPOINT}`

const ApiContext = createContext<ApiContextInterface | null>(null)

const handleSuccessStatus = (status: number) => {
  switch (status) {
    case 200:
    case 201:
    case 204:
      return false
    default:
      return true
  }
}

const useApi = (): ApiContextInterface => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}

const useApiProvider = (): ApiContextInterface => {
  const router = useRouter()
  const { tokenState, logoutStore } = useMiddleWare()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { t, currentLang } = useLocales()

  const baseURLSwitch = (path: string): string =>
    router.pathname.indexOf('/admin') > -1 ? BASE_API_URL : BASE_APP_URL
  const getAcceptLanguage = (): string => HandleApiAcceptLanguage(currentLang.value)

  // 建立 axios instance
  const createAxiosInstance = (path: string): AxiosInstance => {
    return axios.create({
      baseURL: baseURLSwitch(path),
      timeout: 30000,
      headers: {
        Authorization: tokenState ? `Bearer ${tokenState}` : '',
        'Accept-Language': getAcceptLanguage(),
      },
    })
  }

  const setErrorMessage = (value: string): void => {
    enqueueSnackbar(value, {
      variant: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      autoHideDuration: 2000,
      action: (key) => (
        <Button size="small" color="inherit" onClick={() => closeSnackbar(key)}>
          {`${t('DIALOG.closeBtn')}`}
        </Button>
      ),
    })
  }

  const setExpiredMessage = (): void => setErrorMessage(`${t('ERROR_MESSAGE.authMessage')}`)

  const handleError = (error: any, statusCode: number): void => {
    switch (statusCode) {
      case 400:
        error.response.data.errors.forEach((err: any) => setErrorMessage(err.message))
        break
      case 401:
        RefreshApi()
        break
      case 403:
        setErrorMessage(error.response.data)
        break
      case 405:
      case 500:
        setErrorMessage(error.response.data)
        break
      case 413:
        setErrorMessage(`${t('ERROR_MESSAGE.413')}`)
        break
      case 429:
        setErrorMessage(`${t('ERROR_MESSAGE.429')}`)
        break
      case 502:
        setErrorMessage(`${t('ERROR_MESSAGE.502')}`)
        break
      default:
        break
    }
  }

  const RefreshApi = async (): Promise<void> => {
    try {
      if (tokenState === null) return

      const APIKit = createAxiosInstance(REFRESH_TOKEN)
      const { data: resultData, status: resultStatus } = await APIKit.post(REFRESH_TOKEN, {
        token: tokenState,
      })

      if (resultStatus === 200 && resultData?.token !== null) {
        router.reload()
      } else {
        setExpiredMessage()
        router.push('/Login')
        logoutStore(router?.asPath)
      }
    } catch (error) {
      router.push('/Login')
      logoutStore(router?.asPath)
    }
  }

  // 共用 API 處理
  const handleApiResponse = async (
    APIKit: AxiosInstance,
    method: API_METHOD,
    path: string,
    variables?: any,
    params?: any,
    noError?: boolean,
  ): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse = await APIKit.request({
        method,
        url: path,
        params: method === API_METHOD.GET || method === API_METHOD.DELETE ? params : undefined,
        data: method !== API_METHOD.GET && method !== API_METHOD.DELETE ? variables : undefined,
        paramsSerializer: { indexes: null },
      })

      const { data: resultData, status: resultStatus } = response
      const result: ApiResponse = { status: resultStatus, message: '', result: resultData }

      if (handleSuccessStatus(result.status) && !noError) {
        setErrorMessage(resultData.message)
      }

      return result
    } catch (error: any) {
      const message = error.response?.data || 'Network Error'
      const statusCode = error.response?.status || 500
      handleError(error, statusCode)

      return { status: statusCode, message, result: null }
    }
  }

  // 需要 token 的 API
  const FetchApi = async (
    method: API_METHOD,
    path: string,
    variables?: any,
    params?: any,
    noError?: boolean,
  ): Promise<ApiResponse> => {
    const APIKit = createAxiosInstance(path)
    return await handleApiResponse(APIKit, method, path, variables, params, noError)
  }

  // 不需要 token 的 API
  const FetchNoTokenApi = async (
    method: API_METHOD,
    path: string,
    variables?: any,
    noError?: boolean,
  ): Promise<ApiResponse> => {
    const APIKit = createAxiosInstance(path)
    APIKit.defaults.headers.Authorization = ''
    return await handleApiResponse(APIKit, method, path, variables, undefined, noError)
  }

  // 第三方 token 的 API
  const FetchThirdPartTokenApi = async (
    inputThirdPartToken: string,
    method: API_METHOD,
    path: string,
    variables?: any,
    noError?: boolean,
  ): Promise<ApiResponse> => {
    const APIKit = createAxiosInstance(path)
    APIKit.defaults.headers.Authorization = `Bearer ${inputThirdPartToken}`
    return await handleApiResponse(APIKit, method, path, variables, undefined, noError)
  }

  // 上傳檔案的 API
  const UploadApi = async (
    method: API_METHOD,
    path: string,
    variables: any,
    noError?: boolean,
  ): Promise<ApiResponse> => {
    const APIKit = createAxiosInstance(path)
    return await handleApiResponse(APIKit, method, path, variables, undefined, noError)
  }

  // 下載檔案的 API
  const DownloadApi = async (
    method: API_METHOD,
    path: string,
    variables: any,
    fileName: string,
    params: any = null,
    fileFormat = 'csv',
  ): Promise<{ status: number; message?: string; result?: any }> => {
    const APIKit = createAxiosInstance(path)
    const responseType = 'blob'

    try {
      const response: AxiosResponse = await APIKit.request({
        method,
        url: path,
        responseType,
        params,
        paramsSerializer: { indexes: null },
        data: method === API_METHOD.GET || method === API_METHOD.POST ? variables : undefined,
      })

      const { status } = response
      const blobData = new Blob([response.data])

      const blobUrl = window.URL.createObjectURL(blobData)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `${fileName}${moment().format('YYYYMMDD')}.${fileFormat}`
      link.style.display = 'none'

      document.body.appendChild(link)
      link.click()

      window.URL.revokeObjectURL(blobUrl)
      link.remove()

      return { status }
    } catch (error: any) {
      const message = error.message
      setErrorMessage(message)
      return { status: error.status, message: '', result: null }
    }
  }

  return {
    setExpiredMessage,
    FetchApi,
    FetchNoTokenApi,
    FetchThirdPartTokenApi,
    setErrorMessage,
    UploadApi,
    DownloadApi,
  }
}

const useTimeOutProvider = () => {
  const router = useRouter()
  const { t } = useLocales()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { tokenState, logoutStore, systemConfigObjectState } = useMiddleWare()
  const [time, setTime] = useState(3600 * 8)
  const [timeCountOver, setTimeCountOver] = useState(false)

  const useInterval = (callback: () => void, delay: number | null): void => {
    const savedCallback = useRef<() => void>()

    useEffect(() => {
      savedCallback.current = callback
    })

    useEffect(() => {
      const tick = (): void => {
        savedCallback.current!()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  let filterTimeout: NodeJS.Timeout

  const expireTime = systemConfigObjectState?.jwtExpiresMinutes

  const onMouseKeep = (): void => {
    clearTimeout(filterTimeout)
    filterTimeout = setTimeout(() => {
      setTime(expireTime! * 60 * 1000)
    }, 300000)
  }

  useInterval(() => {
    if (tokenState !== '') {
      setTime(time - 600)
    }
  }, 600000)

  useEffect(() => {
    if (time === 0) {
      enqueueSnackbar(`${t('ERROR_MESSAGE.timeoutMessage', { hour: 1 })}`, {
        variant: 'info',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        autoHideDuration: 2000,
        action: (key) => (
          <Button size="small" color="inherit" onClick={() => closeSnackbar(key)}>
            關閉
          </Button>
        ),
      })
      router.push('/Login')
      logoutStore(router?.asPath)
    }
  }, [closeSnackbar, enqueueSnackbar, logoutStore, router, time, t])

  return { onMouseKeep, timeCountOver, setTimeCountOver }
}

const ApiProvider = ({ children }: ApiProviderProps): JSX.Element => {
  const api = useApiProvider()
  const { onMouseKeep } = useTimeOutProvider()

  return (
    <ApiContext.Provider value={api}>
      <div onMouseMove={onMouseKeep}>{children}</div>
    </ApiContext.Provider>
  )
}

export default useApi
export { ApiProvider, API_METHOD }
