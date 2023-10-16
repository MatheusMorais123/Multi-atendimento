import * as admin from "firebase-admin";
import {Message} from "../../types/message";
import {createNewChat} from "../Chat";

export async function processMessage(message, collectionName) {
  try {
    await createMessage(message, collectionName);
  } catch (error) {
    throw new Error(error);
  }
}

export async function createMessage(newMessage: Partial<Message>, collectionName: string) {
  try {
    const messagesCollection = admin.firestore().collection(collectionName);
    const messageId = messagesCollection.doc().id;
    const message: Message = {
      id: messageId,
      senderNumber: newMessage.senderNumber,
      receiverNumber: newMessage.receiverNumber,
      messageText: newMessage.messageText,
      chatId: null,
      isRead: false,
      isSend: true,
      createdAt: admin.firestore.Timestamp.now(),
    };

    await messagesCollection.doc(messageId).set(message);
    await storeSenderNumberToProcess(message.senderNumber.toString(), message.receiverNumber.toString(), collectionName);

    console.log(`Create a new message into collection: ${collectionName}`);
  } catch (error) {
    throw new Error(`Error on createMessage: ${error}`);
  }
}

async function storeSenderNumberToProcess(senderNumber: string, receiverNumber: string, collectionName: string) {
  const clientRef = admin.firestore().collection("clientsWithPendingMessages").doc(`${collectionName}&${senderNumber}&${receiverNumber}`);

  try {
    const snapshot = await clientRef.get();

    if (!snapshot.exists) {
      await clientRef.set({collectionName, senderNumber});
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function processMessagesFromClient(collectionName: string, senderNumber: string, receiverNumber: string) {
  try {
    await getMessagesAndProcess(collectionName, senderNumber, receiverNumber);

    const id = `${collectionName}&${senderNumber}&${receiverNumber}`;
    await deleteClientsWithPendingMessages(id);

    await getMessagesAndProcess(collectionName, senderNumber, receiverNumber);
  } catch (error) {
    throw new Error(error);
  }
}

async function getMessagesAndProcess(collectionName: string, senderNumber: string, receiverNumber: string) {
  console.log(`getMessagesAndProcess ${collectionName} - ${senderNumber} - ${receiverNumber}`);

  const messagesCollectionRef = admin.firestore().collection(collectionName);
  const messagesQuerySnapshot = await messagesCollectionRef.where("chatId", "==", null).where("senderNumber", "==", senderNumber).limit(50).get();

  if (!messagesQuerySnapshot.empty) {
    const messagesFromSenderNumber: any[] = messagesQuerySnapshot.docs.map((doc) => doc.data()) || [];

    await createNewChat(collectionName, senderNumber, receiverNumber, messagesFromSenderNumber);
    console.warn("Proccess messages SUCCESS");
  } else {
    console.log("messagesQuerySnapshot");
  }
}

async function deleteClientsWithPendingMessages(id: string): Promise<void> {
  const clientsCollectionRef = admin.firestore().collection("clientsWithPendingMessages").doc(id);
  await clientsCollectionRef.delete();
}

export async function updateMessagesWithChatId(collectionName: string, messages: Partial<Message>[], chatId: string, batch) {
  try {
    for (const message of messages) {
      const messageDocRef = admin.firestore().collection(collectionName).doc(message.id);
      batch.update(messageDocRef, {chatId: chatId});
    }
  } catch (error) {
    throw new Error(error);
  }
}
