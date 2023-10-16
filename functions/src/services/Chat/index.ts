import * as admin from "firebase-admin";
import {v4 as uuidv4} from "uuid";
import {updateMessagesWithChatId} from "../Message";
import {Message, getLastMessageFromMessages} from "./helpers";

export async function createNewChat(collectionName: string, senderNumber: string, receiverNumber: string, messages: Message[]) {
  console.log(`createNewChat ${collectionName} - ${senderNumber} - ${receiverNumber}`);

  try {
    const chatsCollectionName = `chats-to-${collectionName}`;
    const batch = admin.firestore().batch();
    const dateNow = admin.firestore.FieldValue.serverTimestamp();
    const existingChatQuerySnapshot = await admin.firestore()
      .collection(chatsCollectionName)
      .where("requesterNumber", "==", senderNumber)
      .where("receiverNumber", "==", receiverNumber)
      .limit(1)
      .get();


    if (!existingChatQuerySnapshot.empty) {
      const existingChatDoc = existingChatQuerySnapshot.docs[0];
      const chatId = existingChatDoc.id;
      await updateMessagesWithChatId(collectionName, messages, chatId, batch);
      const lastMessage = await getLastMessageFromMessages(messages);
      console.log({MESSAGES: messages});
      console.log({LAST_MESSAGE: lastMessage});

      const currentUnreadMessagesCount = existingChatDoc.data().unreadMessagesCount || 0;
      const newUnreadMessagesCount = currentUnreadMessagesCount + messages.length;
      batch.update(existingChatDoc.ref, {lastMessage, unreadMessagesCount: newUnreadMessagesCount, updatedAt: dateNow});
      await batch.commit();
    } else {
      const uniqueId = uuidv4();
      const lastMessage = await getLastMessageFromMessages(messages);
      const chatData = {
        id: uniqueId,
        status: "open",
        requesterNumber: lastMessage.senderNumber,
        receiverNumber: lastMessage.receiverNumber,
        lastMessage: lastMessage,
        unreadMessagesCount: messages.length,
        createdAt: dateNow,
        updatedAt: dateNow,
      };
      console.error({MESSAGES: messages});
      console.error({LAST_MESSAGE: lastMessage});

      await updateMessagesWithChatId(collectionName, messages, chatData.id, batch);
      const chatDocRef = admin.firestore().collection(chatsCollectionName).doc(chatData.id);
      batch.set(chatDocRef, chatData);
      await batch.commit();
    }
  } catch (error) {
    throw new Error(error);
  }
}

