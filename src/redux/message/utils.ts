export function generateTicketNumber() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hour = String(currentDate.getHours()).padStart(2, '0')
  const minute = String(currentDate.getMinutes()).padStart(2, '0')
  const second = String(currentDate.getSeconds()).padStart(2, '0')

  const randomNumber = Math.floor(Math.random() * 10000) // Random number up to 4 digits

  const protocolNumber = `${year}${month}${day}${hour}${minute}${second}-${randomNumber}`
  return protocolNumber
}
