import {PubSub} from "@google-cloud/pubsub";
import {PublishOptions, PubsubMessage} from "@google-cloud/pubsub/build/src/publisher";

const pubsubClient = new PubSub();

export async function createNewTopicOnPubSub(topicName: string) {
  try {
    await pubsubClient.createTopic(topicName);
    console.warn("Create new topic SUCCESS");
  } catch (error) {
    throw new Error(error);
  }
}

export async function publishNewMessageOnPubSub(topicName: string, newMessage: string) {
  try {
    const message: PubsubMessage = {
      data: Buffer.from(newMessage),
      attributes: {topic: topicName},
      orderingKey: topicName,
    };

    const publishOptions: PublishOptions = {
      messageOrdering: true,
    };

    await pubsubClient.topic(topicName, publishOptions).publishMessage(message);
    console.warn("Publish new message on pub sub SUCCESS");
  } catch (error) {
    throw new Error(error);
  }
}
