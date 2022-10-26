export interface AddProps {
  closeFunc: () => void
  successFunc: () => void
}

export interface EditProps {
  result: object | []
  closeFunc: () => void
  successFunc: () => void
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
  index: number
  value: number
}

export interface DialogProps {
  closeFunc: () => void
  successFunc: () => void
}
