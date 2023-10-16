import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {main} from "./express";
import {processMessagesFromClient} from "./services/Message";

admin.initializeApp();

exports.api = functions.https.onRequest(main);

exports.onNewClientWithPendingMessages = functions.firestore.document("clientsWithPendingMessages/{clientId}")
  .onCreate( async (snapshot, context) => {
    const client = context.params.clientId;

    const [collectionName, senderNumber, receiverNumber] = client.split("&");
    await processMessagesFromClient(collectionName, senderNumber, receiverNumber);
  });
