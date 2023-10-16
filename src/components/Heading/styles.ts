import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'
import { HeadingProps } from './types'

type WrapperProps = {
  lineheight?: number
} & Pick<
  HeadingProps,
  'fontSize' | 'fontWeight' | 'color' | 'uppercase' | 'letterSpacing'
>

const wrapperModifiers = {
  uppercase: () => css`
    text-transform: uppercase;
  `
}

export const Wrapper = styled.h1<WrapperProps>`
  ${({
    fontSize,
    fontWeight,
    color,
    uppercase,
    lineheight,
    letterSpacing
  }) => css`
    margin: 0;
    font-size: ${fontSize};
    font-weight: ${theme.font.weight[fontWeight]};
    color: ${color};
    line-height: ${lineheight ? `${lineheight}rem` : 'normal'};
    letter-spacing: ${letterSpacing ? `${letterSpacing}` : 'normal'};
    white-space: pre-wrap;

    ${uppercase === 'true' && wrapperModifiers.uppercase()}
  `}
`
