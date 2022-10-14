import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
})
const Editor = ({ config, value, onChange }) => {
  const editor = useRef(null)
  const contentChange = (content) => {
    onChange(content)
  }
  console.log(editor ? editor.current : null)
  return (
    <JoditEditor
      ref={editor}
      value={value || ''}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onChange={contentChange}
    />
  )
}
export default Editor
