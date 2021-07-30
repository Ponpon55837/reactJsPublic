import React from 'react'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import ColorPicker from 'braft-extensions/dist/color-picker'
import Markdown from 'braft-extensions/dist/markdown'
import Table from 'braft-extensions/dist/table'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'
import 'braft-extensions/dist/table.css'
import 'braft-extensions/dist/color-picker.css'
import { css } from "@emotion/core"

const controls = [
  'undo', 'redo', 'headings', 'font-size', 'font-family', 'line-height',
  'letter-spacing', 'indent','text-color', 'bold', 'italic', 'underline',
  'table', 'strike-through', 'superscript', 'subscript', 'remove-styles',
  'emoji', 'text-align', 'text-indent', 'split',  'list_ul', 'list_ol',
  'blockquote', 'code', 'link', 'hr', 'media', 'clear'
]

const fontFamily = [
  {
    name: 'Araial',
    family: 'Arial, Helvetica, sans-serif'
  }, {
    name: 'Georgia',
    family: 'Georgia, serif'
  }, {
    name: 'Impact',
    family: 'Impact, serif'
  }, {
    name: 'Monospace',
    family: '"Courier New", Courier, monospace'
  }, {
    name: '宋體',
    family: "tahoma, arial, 'Hiragino Sans GB', 宋體, sans-serif"
  }, {
    name: 'Times New Roman',
    family: "Times New Roman"
  }, {
    name: 'Google楷體',
    family: "cwTeXKai, serif"
  }, {
    name: '明體字體',
    family: "cwTeXMing, serif"
  }
]

const CodeOptions = {
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript'
    }, {
      name: 'HTML',
      syntax: 'html'
    }, {
      name: 'CSS',
      syntax: 'css'
    }, {
      name: 'Java',
      syntax: 'java',
    }, {
      name: 'PHP',
      syntax: 'php'
    }
  ]
}

const tableOptions = {
  defaultColumns: 3, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: true, // 插入表格前是否弹出下拉菜单
  columnResizable: true, // 是否允许拖动调整列宽，默认false
  exportAttrString: 'border="1" style="border-collapse: collapse"',
  includeEditors: ["editor"],
}

const markDownOptions = {
  includeEditors: ['editor-id-1'],
  excludeEditors: ['editor-id-2']
}

const colorOptions = {
  theme: 'light', // 指定取色器样式主题，支持dark和light两种样式
}

// 高級取色器
BraftEditor.use(
  ColorPicker(colorOptions)
)
// 多程式碼highlight
BraftEditor.use(
  CodeHighlighter(CodeOptions),
)

BraftEditor.use(
  Markdown(markDownOptions),
)

BraftEditor.use(
  Table(tableOptions),
)

const CustomEditor = ({ defaultData="請輸入內文", outputData, height=300 }) => {
  const handleChange = async (e) => {
    await outputData(e.toHTML())
  }

  const styles = css`
    .bf-container .bf-media-toolbar a{
      font-family: braft-icons !important;
    }
    .bf-content {
      height: ${height}px;
    }
    border-color: #DDDDDD;
    border-radius: 10px;
  `;
  return (
    <div className="editor-wrapper border" css={styles}>
      <BraftEditor
        id="editor"
        language="zh-hant"
        forceNewLine
        fontFamilies={fontFamily}
        controls={controls}
        defaultValue={BraftEditor.createEditorState(defaultData)}
        onChange={handleChange}
      />
    </div>
  )
}

export default CustomEditor
