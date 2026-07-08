import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { createLessonTopic } from '../../domain/lessonTopics/lessonTopic'
import { getFirebaseDb } from '../firebase/firebaseClient'

const COLLECTION_NAME = 'lessonTopics'

function mapLessonTopicDocument(documentSnapshot) {
  const data = documentSnapshot.data()

  return createLessonTopic({
    id: documentSnapshot.id,
    title: data.title ?? '',
    url: data.url ?? '',
    createdAt: data.createdAt?.toDate?.() ?? null,
  })
}

export function createFirestoreLessonTopicRepository() {
  const db = getFirebaseDb()

  if (!db) {
    return null
  }

  const collectionRef = collection(db, COLLECTION_NAME)

  return {
    subscribe(onChange, onError) {
      const lessonTopicsQuery = query(collectionRef, orderBy('createdAt', 'asc'))

      return onSnapshot(
        lessonTopicsQuery,
        (snapshot) => {
          onChange(snapshot.docs.map(mapLessonTopicDocument))
        },
        onError,
      )
    },

    async add({ title, url }) {
      await addDoc(collectionRef, {
        title,
        url,
        createdAt: serverTimestamp(),
      })
    },
  }
}
