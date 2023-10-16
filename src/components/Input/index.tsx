import React from 'react'
import * as S from './styles'
import { InputProps } from './types'

export const Input = ({
  leftIcon,
  rightIcon,
  label,
  labelColor,
  labelSize,
  borderColor,
  borderRadius,
  borderSize,
  height,
  isError,
  errorMessage,
  ...props
}: InputProps) => {
  return (
    <S.Wrapper>
      <S.Container labelColor={labelColor} labelSize={labelSize}>
        {label && <label htmlFor="main-input">{label}</label>}

        <S.InputContainer
          bordercolor={borderColor}
          borderradius={borderRadius}
          bordersize={borderSize}
          iserror={isError ? 'true' : 'false'}
          height={height}
        >
          {leftIcon && <S.LeftIcon>{leftIcon}</S.LeftIcon>}

          <input autoComplete="off" id="main-input" {...props} />

          {rightIcon && <S.RightIcon>{rightIcon}</S.RightIcon>}
        </S.InputContainer>
      </S.Container>

      {isError && errorMessage && <label>Error</label>}
    </S.Wrapper>
  )
}
