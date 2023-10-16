import React, { useEffect, useState } from 'react'
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated'

import * as S from './styles'
import { MultiSelectProps } from './types'

const animatedComponents = makeAnimated()

const MultiSelect = ({
  placeholder = 'Selecione...',
  options,
  isDisabled,
  isLoading,
  isMulti,
  isClearable = false,
  isSearchable = false,
  onChange,
  className = 'multi-select',
  classNamePrefix = 'multi-select',
  maxMenuHeight,
  defaultValue,
  isError,
  errorMessage
}: MultiSelectProps) => {
  const styles = {
    container: (baseStyles, state) => ({
      ...baseStyles,
      ...S.getContainerCustomStyles(state)
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      ...S.getControlCustomStyles(state)
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      ...S.getMenuCustomStyles(state)
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      ...S.getOptionCustomStyles(state)
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      ...S.getPlaceholderCustomStyles(state)
    }),
    indicatorSeparator: (baseStyles, state) => ({
      ...baseStyles,
      ...S.getIndicatorSeparatorCustomStyles(state)
    }),
    indicatorsContainer: (baseStyles, state) => ({
      ...baseStyles,
      ...S.getIndicatorsContainerCustomStyles(state)
    }),
    menuList: (baseStyles, state) => ({
      ...baseStyles,
      ...S.getMenuListCustomStyles(state)
    })
  }

  const [isErrorState, setIsErrorState] = useState(false)
  const [errorMessageState, setErrorMessageState] = useState('')

  useEffect(() => {
    setIsErrorState(isError)
  }, [isError])

  useEffect(() => {
    setErrorMessageState(errorMessage)
  }, [errorMessage])

  return (
    <S.Wrapper iserror={isErrorState ? 'true' : 'false'}>
      <Select
        defaultValue={defaultValue}
        className={className}
        classNamePrefix={classNamePrefix}
        styles={styles as StylesConfig}
        onChange={(newValue: any) => {
          setErrorMessageState('')
          setIsErrorState(false)
          onChange(newValue)
        }}
        components={animatedComponents}
        options={options}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isMulti={isMulti}
        isSearchable={isSearchable}
        closeMenuOnSelect={!isMulti}
        placeholder={placeholder}
        maxMenuHeight={maxMenuHeight}
      />

      {isErrorState && errorMessageState && <label>{errorMessageState}</label>}
    </S.Wrapper>
  )
}

export default MultiSelect
