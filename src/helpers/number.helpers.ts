export function formatPhoneNumber(number: number | string) {
  function phoneFormatter10(phone: string) {
    phone = phone.replace(/[^\d]/g, '') // remove all non digits
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  if (!number) return
  const stringNumber = number.toString()

  if (stringNumber.length === 10) {
    return phoneFormatter10(stringNumber)
  }

  return stringNumber
    .toString()
    .replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
}
