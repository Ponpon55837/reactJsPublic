export interface ReturnState {
  state: {
    pageSizeOptions: number[]
    pageSize: number
    pageValue: number
    dataCount: number
    sort: string
    sortName?: string
    keyword: string
    resultPageSize: number
    isEnabled: string
    loading: boolean
    backDropOpen: boolean
    inputYear: string | number
    inputMonth: string | number
    inputDate: string | number
    fullDialog: boolean
    deleteDialog: boolean
    viewDialog: boolean
    tableData: any[]
    editResult: any
    viewResult: any
    saveDialogId: string
    deleteId: number | string
    deptId: string | number
    quesId: string | number
    deleteOrAuditCheck: string
  }
  produce: (fn: (draft: any) => void) => void
  handlePageChange: (e: React.ChangeEvent<HTMLInputElement>, value: number) => void
  handlePageSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDescClick: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleStatusInputChangeYear: (yearItem: React.ChangeEvent<HTMLInputElement>) => void
  handleStatusInputChangeMonth: (monthItem: React.ChangeEvent<HTMLInputElement>) => void
  handleStatusInputChangeDate: (dateItem: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleIsEnableChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDeptIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleGetListData: (channel: string, query?: object) => void
  handleGetSingleData: (channel: string, id: number | string) => void
  handleGetSingleDataView: (channel: string, id: number | string) => void
  handleDeleteSingleData: (channel: string, id: string | number) => void
  handleCancelSingleData: (channel: string, id: string | number) => void
  handleGetSingleCopyData: (channel: string, id: string | number) => void
  handleInputSub: (channel: string, query: object) => void
  handleClearInputSub: (channel: string, query: object) => void
  handleInputSubWithTimeRange: (channel: string, query: object) => void
  handleClearInputSubWithTimeValue: (channel: string, query: object) => void
  handleAddSingleDataDialog: () => void
  handleCloseSingleDataDialog: () => void
  handleCloseSingleDataViewDialog: () => void
  handleBackDropOpen: () => void
  handleBackDropClose: () => void
  handleFirstPage: () => void
  handleKeywordClean: () => void
  handleGetGridData: (channel: string, query: object) => void
  handleLazyLoadPageChange: (Value?: number) => void
  handleLazyLoadListData: (channel: string, query?: object) => void
  handleRefreshSingleData: (channel: string, id: string | number) => void
}
