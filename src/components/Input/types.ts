import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

type InputTypes = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type InputProps = {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  label?: string
  labelColor?: string
  labelSize?: string
  borderRadius?: string
  borderSize?: string
  borderColor?: string
  isError?: boolean
  errorMessage?: string
  height?: string
} & InputTypes
