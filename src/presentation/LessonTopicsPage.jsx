import { ArrowLeft, BookOpen } from 'lucide-react'
import { LessonTopicsPanel } from './components/LessonTopicsPanel'
import { useLessonTopics } from './hooks/useLessonTopics'
import { navigateTo, routes } from './routes'

export function LessonTopicsPage() {
  const lessonTopics = useLessonTopics()

  function handleBackClick(event) {
    event.preventDefault()
    navigateTo(routes.home)
  }

  return (
    <main className="page">
      <section className="section-hero" aria-labelledby="lesson-topics-title">
        <a className="back-link" href={routes.home} onClick={handleBackClick}>
          <ArrowLeft size={18} aria-hidden="true" />
          Asosiy sahifa
        </a>

        <span className="eyebrow">
          <BookOpen size={16} aria-hidden="true" />
          Sarxisob darslari
        </span>
        <h1 id="lesson-topics-title">Dars mavzulari</h1>
        <p>
          Bu yerda Firebase’dan olingan mavzular ketma-ket turadi. Mavzuni bossangiz,
          prezentatsiya yoki material yangi oynada ochiladi.
        </p>
      </section>

      <LessonTopicsPanel {...lessonTopics} />
    </main>
  )
}
