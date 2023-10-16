import React from 'react'
import * as S from './styles'
import { HeadingProps } from './types'

const Heading = ({
  children,
  headingLevel = 'h1',
  fontSize,
  fontWeight,
  color,
  uppercase = 'false',
  lineHeight,
  letterSpacing,
  ...props
}: HeadingProps) => {
  return (
    <S.Wrapper
      as={headingLevel}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      uppercase={uppercase}
      lineheight={lineHeight}
      letterSpacing={letterSpacing}
      {...props}
    >
      {children}
    </S.Wrapper>
  )
}

export default Heading
