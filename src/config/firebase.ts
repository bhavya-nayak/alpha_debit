
import * as admin from 'firebase-admin'
const serviceAccount = require('../../authFirebase.json')

// Initialize Firebase Admin SDK
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// Get Firestore database instance
const db = firebaseApp.firestore()

export { db }
