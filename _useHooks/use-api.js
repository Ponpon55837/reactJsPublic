import React, { useContext, createContext } from "react"
import { useImmer } from "use-immer"
import axios from "axios"
import moment from "moment"
import FileDownload from "js-file-download"
import Dialog from "./components/common/Dialog"
import useAuth from "./use-auth"

const BASE_URL = `
  ${process.env.REACT_APP_SERVER_HOST}${process.env.REACT_APP_SERVER_ENDPOINT}
`

const APIKit = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

export const API_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
}

// APIKit.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${!!token ? token : ""}`
//   return config
// })

const ApiContext = createContext()

const authMessage = "登入憑證已失效，請重新登入"
const defaultFailedMessage = "系統異常，請稍後再試"

const useApi = () => useContext(ApiContext)

const useApiProvider = () => {
  const { token, signOut } = useAuth()
  const [state, produce] = useImmer({
    errorMessage: null,
  })

  const { errorMessage } = state

  const clearErrorMessage = () => {
    produce(draft => {draft.errorMessage = null})}

  const setErrorMessage = (value) => {
    produce(draft => {draft.errorMessage = value})}

  const setExpiredMessage = () => setErrorMessage(authMessage)

  const FetchApi = async (method, path, variables, params, noError) => {
    let result = { status: null, message: "error", result: null }
    try {
      const { data: resultData, status: resultStatus } =
        method === API_METHOD.GET || method === API_METHOD.DELETE
          ?
          await APIKit[method](path, {
              headers: { Authorization: token ? `Bearer ${token}` : "" },
              params
          })
          : await APIKit[method](path, variables, {
              headers: { Authorization: token ? `Bearer ${token}` : "" },
            })
      result = { status: resultStatus, message: "", result: resultData }

      switch(result.status) {
        case (result.status !== 200 && !noError):
          setErrorMessage(resultData.message)
          break
        default:
          break
      }
    } catch (error) {
      const message = error.response.data.message
      const statusCode = error.response?.status

      switch(statusCode) {
        case 304:
        // API:refreshtoken 甚麼都不做
        return false
        case 400:
          setErrorMessage(message)
          break
        case 401:
          setErrorMessage(authMessage)
          break
        case 403:
          setErrorMessage("權限不足，無法查詢")
          break
        // case 404:
        //   setErrorMessage(message)
        //   break
        // 429 too many request dont trigger error message
        case 429:
          setErrorMessage(message)
          break
        case 500:
          setErrorMessage(defaultFailedMessage)
          break
        default:
          break
      }

      result = { status: statusCode, message: message, result: null }

    } finally {
      return result
    }
  }

  const DownloadApi = (method, path, variables, fileName) => {
    const request = {
      url: `${BASE_URL}${path}`,
      method: method,
      responseType: "blob", // Important
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    if (method === API_METHOD.POST || method === API_METHOD.PUT)
      request.data = variables

    axios(request).then((response) => {
      FileDownload(
        response.data,
        `${fileName}${moment().format("YYYYMMDDhhmm")}.csv`)
    })
  }

  const UploadApi = async (method, path, variables, noError) => {
    let result = { status: null, message: "error", result: null }
    try {
      const { data: resultData, status: resultStatus } =
        await APIKit[method](path, variables, {
              headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "multipart/form-data"
              },
            })
            result = { status: resultStatus, message: "", result: resultData }

      switch(result.status) {
        case (result.status !== 200 && !noError):
          setErrorMessage(resultData.message)
          break
        default:
          break
      }
    } catch(error) {
      const message = error.response.data.message
      const statusCode = error.response?.status
      if (statusCode) setErrorMessage(message)
    } finally {
      return result
    }
  }

  return {
    errorMessage,
    clearErrorMessage,
    setExpiredMessage,
    FetchApi,
    signOut,
    setErrorMessage,
    DownloadApi,
    UploadApi
  }
}

const ApiProvider = ({ children }) => {
  const api = useApiProvider()
  const { errorMessage, clearErrorMessage, signOut } = api

  const Action = () => {
    if (errorMessage === authMessage) signOut()
    clearErrorMessage()
  }

  return (
    <ApiContext.Provider value={api}>
      <Dialog
        title="通知"
        preLine
        message={errorMessage}
        isShowDialog={errorMessage !== null}
        confirmButtonProp={{
          action: () => Action(),
          text: '關閉'
        }}
        cancelButtonProp={{
          isShow: false,
        }}
      />
      {children}
    </ApiContext.Provider>
  )
}

export default useApi
export { ApiProvider }
