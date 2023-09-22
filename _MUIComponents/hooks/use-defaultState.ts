import { useState } from 'react'
import useGeneralApi from 'src/service/GeneralAPIService'
import { useImmer } from 'use-immer'
import { ReturnState } from '@interface/defaultState'
import { HandleDefaultMonth, HandleDefaultYear } from '@utils/utilsFunction'

const useDefaultState = (): ReturnState => {
  const [toggleDesc, setToggleDesc] = useState('ASC')
  const [state, produce] = useImmer({
    pageSizeOptions: [10, 25, 50, 100],
    pageSize: 10,
    pageValue: 1,
    dataCount: 0,
    sort: 'DESC',
    sortName: 'id',
    keyword: '',
    resultPageSize: 1,
    isEnabled: '',
    loading: false,
    backDropOpen: false,
    inputYear: HandleDefaultYear(),
    inputMonth: parseInt(HandleDefaultMonth(), 10),
    inputDate: '',
    fullDialog: false,
    viewDialog: false,
    deleteDialog: false,
    saveDialogId: '',
    deleteId: '',
    tableData: [] as any,
    editResult: { id: '' },
    viewResult: { id: '' },
    deptId: '',
    quesId: '',
    deleteOrAuditCheck: '',
  })

  const { pageSize } = state

  const { getListData, getSingleData, deleteSingleData, putSingleData } = useGeneralApi()

  // 切換頁數
  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>, value: number): void => {
    produce((draft) => {
      draft.pageValue = value
    })
  }

  // 切換每頁顯示數量
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    produce((draft) => {
      draft.pageSize = parseInt(e.target.value)
      draft.pageValue = 1
    })
  }

  // 切換排序方式
  const handleDescClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    toggleDesc === 'ASC' ? setToggleDesc('DESC') : setToggleDesc('ASC')

    produce((draft) => {
      draft.pageValue = 1
      draft.sortName = String(e)
      draft.sort = toggleDesc
    })
  }

  // 切換年份
  const handleStatusInputChangeYear = async (yearItem: React.ChangeEvent<HTMLInputElement>) => {
    produce((draft) => {
      draft.pageValue = 1
      draft.inputYear = yearItem.target.value
    })
  }

  // 切換月份
  const handleStatusInputChangeMonth = async (monthItem: React.ChangeEvent<HTMLInputElement>) => {
    produce((draft) => {
      draft.pageValue = 1
      draft.inputMonth = parseInt(monthItem.target.value, 10)
    })
  }

  // 切換日期
  const handleStatusInputChangeDate = async (dateItem: React.ChangeEvent<HTMLInputElement>) => {
    produce((draft) => {
      draft.pageValue = 1
      draft.inputDate = dateItem.target.value
    })
  }

  // 輸入框 change 事件
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    produce((draft) => {
      draft.keyword = e.target.value
    })
  }

  // isEnable 切換
  const handleIsEnableChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    produce((draft) => {
      draft.pageValue = 1
      draft.isEnabled = e.target.value
    })
  }

  // 部門切換
  const handleDeptIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    produce((draft) => {
      draft.pageValue = 1
      draft.deptId = e.target.value
    })
  }

  // 新增單筆視窗
  const handleAddSingleDataDialog = (): void => {
    produce((draft) => {
      draft.editResult = { id: '' }
      draft.fullDialog = true
    })
  }

  // 關閉單筆視窗
  const handleCloseSingleDataDialog = (): void => {
    produce((draft) => {
      draft.fullDialog = false
    })
  }

  // 關閉單筆檢視視窗
  const handleCloseSingleDataViewDialog = (): void => {
    produce((draft) => {
      draft.viewDialog = false
      draft.saveDialogId = ''
    })
  }

  // 取得列表
  const handleGetListData = async (channel: string, query?: object) => {
    produce((draft) => {
      draft.loading = true
    })
    const { status, result } = await getListData(channel, query)

    if (status === 200 && result) {
      produce((draft) => {
        draft.tableData = result.list
        draft.resultPageSize = Math.ceil(result.count / pageSize)
        draft.dataCount = result.count
      })
    } else {
      produce((draft) => {
        draft.tableData = []
        draft.resultPageSize = 1
        draft.pageValue = 1
        draft.dataCount = 0
      })
    }
    produce((draft) => {
      draft.loading = false
    })
  }

  // 切換頁數
  const handleLazyLoadPageChange = (Value?: number): void => {
    produce((draft) => {
      if (Value !== undefined) {
        draft.pageValue = Value
      } else if (state.resultPageSize > 0 && state.resultPageSize > state.pageValue) {
        draft.pageValue = state.pageValue + 1
      }
    })
  }

  // 取得列表
  const handleLazyLoadListData = async (channel: string, query?: object) => {
    produce((draft) => {
      draft.loading = true
    })
    const { status, result } = await getListData(channel, query)
    if (status === 200 && result) {
      produce((draft) => {
        draft.tableData = state.pageValue === 1 ? result.list : [...state.tableData, ...result.list]
        draft.resultPageSize = Math.ceil(result.count / pageSize)
        draft.dataCount = result.count
      })
    } else {
      produce((draft) => {
        draft.tableData = []
        draft.resultPageSize = 1
        draft.pageValue = 1
        draft.dataCount = 0
      })
    }
    setTimeout(() => {
      produce((draft) => {
        draft.loading = false
      })
    }, 300)
  }

  // 取得完整列表
  const handleGetGridData = async (channel: string, query: object) => {
    produce((draft) => {
      draft.loading = true
    })
    const { status, result } = await getListData(channel, query)

    if (status === 200 && result) {
      produce((draft) => {
        draft.tableData = result
      })
    } else {
      produce((draft) => {
        draft.tableData = []
      })
    }
    produce((draft) => {
      draft.loading = false
    })
  }

  // 取得單筆
  const handleGetSingleData = async (channel: string, id: number | string) => {
    produce((draft) => {
      draft.backDropOpen = true
    })
    const { status, result } = await getSingleData(channel, id)
    if (status === 200) {
      produce((draft) => {
        draft.editResult = result
        draft.fullDialog = true
      })
    } else {
      produce((draft) => {
        draft.editResult = { id: '' }
      })
    }
    produce((draft) => {
      draft.backDropOpen = false
    })
  }

  // 取得單筆檢視
  const handleGetSingleDataView = async (channel: string, id: number | string) => {
    produce((draft) => {
      draft.backDropOpen = true
    })
    const { status, result } = await getSingleData(channel, id)
    if (status === 200) {
      produce((draft) => {
        draft.viewResult = result
        draft.viewDialog = true
      })
    } else {
      produce((draft) => {
        draft.viewResult = { id: '' }
      })
    }
    produce((draft) => {
      draft.backDropOpen = false
    })
  }

  // 刪除單筆
  const handleDeleteSingleData = async (channel: string, id: string | number) => {
    produce((draft) => {
      draft.backDropOpen = true
    })
    const { status } = await deleteSingleData(channel, id)
    if (status === 204) {
      produce((draft) => {
        draft.deleteOrAuditCheck = `${channel}/${id}`
      })
    }
    produce((draft) => {
      draft.backDropOpen = false
    })
  }

  // 取消單筆
  const handleCancelSingleData = async (channel: string, id: string | number) => {
    produce((draft) => {
      draft.backDropOpen = true
    })
    const { status } = await putSingleData(channel, id)
    if (status === 204) {
      produce((draft) => {
        draft.deleteOrAuditCheck = `${channel}/${id}`
      })
    }
    produce((draft) => {
      draft.backDropOpen = false
    })
  }

  // 複製單筆
  const handleGetSingleCopyData = async (channel: string, id: number | string) => {
    produce((draft) => {
      draft.backDropOpen = true
    })
    const { status, result } = await getSingleData(channel, id)
    if (status === 200) {
      produce((draft) => {
        draft.editResult = {
          ...result,
          id: '',
        }
        draft.fullDialog = true
      })
    } else {
      produce((draft) => {
        draft.editResult = { id: '' }
      })
    }
    produce((draft) => {
      draft.backDropOpen = false
    })
  }

  // 刷新單筆
  const handleRefreshSingleData = async (channel: string, id: number | string) => {
    const { status, result } = await putSingleData(channel, id)
    if (status === 200) {
      produce((draft) => {
        const index = draft.tableData.findIndex((f: any) => f.id === result.id)
        if (index !== -1) {
          draft.tableData[index] = result
        }
      })
    }
  }

  // 搜尋
  const handleInputSub = async (channel: string, query: object) => {
    produce((draft) => {
      draft.pageValue = 1
    })
    await handleGetListData(channel, query)
  }

  // 清除搜尋
  const handleClearInputSub = async (channel: string, query: object) => {
    produce((draft) => {
      draft.keyword = ''
      draft.pageValue = 1
    })
    await handleGetListData(channel, query)
  }

  // 搜尋加時間
  const handleInputSubWithTimeRange = async (channel: string, query: object) => {
    await handleGetListData(channel, query)
  }

  // 清除時間搜尋
  const handleClearInputSubWithTimeValue = async (channel: string, query: object) => {
    produce((draft) => {
      draft.keyword = ''
      draft.pageValue = 1
    })
    await handleGetListData(channel, query)
  }

  // 開啟 BackDrop
  const handleBackDropOpen = (): void => {
    produce((draft) => {
      draft.backDropOpen = true
    })
  }

  // 關閉 BackDrop
  const handleBackDropClose = (): void => {
    produce((draft) => {
      draft.backDropOpen = false
    })
  }

  // 回到第一頁
  const handleFirstPage = (): void => {
    produce((draft) => {
      draft.pageValue = 1
    })
  }

  // keyword clean
  const handleKeywordClean = (): void => {
    produce((draft) => {
      draft.keyword = ''
    })
  }

  return {
    state,
    produce,
    handlePageChange,
    handlePageSizeChange,
    handleDescClick,
    handleStatusInputChangeYear,
    handleStatusInputChangeMonth,
    handleStatusInputChangeDate,
    handleSearchInputChange,
    handleIsEnableChange,
    handleDeptIdChange,
    handleGetListData,
    handleGetSingleData,
    handleGetSingleDataView,
    handleDeleteSingleData,
    handleCancelSingleData,
    handleGetSingleCopyData,
    handleInputSub,
    handleClearInputSub,
    handleInputSubWithTimeRange,
    handleClearInputSubWithTimeValue,
    handleAddSingleDataDialog,
    handleCloseSingleDataDialog,
    handleCloseSingleDataViewDialog,
    handleBackDropOpen,
    handleBackDropClose,
    handleFirstPage,
    handleKeywordClean,
    handleGetGridData,
    handleLazyLoadPageChange,
    handleLazyLoadListData,
    handleRefreshSingleData,
  }
}

export default useDefaultState
