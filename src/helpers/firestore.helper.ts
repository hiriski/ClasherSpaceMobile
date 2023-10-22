import firestore from '@react-native-firebase/firestore'

export const docsWithCreatedAt = <T extends {}>(values: T): T => {
  return {
    ...values,
    createdAt: firestore.Timestamp.now(),
  }
}

export const firebaseHelpers = {
  docsWithCreatedAt,
}
