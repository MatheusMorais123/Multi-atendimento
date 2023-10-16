import {PubSub} from "@google-cloud/pubsub";

const pubsubClient = new PubSub();

export async function createSubscription(topicName: string, subscriptionName: string) {
  try {
    const pushEndpoint = "https://us-central1-chatdevzapp.cloudfunctions.net/api/v1/push-messages";
    const [subscription] = await pubsubClient.topic(topicName).createSubscription(subscriptionName, {
      pushConfig: {
        pushEndpoint,
      },
    });
    console.warn("Subscription creation SUCCESS:", subscription.name);
  } catch (error) {
    throw new Error(error);
  }
}
