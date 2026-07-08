import { BookOpen, Boxes, CalendarDays, ClipboardList } from 'lucide-react'
import { FeatureCard } from './components/FeatureCard'
import { routes } from './routes'

export function HomePage() {
  return (
    <main className="page">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <div>
            <span className="eyebrow">
              <BookOpen size={16} aria-hidden="true" />
              darslar arxivi
            </span>
            <h1 id="page-title">Bo‘limlar paneli.</h1>
            <p>
              Bu yerda faqat bo‘lim kartochkalari bor. Kerakli bo‘limni bosasiz va uning
              materiallari alohida sahifada ochiladi.
            </p>
          </div>
        </div>

        <aside className="quick-panel" aria-label="Qisqa ma’lumot">
          <div>
            <h2>Sarxisob darslari</h2>
            <p>Birinchi kartochka Firestore’dan olingan mavzular sahifasini ochadi.</p>
          </div>
          <div className="quick-metrics">
            <div className="quick-metric">
              <span>Faol bo‘lim</span>
              <strong>1</strong>
            </div>
            <div className="quick-metric">
              <span>Asosiy sahifa</span>
              <strong>Kartalar</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="cards-grid" aria-label="Sayt bo‘limlari">
        <FeatureCard
          href={routes.lessonTopics}
          icon={ClipboardList}
          title="Sarxisob darslari"
          description="Firebase’dagi barcha dars mavzulari va yangi mavzu qo‘shish formasi."
        />
        <FeatureCard
          disabled
          icon={Boxes}
          title="Keyingi bo‘lim"
          description="Bu joy keyingi bo‘lim uchun tayyor turadi."
        />
        <FeatureCard
          disabled
          icon={CalendarDays}
          title="Yana bir bo‘lim"
          description="Kelajakdagi imkoniyatlar uchun alohida kartochka."
        />
      </section>
    </main>
  )
}
