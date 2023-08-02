import * as React from 'react'
import MoodBadRoundedIcon from '@mui/icons-material/MoodBadRounded'
import MoodRoundedIcon from '@mui/icons-material/MoodRounded'
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded'
import SentimentNeutralRoundedIcon from '@mui/icons-material/SentimentNeutralRounded'
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded'
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded'
import Rating, { IconContainerProps } from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import {
  ADMIN_RATING_GREEN,
  ADMIN_RATING_LIME,
  ADMIN_RATING_ORANGE,
  ADMIN_RATING_RED,
  ADMIN_RATING_TEAL,
  ADMIN_RATING_YELLOW,
} from '@theme/colorManager'

const StyledRating = styled(Rating)(({ theme }) => ({
  '&.Mui-disabled': {
    opacity: 0.9,
  },
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}))

const customIcons: {
  [index: string]: {
    icon: React.ReactElement
    label: string
  }
} = {
  1: {
    icon: (
      <MoodBadRoundedIcon
        sx={{
          color: ADMIN_RATING_RED,
          fontSize: { xs: '2.5rem', sm: '5.5rem' },
          mr: '0.4rem',
          p: { xs: 0, sm: '0.5rem' },
        }}
      />
    ),
    label: 'Mood Bad',
  },
  2: {
    icon: (
      <SentimentDissatisfiedRoundedIcon
        sx={{
          color: ADMIN_RATING_ORANGE,
          fontSize: { xs: '2.5rem', sm: '5.5rem' },
          mr: '0.4rem',
          p: { xs: 0, sm: '0.5rem' },
        }}
      />
    ),
    label: 'Dissatisfied',
  },
  3: {
    icon: (
      <SentimentNeutralRoundedIcon
        sx={{
          color: ADMIN_RATING_YELLOW,
          fontSize: { xs: '2.5rem', sm: '5.5rem' },
          mr: '0.4rem',
          p: { xs: 0, sm: '0.5rem' },
        }}
      />
    ),
    label: 'Neutral',
  },
  4: {
    icon: (
      <SentimentSatisfiedRoundedIcon
        sx={{
          color: ADMIN_RATING_LIME,
          fontSize: { xs: '2.5rem', sm: '5.5rem' },
          mr: '0.4rem',
          p: { xs: 0, sm: '0.5rem' },
        }}
      />
    ),
    label: 'Satisfied',
  },
  5: {
    icon: (
      <MoodRoundedIcon
        sx={{
          color: ADMIN_RATING_GREEN,
          fontSize: { xs: '2.5rem', sm: '5.5rem' },
          mr: '0.4rem',
          p: { xs: 0, sm: '0.5rem' },
        }}
      />
    ),
    label: 'Mood',
  },
  6: {
    icon: (
      <SentimentVerySatisfiedRoundedIcon
        sx={{
          color: ADMIN_RATING_TEAL,
          fontSize: { xs: '2.5rem', sm: '5.5rem' },
          p: { xs: 0, sm: '0.5rem' },
        }}
      />
    ),
    label: 'Very Satisfied',
  },
}

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props
  let icon = customIcons[value]?.icon
  return <span {...other}>{icon}</span>
}

interface RadioGroupRatingProps {
  disabled?: boolean
  value?: number | null
  onChange?: any
}

const RadioGroupRating = ({ disabled = false, value, onChange }: RadioGroupRatingProps) => {
  return (
    <StyledRating
      name="highlight-selected-only"
      value={value}
      onChange={onChange}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value]?.label}
      highlightSelectedOnly
      max={6} // 設定最大評分等級為6
      disabled={disabled}
    />
  )
}

export default RadioGroupRating
