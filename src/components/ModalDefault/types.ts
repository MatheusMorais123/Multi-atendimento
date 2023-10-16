import { HtmlHTMLAttributes } from 'react'

type ModalRighTypes = HtmlHTMLAttributes<HTMLHeadingElement>

export type ModalDefaultProps = {
  onClose: any
} & ModalRighTypes
