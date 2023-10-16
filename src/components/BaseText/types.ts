import { theme } from '@/styles/theme'
import { AnchorHTMLAttributes, HTMLAttributes } from 'react'

type BaseTextTypes =
  | HTMLAttributes<HTMLParagraphElement>
  | HTMLAttributes<HTMLSpanElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>

export type TextAlignType =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent'

export type BaseTextProps = {
  fontSize?: string
  fontWeight?: keyof typeof theme.font.weight
  color?: string
  alternativeColor?: string
  uppercase?: 'true' | 'false'
  textAlign?: TextAlignType
  breakWord?: 'true' | 'false'
  textDecoration?: 'true' | 'false'
  lineHeight?: number | string
  letterSpacing?: number
  overflowEllipsis?: 'false' | 'true'
  maxWidth?: string
  as?: 'p' | 'span' | 'a'
} & BaseTextTypes
