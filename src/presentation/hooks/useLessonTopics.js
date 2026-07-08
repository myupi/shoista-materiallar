import { useEffect, useMemo, useState } from 'react'
import { validateLessonTopicInput } from '../../domain/lessonTopics/lessonTopic'
import { createFirestoreLessonTopicRepository } from '../../infrastructure/lessonTopics/firestoreLessonTopicRepository'

export function useLessonTopics() {
  const repository = useMemo(() => createFirestoreLessonTopicRepository(), [])
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(repository))
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!repository) {
      setIsLoading(false)
      return undefined
    }

    return repository.subscribe(
      (nextTopics) => {
        setTopics(nextTopics)
        setIsLoading(false)
        setError('')
      },
      () => {
        setError('Firebase’dan mavzularni yuklab bo‘lmadi.')
        setIsLoading(false)
      },
    )
  }, [repository])

  async function addTopic(input) {
    setSuccess('')
    const validation = validateLessonTopicInput(input)

    if (!validation.isValid) {
      return validation
    }

    if (!repository) {
      setError('Firebase sozlanmagan. .env.example dagi o‘zgaruvchilarni .env fayliga qo‘shing.')
      return {
        ...validation,
        isValid: false,
      }
    }

    try {
      setIsSaving(true)
      await repository.add(validation.value)
      setSuccess('Mavzu qo‘shildi.')
      return validation
    } catch {
      setError('Mavzuni saqlab bo‘lmadi. Firebase rules va loyiha sozlamalarini tekshiring.')
      return {
        ...validation,
        isValid: false,
      }
    } finally {
      setIsSaving(false)
    }
  }

  return {
    addTopic,
    error,
    hasRepository: Boolean(repository),
    isLoading,
    isSaving,
    success,
    topics,
  }
}
