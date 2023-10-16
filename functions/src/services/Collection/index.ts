import * as admin from "firebase-admin";

export async function createCollection(collectionName: string) {
  try {
    const collections = await admin.firestore().listCollections();

    const existingCollection = collections.find((collection) => collection.id === collectionName);

    if (existingCollection) {
      console.log(`The collection ${collectionName} already exists`);
    } else {
      await admin.firestore().collection(collectionName).add({});
      console.log(`Collection ${collectionName} successfully created`);
    }
  } catch (error) {
    throw new Error(error);
  }
}
