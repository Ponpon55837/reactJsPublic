import React from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import '@ckeditor/ckeditor5-build-classic/build/translations/zh';
import { css } from "@emotion/core"

const config = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    // "|",
    // "indent",
    // "outdent",
    // "imageUpload",
    "|",
    "insertTable",
    "tableColumn",
    "tableRow",
    "mergeTableCells",
    "|",
    "undo",
    "redo",
  ],
  language: 'zh',
}

const CustomEditor = ({ defaultData, outputData }) => {
  const styles = css`
    position: relative;
    z-index: 1;
    &::before {
      color: rgba(192, 192, 192, 1);
      content: attr(data-placeholder);
      padding: 0 11px;
      position: absolute;
      margin: var(--ck-spacing-large) 0;
      top: 0;
      z-index: -1;
    }
  `;
  return (
    <CKEditor
      css={styles}
      editor={ClassicEditor}
      data={defaultData}
      config={config}
      onChange={(event, editor) => {
        const data = editor.getData();
        outputData(data)
      }}
    />
  );
}

export default CustomEditor
