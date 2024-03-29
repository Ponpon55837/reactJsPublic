import { MotionProps, m } from 'framer-motion'
import { varContainer } from '@components/animate/variants'
import useResponsive from '@hooks/useResponsive'
import { Box, BoxProps } from '@mui/material'

type IProps = BoxProps & MotionProps

interface Props extends IProps {
  children: React.ReactNode
  disableAnimatedMobile?: boolean
}

export default function MotionViewport({
  children,
  disableAnimatedMobile = true,
  ...other
}: Props) {
  const isMobile = useResponsive('down', 'sm')

  if (isMobile && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  )
}
