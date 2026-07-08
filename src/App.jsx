import { AppLayout } from './presentation/AppLayout'
import { HomePage } from './presentation/HomePage'
import { LessonTopicsPage } from './presentation/LessonTopicsPage'
import { useCurrentRoute } from './presentation/hooks/useCurrentRoute'
import './index.css'

function App() {
  const route = useCurrentRoute()

  return (
    <AppLayout status={route === '/sarxisob-darslari' ? 'Firestore mavzulari' : 'Asosiy bo‘limlar'}>
      {route === '/sarxisob-darslari' ? <LessonTopicsPage /> : <HomePage />}
    </AppLayout>
  )
}

export default App
