export function createLessonTopic({ id, title, url, createdAt }) {
  return {
    id,
    title: title.trim(),
    url: url.trim(),
    createdAt,
  }
}

export function validateLessonTopicInput({ title, url }) {
  const errors = {}
  const normalizedTitle = title.trim()
  const normalizedUrl = url.trim()

  if (!normalizedTitle) {
    errors.title = 'Mavzu nomini kiriting.'
  }

  if (!normalizedUrl) {
    errors.url = 'Material havolasini kiriting.'
  } else {
    try {
      const parsedUrl = new URL(normalizedUrl)

      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        errors.url = 'Havola http yoki https bilan boshlanishi kerak.'
      }
    } catch {
      errors.url = 'To‘g‘ri havola kiriting.'
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    value: {
      title: normalizedTitle,
      url: normalizedUrl,
    },
  }
}
