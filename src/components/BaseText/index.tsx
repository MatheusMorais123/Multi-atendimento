import React from 'react'
import * as S from './styles'
import { BaseTextProps } from './types'

const BaseText = ({
  children,
  alternativeColor,
  fontSize,
  fontWeight,
  color,
  uppercase = 'false',
  textAlign = 'start',
  breakWord = 'false',
  textDecoration = 'false',
  lineHeight,
  letterSpacing,
  overflowEllipsis = 'false',
  maxWidth,
  ...props
}: BaseTextProps) => {
  return (
    <S.Wrapper
      maxwidth={maxWidth}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      alternativeColor={alternativeColor}
      uppercase={uppercase}
      textalign={textAlign}
      breakword={breakWord}
      textDecoration={textDecoration}
      lineheight={lineHeight}
      letterSpacing={letterSpacing}
      overflowellipsis={overflowEllipsis}
      {...props}
    >
      {children}
    </S.Wrapper>
  )
}

export default BaseText
