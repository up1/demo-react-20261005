import { SearchPanel, TrackingResult } from './features/tracking'
import { Header } from './shared/components/Header'

export default function App() {
  return (
    <div className="min-h-screen bg-background font-body text-on-surface selection:bg-primary selection:text-on-primary">
      <Header />
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col space-y-10 bg-background px-8 pt-24 pb-16">
        <SearchPanel />
        <TrackingResult />
      </main>
    </div>
  )
}
