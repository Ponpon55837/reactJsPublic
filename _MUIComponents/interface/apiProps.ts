export enum API_METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export interface ApiResponse {
  status: number
  message: string
  result: any
}

export interface ApiProviderProps {
  children: React.ReactNode
}

export interface ApiContextInterface {
  setExpiredMessage: () => void
  FetchApi: (
    method: API_METHOD,
    path: string,
    variables?: any,
    params?: any,
    noError?: boolean,
  ) => Promise<ApiResponse>
  FetchNoTokenApi: (
    method: API_METHOD,
    path: string,
    variables?: any,
    noError?: boolean,
  ) => Promise<ApiResponse>
  FetchThirdPartTokenApi: (
    inputThirdPartToken: string,
    method: API_METHOD,
    path: string,
    variables?: any,
    noError?: boolean,
  ) => Promise<ApiResponse>
  setErrorMessage: (value: string) => void
  UploadApi: (
    method: API_METHOD,
    path: string,
    variables: any,
    noError?: boolean,
  ) => Promise<ApiResponse>
  DownloadApi: (
    method: API_METHOD,
    path: string,
    variables: any,
    fileName: string,
    params?: any,
    fileFormat?: string,
  ) => Promise<{ status: number; message?: string; result?: any }>
}
