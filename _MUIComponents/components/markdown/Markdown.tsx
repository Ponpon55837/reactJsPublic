import NextLink from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { Divider, Link, Typography } from '@mui/material'
import Image from '../image'
import StyledMarkdown from './styles'
import { MarkdownProps } from './types'

export default function Markdown({ sx, ...other }: MarkdownProps) {
  return (
    <StyledMarkdown sx={sx}>
      <ReactMarkdown
        // rehypePlugins={[rehypeRaw, rehypeHighlight, [remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        remarkPlugins={[remarkGfm, remarkBreaks]} // 修改 remarkPlugins
        components={components}
        {...other}
      />
    </StyledMarkdown>
  )
}

// ----------------------------------------------------------------------

const components = {
  h1: ({ ...props }) => <Typography variant="h1" gutterBottom {...props} />,
  h2: ({ ...props }) => <Typography variant="h2" gutterBottom {...props} />,
  h3: ({ ...props }) => <Typography variant="h3" gutterBottom {...props} />,
  h4: ({ ...props }) => <Typography variant="h4" gutterBottom {...props} />,
  h5: ({ ...props }) => <Typography variant="h5" gutterBottom {...props} />,
  h6: ({ ...props }) => <Typography variant="h6" gutterBottom {...props} />,
  p: ({ ...props }) => <Typography paragraph {...props} />,
  hr: ({ ...props }) => <Divider sx={{ my: 3 }} {...props} />,
  img: ({ ...props }) => (
    <Image alt={props.alt} ratio="16/9" sx={{ borderRadius: 2, my: 5 }} {...props} />
  ),
  a: ({ ...props }) => {
    const isHttp = props.href.includes('http')

    return isHttp ? (
      <Link target="_blank" rel="noopener" {...props} />
    ) : (
      <Link component={NextLink} href={props.href} {...props}>
        {props.children}
      </Link>
    )
  },
}
