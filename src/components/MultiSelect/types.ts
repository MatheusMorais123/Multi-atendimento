type Option = {
  value: string | number
  label: string
}

export type MultiSelectProps = {
  placeholder?: string
  options: Option[]
  defaultValue?: Option
  isClearable?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  isMulti?: boolean
  isSearchable?: boolean
  className?: string
  classNamePrefix?: string
  maxMenuHeight?: number
  isError?: boolean
  errorMessage?: string
  onChange: (newValue: Option | Option[]) => void
}
