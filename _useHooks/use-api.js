import { useContext, createContext } from 'react'
import PropTypes from 'prop-types'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { useRouter } from 'next/router'
import { useImmer } from 'use-immer'
import { Typography, IconButton } from '@mui/material'
import axios from 'axios'
import moment from 'moment-timezone'
import CustomDialog from '@components/CustomDialog'
import useMiddleWare from '@hooks/use-middleware'
import FileDownload from 'js-file-download'
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

const useApi = () => useContext(ApiContext)

const useApiProvider = () => {
  const router = useRouter()
  const { tokenState, setTokenState, logoutStore } = useMiddleWare()
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

  const setExpiredMessage = () => setErrorMessage(authMessage)

  const RefreshApi = async () => {
    let result = { status: null, message: 'error', result: null }
    try {
      const { data: resultData, status: resultStatus } = await APIKit[API_METHOD.POST](
        REFRESH_TOKEN,
        { token: tokenState },
        {
          headers: { Authorization: tokenState !== '' ? `Bearer ${tokenState}` : '' },
        },
      )
      result = { status: resultStatus, message: '', result: resultData }

      if (result.status === 200 && result.result?.token !== null) {
        setTokenState(result.result?.token)
        router.reload()
      } else {
        setErrorMessage(authMessage)
        router.push('/Login')
        logoutStore()
      }
    } catch (error) {
      setErrorMessage(authMessage)
      router.push('/Login')
      logoutStore()
    }
  }

  const universalCatchErrorFeedBack = (error, statusCode) => {
    switch (statusCode) {
      case 400:
        let message = error.response.data.errors.map((err, idx) => (
          <div key={`err${idx}`}>
            <Typography component="span" variant="body1">
              {err.message}
            </Typography>
            <br />
          </div>
        ))
        setErrorMessage(message)
        return message
      case 401:
        RefreshApi()
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
              headers: { Authorization: tokenState ? `Bearer ${tokenState}` : '' },
              params,
            })
          : await APIKit[method](path, variables, {
              headers: { Authorization: tokenState ? `Bearer ${tokenState}` : '' },
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
          Authorization: tokenState ? `Bearer ${tokenState}` : '',
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

  const DownloadApi = async (
    method,
    path,
    variables,
    fileName,
    params = null,
    fileFormat = 'csv',
  ) => {
    const request = {
      url: `${BASE_URL}/${path}`,
      method: method,
      responseType: 'blob', // Important
      headers: {
        Authorization: `Bearer ${tokenState}`,
      },
      params: params,
    }

    if (method === API_METHOD.GET || method === API_METHOD.POST) request.data = variables

    return await axios(request)
      .then(response => {
        FileDownload(response.data, `${fileName}${moment().format('YYYYMMDD')}.${fileFormat}`)

        return { status: response.status }
      })
      .catch(error => {
        let message = error.message
        setErrorMessage(message)
        return { status: error.status, message: '', result: null }
      })
  }

  return {
    errorMessage,
    statusCode,
    clearErrorMessage,
    setExpiredMessage,
    FetchApi,
    FetchNoTokenApi,
    setErrorMessage,
    UploadApi,
    DownloadApi,
  }
}

const ApiProvider = ({ children }) => {
  const api = useApiProvider()
  const { statusCode, errorMessage, clearErrorMessage } = api

  const Action = () => {
    clearErrorMessage()
  }

  return (
    <ApiContext.Provider value={api}>
      <CustomDialog
        open={errorMessage !== null}
        successFunc={Action}
        dialogTitle={
          statusCode !== 400 ? (
            <IconButton edge="start" color="warning">
              <WarningAmberIcon size="small" sx={{ mr: 1 }} />
              錯誤
            </IconButton>
          ) : (
            '通知'
          )
        }
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
