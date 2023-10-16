import styled, { css } from 'styled-components'
import { darken } from 'polished'

import { theme } from '@/styles/theme'
import { BaseTextProps, TextAlignType } from './types'

type WrapperProps = {
  textalign: TextAlignType
  breakword: 'true' | 'false'
  maxwidth: string
  lineheight?: number | string
  overflowellipsis?: string
} & Pick<
  BaseTextProps,
  | 'fontSize'
  | 'fontWeight'
  | 'color'
  | 'alternativeColor'
  | 'uppercase'
  | 'letterSpacing'
  | 'textDecoration'
>

const wrapperModifiers = {
  uppercase: () => css`
    text-transform: uppercase;
  `,
  alternativeColor: (color: string) => css`
    color: ${color};
  `,
  textDecoration: (color: string) => css`
    text-decoration: underline;
    text-underline-position: under;

    &:hover {
      color: ${darken(0.1, color)};
    }
  `,
  overflowEllipsis: (maxWidth: string) => css`
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: ${maxWidth};
    display: block;
    overflow: hidden;
  `
}

export const Wrapper = styled.p<WrapperProps>`
  ${({
    fontSize,
    fontWeight,
    color,
    textalign,
    breakword,
    lineheight,
    letterSpacing,
    uppercase,
    alternativeColor,
    textDecoration,
    maxwidth,
    overflowellipsis
  }) => css`
    margin: 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
    font-size: ${fontSize};
    font-weight: ${theme.font.weight[fontWeight]};
    color: ${color};
    text-align: ${textalign};
    text-decoration: none;
    word-break: ${breakword === 'true' ? 'break-word' : 'normal'};
    line-height: ${!lineheight
      ? 'normal'
      : isNaN(+lineheight)
      ? lineheight
      : `${lineheight}rem`};
    letter-spacing: ${letterSpacing ? `${letterSpacing}rem` : 'normal'};
    white-space: pre-wrap;

    &:visited {
      color: ${color};
    }

    ${uppercase === 'true' && wrapperModifiers.uppercase()}
    ${alternativeColor && wrapperModifiers.alternativeColor(alternativeColor)}
    ${textDecoration === 'true' && wrapperModifiers.textDecoration(color)}
    ${overflowellipsis === 'true' &&
    wrapperModifiers.overflowEllipsis(maxwidth)}
  `}
`
