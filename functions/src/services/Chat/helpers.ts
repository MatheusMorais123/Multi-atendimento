import {FirebaseDate} from "../../types/firebase";
import {Message as MessageMain} from "../../types/message";

export type Message = {
  createdAt: FirebaseDate
} & MessageMain


function compareCreatedAt(a: Message, b: Message) {
  const aTimeInSeconds = convertToSeconds(a.createdAt);
  const bTimeInSeconds = convertToSeconds(b.createdAt);
  return bTimeInSeconds - aTimeInSeconds;
}

function convertToSeconds(createdAt: FirebaseDate) {
  return createdAt._seconds;
}

export async function getLastMessageFromMessages(messages: Message[]) {
  const sortedMessages = [...messages].sort(compareCreatedAt);
  return sortedMessages[0];
}

