import { MouseEvent, useState } from 'react'

type ToggleModal = {
  event?: MouseEvent<MouseEvent>
  state?: boolean
}

export default function useToggleModal() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleModal({ event, state }: ToggleModal) {
    if (event) {
      event.stopPropagation()
    }

    state !== undefined ? setIsOpen(state) : setIsOpen(!isOpen)
  }

  return { isOpen, toggleModal }
}
