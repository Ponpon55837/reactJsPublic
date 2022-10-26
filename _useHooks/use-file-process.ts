const fileProcessUse = () => {
  // base64轉換
  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64)
    const binaryLen = binaryString.length
    const bytes = new Uint8Array(binaryLen)
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i)
      bytes[i] = ascii
    }
    return bytes
  }

  // 轉換檔名與連結
  const saveByteArray = (fileName: string, byte: string, mimeType: string) => {
    const blob = new Blob([byte], { type: mimeType })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    const fileLink = link.href
    link.download = fileName
    return { fileName, fileLink }
  }

  const processBlobFile = (res: {
    name: string
    id: number | string
    data: any
    mimeType: string
  }) => {
    const baseData: any = base64ToArrayBuffer(res.data)
    const { fileName, fileLink } = saveByteArray(res.name, baseData, res.mimeType)
    return { id: res.id, fileName, fileLink }
  }

  return { processBlobFile }
}

export default fileProcessUse
