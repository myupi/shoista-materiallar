import { useState } from 'react'
import { ArrowUpRight, Plus, X } from 'lucide-react'

export function LessonTopicsPanel({
  addTopic,
  error,
  hasRepository,
  isLoading,
  isSaving,
  success,
  topics,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState({ title: '', url: '' })
  const [fieldErrors, setFieldErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()

    const result = await addTopic(form)
    setFieldErrors(result.errors)

    if (result.isValid) {
      setForm({ title: '', url: '' })
      setIsFormOpen(false)
    }
  }

  return (
    <section className="content-panel" id="lesson-topics">
      <div className="panel-header">
        <div>
          <h2>Sarxisob darslari mavzulari</h2>
          <p>Materiallar Firebase’dan olinadi va yangi oynada ochiladi.</p>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={() => setIsFormOpen((value) => !value)}
          aria-expanded={isFormOpen}
          aria-controls="topic-form"
          aria-label={isFormOpen ? 'Mavzu qo‘shish formasini yopish' : 'Yangi mavzu qo‘shish'}
        >
          {isFormOpen ? <X size={20} /> : <Plus size={20} />}
          <span>{isFormOpen ? 'Yopish' : 'Qo‘shish'}</span>
        </button>
      </div>

      {isFormOpen && (
        <div className="form-wrap" id="topic-form">
          <form className="topic-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="topic-title">Mavzu nomi</label>
              <input
                id="topic-title"
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="GitHub’ga push qilish"
                aria-describedby={fieldErrors.title ? 'topic-title-error' : undefined}
              />
              {fieldErrors.title && (
                <span className="alert is-error" id="topic-title-error" role="alert">
                  {fieldErrors.title}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="topic-url">Havola</label>
              <input
                id="topic-url"
                type="url"
                value={form.url}
                onChange={(event) => setForm({ ...form, url: event.target.value })}
                placeholder="https://claude.ai/public/artifacts/..."
                aria-describedby={fieldErrors.url ? 'topic-url-error' : undefined}
              />
              {fieldErrors.url && (
                <span className="alert is-error" id="topic-url-error" role="alert">
                  {fieldErrors.url}
                </span>
              )}
            </div>

            <div className="form-actions">
              <button className="primary-button" type="submit" disabled={isSaving}>
                <Plus size={18} aria-hidden="true" />
                {isSaving ? 'Saqlanmoqda' : 'Saqlash'}
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  setForm({ title: '', url: '' })
                  setFieldErrors({})
                }}
              >
                Tozalash
              </button>
            </div>
          </form>
        </div>
      )}

      {!hasRepository && (
        <div className="alert is-warning" role="status">
          Firebase sozlanmagan. `.env.example` asosida `.env` faylini to‘ldiring va
          dev-serverni qayta ishga tushiring.
        </div>
      )}

      {error && (
        <div className="alert is-error" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert is-success" role="status">
          {success}
        </div>
      )}

      {isLoading ? (
        <div className="skeleton-list" aria-label="Mavzular yuklanmoqda">
          <div className="skeleton-row" />
          <div className="skeleton-row" />
          <div className="skeleton-row" />
        </div>
      ) : topics.length > 0 ? (
        <ul className="lesson-list">
          {topics.map((topic) => (
            <li key={topic.id}>
              <a className="lesson-link" href={topic.url} target="_blank" rel="noreferrer">
                <span>
                  <span className="lesson-title">{topic.title}</span>
                  <span className="lesson-url">{topic.url}</span>
                </span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">Hozircha mavzular yo‘q. Yuqoridagi tugma orqali birinchi mavzuni qo‘shing.</div>
      )}
    </section>
  )
}
