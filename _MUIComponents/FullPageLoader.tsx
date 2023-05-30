import useMiddleWare from '@hooks/use-middleware'
import { StyledGrid } from '@styles/styles_back_layout/loginStyle'

const FullPageLoader = () => {
  const { systemConfigObjectState } = useMiddleWare()

  return (
    <StyledGrid
      container
      sx={{
        px: '1rem', // eslint-disable-next-line max-len
        backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/images/cover/${systemConfigObjectState?.backgroundImageLink}')`,
      }}
    ></StyledGrid>
  )
}

export default FullPageLoader
