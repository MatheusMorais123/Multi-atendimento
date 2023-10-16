import React from 'react'
import * as S from './styles'
import { MainClipLoaderProps } from './types'
import { ClipLoader } from 'react-spinners'

const MainClipLoader = ({ offsetHeight }: MainClipLoaderProps) => {
  return (
    <S.Wrapper offsetHeight={offsetHeight}>
      <ClipLoader color="#464646" size={100} />
    </S.Wrapper>
  )
}

export default MainClipLoader
