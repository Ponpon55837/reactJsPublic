import { useContext, createContext } from 'react'
import { useUpdateEffect } from 'react-use'
import FileDownload from 'js-file-download'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useImmer } from 'use-immer'
import { Typography } from '@mui/material'
import axios from 'axios'
import CustomDialog from '@components/CustomDialog'
import useAuth from '@hooks/use-auth'
import { REFRESH_TOKEN } from '@api_service/API'

const BASE_URL = `
  ${process.env.NEXT_PUBLIC_SERVER_HOST}${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}
`

const APIKit = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

const API_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
}

const ApiContext = createContext()

const authMessage = '登入憑證已失效，請重新登入'
const defaultFailedMessage = '系統異常，請稍後再試'

const useApi = () => useContext(ApiContext)

const useApiProvider = () => {
  const { token, signOut } = useAuth()
  // const token = localStorage.ctlToken
  const [state, produce] = useImmer({
    statusCode: null,
    errorMessage: null,
  })

  const { statusCode, errorMessage } = state

  const clearErrorMessage = () => {
    produce(draft => {
      draft.errorMessage = null
    })
  }

  const setErrorMessage = value => {
    produce(draft => {
      draft.errorMessage = value
    })
  }

  const setStatusCode = value => {
    produce(draft => {
      draft.statusCode = value
    })
  }

  const setExpiredMessage = () => setErrorMessage(authMessage)

  const universalCatchErrorFeedBack = (error, statusCode) => {
    switch (statusCode) {
      case 304:
        // API:refreshtoken 甚麼都不做
        return
        break
      case 400:
        let message = error.response.data.errors.map((err, idx) => (
          <Typography variant="body1" key={`err${idx}`}>
            {err.message}
          </Typography>
        ))
        setErrorMessage(message)
        return message
        break
      case 401:
        setStatusCode(statusCode)
        break
      case 403:
        setErrorMessage(error.response.data)
        break
      case 404:
        break
      case 405:
        setErrorMessage(error.response.data)
        break
      case 413:
        setErrorMessage('檔案上傳大小超過伺服器限制，請聯絡系統管理員')
        break
      // 429 too many request dont trigger error message
      case 429:
        setErrorMessage(error.response.data)
        break
      case 500:
        setErrorMessage(error.response.data)
        break
      default:
        break
    }
  }

  const FetchApi = async (method, path, variables, params, noError) => {
    let result = { status: null, message: 'error', result: null }
    try {
      const { data: resultData, status: resultStatus } =
        method === API_METHOD.GET || method === API_METHOD.DELETE
          ? await APIKit[method](path, {
              headers: { Authorization: token ? `Bearer ${token}` : '' },
              params,
            })
          : await APIKit[method](path, variables, {
              headers: { Authorization: token ? `Bearer ${token}` : '' },
            })
      result = { status: resultStatus, message: '', result: resultData }

      switch (result.status) {
        case result.status !== 200 && !noError:
          setErrorMessage(resultData.message)
          break
        default:
          break
      }
    } catch (error) {
      let message = error.response.data
      const statusCode = error.response?.status

      universalCatchErrorFeedBack(error, statusCode)

      result = { status: statusCode, message: message, result: null }
    } finally {
      return result
    }
  }

  const FetchNoTokenApi = async (method, path, variables, noError) => {
    let result = { status: null, message: 'error', result: null }
    try {
      const { data: resultData, status: resultStatus } = await APIKit[method](path, variables, {
        headers: {},
      })
      result = { status: resultStatus, message: '', result: resultData }

      switch (result.status) {
        case result.status !== 200 && !noError:
          setErrorMessage(resultData.message)
          break
        default:
          break
      }
    } catch (error) {
      let message = error.response.data
      const statusCode = error.response?.status

      universalCatchErrorFeedBack(error, statusCode)

      result = { status: statusCode, message: message, result: null }
    } finally {
      return result
    }
  }

  const UploadApi = async (method, path, variables, noError) => {
    let result = { status: null, message: 'error', result: null }
    try {
      const { data: resultData, status: resultStatus } = await APIKit[method](path, variables, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'multipart/form-data',
        },
      })
      result = { status: resultStatus, message: '', result: resultData }

      switch (result.status) {
        case result.status !== 200 && !noError:
          setErrorMessage(resultData.message)
          break
        default:
          break
      }
    } catch (error) {
      const message = error.response.data.message
      const statusCode = error.response?.status

      universalCatchErrorFeedBack(error, statusCode)

      result = { status: statusCode, message: message, result: null }
    } finally {
      return result
    }
  }

  const DownloadApi = (method, path, variables, fileName, params = null) => {
    const request = {
      url: `${BASE_URL}/${path}`,
      method: method,
      responseType: 'blob', // Important
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    }

    if (method === API_METHOD.GET) request.data = variables

    axios(request)
      .then(response => {
        FileDownload(response.data, `${fileName}${moment().format('YYYYMMDD')}.csv`)
      })
      .catch(error => {
        let message = error.message
        setErrorMessage(message)
      })
  }

  return {
    errorMessage,
    statusCode,
    clearErrorMessage,
    setExpiredMessage,
    FetchApi,
    FetchNoTokenApi,
    signOut,
    setErrorMessage,
    UploadApi,
    DownloadApi,
  }
}

const ApiProvider = ({ children }) => {
  const api = useApiProvider()
  const { statusCode, errorMessage, clearErrorMessage, FetchApi } = api
  const { token, setToken, removeToken, signOut } = useAuth()

  const postRefresh = async data => {
    const { status, message, result } = await FetchApi(API_METHOD.POST, REFRESH_TOKEN, data)
    return { status, message, result }
  }

  const router = useRouter()
  const refresh = async () => {
    const { status, result } = await postRefresh({ token: token })
    if (status === 200) {
      removeToken()
      setToken(result?.newToken)
      router.reload()
    } else {
      router.push('/Login')
      signOut()
    }
    clearErrorMessage()
  }

  const Action = () => {
    clearErrorMessage()
  }

  useUpdateEffect(() => {
    if (statusCode === 401) refresh()
  }, [statusCode])

  return (
    <ApiContext.Provider value={api}>
      <CustomDialog
        open={errorMessage !== null}
        successFunc={Action}
        dialogTitle="通知"
        dialogContent={errorMessage}
        labelSuccess="關閉"
      />
      {children}
    </ApiContext.Provider>
  )
}

export default useApi
export { ApiProvider, API_METHOD }

ApiProvider.propTypes = {
  children: PropTypes.node,
}
