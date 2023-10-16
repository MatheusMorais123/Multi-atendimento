
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";

import {processMessage} from "./services/Message";
import {createNewTopicOnPubSub, publishNewMessageOnPubSub} from "./services/Topic";
import {createSubscription} from "./services/Subscription";
import {createCollection} from "./services/Collection";

const app = express();
const main = express();
main.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
}));
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));
main.use("/v1", app);

app.post("/messages", async (req, res) => {
  if (req.method !== "POST") {
    res.status(400)
      .send("Invalid request method. Only POST requests are allowed.");
    return;
  }

  try {
    const newMessage = req.body;

    if (!newMessage.topicName || !newMessage.senderNumber || !newMessage.receiverNumber || !newMessage.messageText) {
      res.status(400).send("Missing required fields.");
      return;
    }

    const newMessageToPublish = JSON.stringify(newMessage);
    await publishNewMessageOnPubSub(newMessage.topicName, newMessageToPublish);
    res.status(201).send("Message added successfully.");
  } catch (error) {
    res.status(500).send("An error occurred while adding the message.");
  }
});

app.post("/create-new-user-resource", async (req, res) => {
  if (req.method !== "POST") {
    res.status(400)
      .send("Invalid request method. Only POST requests are allowed.");
    return;
  }

  try {
    if (!req.body.userId) {
      res.status(400).send("Missing required fields.");
      return;
    }

    const {userId} = req.body;

    const topicName = `devChat-messages-topic_${userId}`;
    const subscriptionName = topicName;
    const collectionName = topicName;

    await createNewTopicOnPubSub(topicName);

    await createSubscription(topicName, subscriptionName);

    await createCollection(collectionName);

    res.status(201).send(`Resource successfully created to user ${userId}`);
  } catch (error) {
    res.status(500).send(`Internal server error ${error}`);
  }
});

app.post("/push-messages", async (req, res) => {
  if (req.method !== "POST") {
    res.status(400)
      .send("Invalid request method. Only POST requests are allowed.");
    return;
  }

  const {message, subscription} = req.body;

  try {
    const splitedSubscription = subscription.split("/");
    const subscriptionName = splitedSubscription[splitedSubscription.length - 1];

    const decodedMessage = Buffer.from(message.data, "base64").toString("utf-8");

    const messageData = JSON.parse(decodedMessage);

    await processMessage(messageData, subscriptionName);
    res.status(200).send("Message successfully proccessed");
  } catch (error) {
    res.status(500).send(`An error occurred while push messages to topic: ${subscription}`);
  }
});

export {main};

