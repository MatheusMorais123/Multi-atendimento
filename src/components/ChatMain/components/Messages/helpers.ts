export const scrollToBottom = (ref: any) => {
  if (ref.current) {
    const scrollContainer = ref.current
    scrollContainer.scrollTop = scrollContainer.scrollHeight
  }
}
