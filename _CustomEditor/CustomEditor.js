import React from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import '@ckeditor/ckeditor5-build-classic/build/translations/zh'
import { css } from "@emotion/core"

const editorType = {
  class: ClassicEditor,
}

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
    "selectAll",
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
  viewportTopOffset: 30,
  shouldNotGroupWhenFull: true,
  language: 'zh',
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph'
      }, {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1'
      }, {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2'
      }, {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3'
      }, {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4'
      }, {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5'
      }, {
        model: 'heading6',
        view: 'h6',
        title: 'Heading 6',
        class: 'ck-heading_heading6'
      },
    ]
  }
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
      editor={editorType.class}
      data={defaultData}
      config={config}
      onReady={editor => {
        editor.ui.view.editable.element.parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.view.editable.element
        );
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        outputData(data)
      }}
    />
  )
}

export default CustomEditor
