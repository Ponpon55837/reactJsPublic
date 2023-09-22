export interface AddProps {
  closeFunc: () => void
  successFunc: () => void
}

export interface EditProps {
  result: object | []
  closeFunc: () => void
  successFunc: () => void
}

export interface MaintainerProps {
  result: object | []
  closeFunc: () => void
  successFunc: () => void
  inputAPI: string
}

export interface ViewProps {
  result: object | []
  closeFunc?: () => void
  successFunc?: () => void
}

export interface AuditProps {
  result: object | []
  closeFunc: () => void
  successFunc: () => void
  auditAPI: string
  successAudit?: string
  failedAudit?: string
}

export interface TabPanelProps {
  children?: React.ReactNode
  index: number | string
  value: number | string
}

export interface DialogProps {
  closeFunc: () => void
  successFunc: () => void
}

export interface ActionSetProps {
  actionSet: string[]
}

export interface PageActionSetProps {
  actionSet: string[]
  pageIndex: number
}
