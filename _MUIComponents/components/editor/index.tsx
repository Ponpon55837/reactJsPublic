import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import EditorToolbar, { formats } from '@components/editor/EditorToolbar'
import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        bgcolor: 'background.paper',
      }}
    >
      Loading...
    </Box>
  ),
})

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  '& .ql-editor': {
    minHeight: 200,
    maxHeight: 640,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled,
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}))

// ----------------------------------------------------------------------

export interface Props extends ReactQuillProps {
  id?: string
  error?: boolean
  simple?: boolean
  helperText?: ReactNode
  sx?: BoxProps
  disabled?: boolean
}

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  disabled = false,
  ...other
}: Props) {
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: false,
    clipboard: {
      matchVisual: false,
    },
  }

  return (
    <div>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          readOnly={disabled}
          placeholder="Write something awesome..."
          {...other}
        />
      </RootStyle>

      {helperText && helperText}
    </div>
  )
}
