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
