import { useRef } from 'react'
import { useUpdateEffect } from 'react-use'
import Carousel, { CarouselArrows, CarouselDots } from '@components/carousel'
import Image from '@components/image'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

type Props = {
  data: {
    id: string
    name: string
  }[]
  produce: any
  defaultValue: string
}

export default function CarouselBasic3({ data, produce, defaultValue }: Props) {
  const theme = useTheme()

  const carouselRef = useRef<Carousel | null>(null)

  const carouselSettings = {
    dots: true,
    arrows: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: { mt: 3 },
    }),
    afterChange: (current: any) => {
      produce((draft: any) => {
        draft.backgroundImage = data[current]?.id
      })
    },
  }

  const handlePrev = () => {
    carouselRef.current?.slickPrev()
  }

  const handleNext = () => {
    carouselRef.current?.slickNext()
  }

  useUpdateEffect(() => {
    if (defaultValue !== data[0]?.id) {
      const getIdValue = defaultValue.slice(3, 5)
      carouselRef.current?.slickGoTo(parseInt(getIdValue, 10) - 1)
    } else {
      carouselRef.current?.slickGoTo(0)
    }
  }, [defaultValue])

  return (
    <Box
      sx={{
        position: 'relative',
        '& .slick-list': {
          borderRadius: 2,
          boxShadow: theme.customShadows.z16,
        },
        mx: 'auto',
        minWidth: '150px !important',
        maxWidth: '420px !important',
      }}
    >
      <CarouselArrows filled shape="rounded" onNext={handleNext} onPrevious={handlePrev}>
        <Carousel ref={carouselRef} {...carouselSettings}>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  )
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  id: string
  name: string
}

function CarouselItem({ item }: { item: CarouselItemProps }) {
  const { name } = item

  return (
    <Image
      alt="Background Image Preview"
      src={`/images/cover/${name}`}
      sx={{ maxWidth: '100%', mt: 3, borderRadius: '10px' }}
    />
  )
}
