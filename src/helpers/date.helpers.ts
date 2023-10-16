import { FirebaseDate } from '@/models/firebase.models'
import { Message } from '@/redux/message/types'
import {
  fromUnixTime,
  format,
  isToday,
  isYesterday,
  compareAsc,
  getUnixTime
} from 'date-fns'

/**
 * Formats a date returned by Firebase according to the provided rules.
 * If the date is today, the format will be HH:mm.
 * If the date is yesterday, the format will be 'Yesterday'.
 * If the date is after yesterday, the format will be d/MM/yy.
 *
 * @param firebaseDate - Object containing the seconds and nanoseconds values of the Firebase date.
 * @returns The formatted date according to the specified rules.
 */

export function formatDateToChat(firebaseDate: FirebaseDate) {
  const timestampInSeconds = firebaseDate.seconds
  const date = fromUnixTime(timestampInSeconds)

  if (isToday(date)) {
    const formattedDate = format(date, 'HH:mm')
    return formattedDate
  } else if (isYesterday(date)) {
    return 'Ontem'
  } else {
    const formattedDate = format(date, 'd/MM/yy')
    return formattedDate
  }
}

/**
 * Compare function to sort messages by their createdAt property.
 * @param messageA - The first message.
 * @param messageB - The second message.
 * @returns A negative value if messageA should be sorted before messageB,
 *          a positive value if messageA should be sorted after messageB,
 *          or 0 if both messages have the same sort order.
 */
export function compareMessagesByCreatedAt(
  messageA: Message,
  messageB: Message
): number {
  const dateA = new Date(
    messageA.createdAt.seconds * 1000 + messageA.createdAt.nanoseconds / 1000000
  )
  const dateB = new Date(
    messageB.createdAt.seconds * 1000 + messageB.createdAt.nanoseconds / 1000000
  )

  return compareAsc(dateA, dateB)
}

/**
 * Creates a FirebaseDate object based on a provided date.
 * @param {Date} date - The date to create the FirebaseDate object from.
 * @returns {FirebaseDate} The FirebaseDate object with the seconds and nanoseconds properties.
 */
export function createFirebaseDate(date: Date): FirebaseDate {
  const seconds = getUnixTime(date)
  const nanoseconds = date.getMilliseconds() * 1000000

  return {
    seconds,
    nanoseconds
  }
}
