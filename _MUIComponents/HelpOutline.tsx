import Image from '@components/image'
import { useLocales } from '@locales/index'
import { Box, Chip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const HelpOutlineTextBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
}))

export const HelpOutlineImageBox = styled(Box)(() => ({
  marginTop: '10px',
  marginBottom: '10px',
  padding: '10px',
  background: '#DEDEDE',
  borderRadius: '10px',
}))

export const StyledChip = styled(Chip)(() => ({
  marginRight: '10px',
}))

export const StyledTypography = styled(Typography)(() => ({
  fontWeight: 'bold',
}))

const HelpOutline = () => {
  const { t } = useLocales()

  return (
    <>
      <HelpOutlineTextBox>
        <StyledChip label="Step 1" />
        <StyledTypography> {`${t('PERSONAL_SETTING.stepOne')}`}</StyledTypography>
      </HelpOutlineTextBox>

      <HelpOutlineImageBox>
        <Image
          sx={{ maxWidth: '30rem', margin: 'auto', borderRadius: '10px' }}
          src={'/images/helpOutline/step1.png'}
          alt="picture"
        />
      </HelpOutlineImageBox>

      <HelpOutlineTextBox>
        <StyledChip label="Step 2" />
        <StyledTypography> {`${t('PERSONAL_SETTING.stepTwo')}`}</StyledTypography>
      </HelpOutlineTextBox>

      <HelpOutlineImageBox>
        <Image sx={{ borderRadius: '10px' }} src={'/images/helpOutline/step2.png'} alt="picture" />
      </HelpOutlineImageBox>

      <HelpOutlineImageBox>
        <Image
          sx={{ borderRadius: '10px' }}
          src={'/images/helpOutline/step2-1.png'}
          alt="picture"
        />
      </HelpOutlineImageBox>

      <HelpOutlineTextBox>
        <StyledChip label="Step 3" />
        <StyledTypography>
          {`${t('PERSONAL_SETTING.stepThreeOpen')}`} &#8594;{' '}
          {`${t('PERSONAL_SETTING.stepThreeChat')}`} &#8594;{' '}
          {`${t('PERSONAL_SETTING.stepThreeScan')}`}
        </StyledTypography>
      </HelpOutlineTextBox>

      <HelpOutlineImageBox>
        <Image
          sx={{ maxWidth: '30rem', margin: 'auto', borderRadius: '10px' }}
          src={'/images/helpOutline/step3.png'}
          alt="picture"
        />
      </HelpOutlineImageBox>

      <HelpOutlineTextBox>
        <StyledChip label="Step 4" />
        <StyledTypography> {`${t('PERSONAL_SETTING.stepFour')}`}</StyledTypography>
      </HelpOutlineTextBox>

      <HelpOutlineImageBox>
        <Image
          sx={{ maxWidth: '30rem', margin: 'auto', borderRadius: '10px' }}
          src={'/images/helpOutline/step4.png'}
          alt="picture"
        />
      </HelpOutlineImageBox>

      <HelpOutlineTextBox>
        <StyledChip label="Step 5" />
        <StyledTypography>{`${t('PERSONAL_SETTING.stepFive')}`}</StyledTypography>
      </HelpOutlineTextBox>

      <HelpOutlineImageBox>
        <Image sx={{ borderRadius: '10px' }} src={'/images/helpOutline/step5.png'} alt="picture" />
      </HelpOutlineImageBox>

      <HelpOutlineTextBox>
        <StyledChip label="Step 6" />
        <StyledTypography>{`${t('PERSONAL_SETTING.stepSix')}`}</StyledTypography>
      </HelpOutlineTextBox>

      <HelpOutlineImageBox>
        <Image sx={{ borderRadius: '10px' }} src={'/images/helpOutline/step6.png'} alt="picture" />
      </HelpOutlineImageBox>

      <HelpOutlineTextBox>
        <StyledChip label={`${t('PERSONAL_SETTING.finishedLabel')}`} />
        <StyledTypography>{`${t('PERSONAL_SETTING.finished')}`}</StyledTypography>
      </HelpOutlineTextBox>

      <HelpOutlineImageBox>
        <Image
          sx={{ maxWidth: '30rem', margin: 'auto', borderRadius: '10px' }}
          src={'/images/helpOutline/step7.png'}
          alt="picture"
        />
      </HelpOutlineImageBox>
    </>
  )
}

export default HelpOutline
