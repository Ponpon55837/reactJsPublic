import Image from 'next/image'
import PropTypes from 'prop-types'

const CustomImageForThirdParty = ({
  src,
  title = '',
  className = '',
  alt = 'its a image for this page',
  layout = 'responsive',
  width = 16,
  height = 9,
  displayNone = false,
}) => {
  const imgLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <Image
      loader={imgLoader}
      src={src}
      alt={alt}
      title={title}
      className={className}
      layout={layout}
      width={width}
      height={height}
      sx={{ display: displayNone }}
    />
  )
}

export default CustomImageForThirdParty

CustomImageForThirdParty.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  layout: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  displayNone: PropTypes.bool,
}
