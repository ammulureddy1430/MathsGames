import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './components/Header'
import { HomeView } from './components/HomeView'
import { WorldView } from './components/WorldView'
import { GamePlayer } from './components/GamePlayer'
import { TeacherDashboard } from './components/TeacherDashboard'
import { worlds } from './data/curriculum'
import type { Game } from './types'

type View = 'home' | 'world' | 'game' | 'teacher'

export default function App() {
  const [view, setView] = useState<View>('home')
  const [worldId, setWorldId] = useState(1)
  const [game, setGame] = useState<Game | null>(null)
  const world = worlds.find(w => w.id === worldId) ?? worlds[0]
  const home = () => { setGame(null); setView('home') }
  const openWorld = (id: number) => { setWorldId(id); setView('world'); window.scrollTo(0,0) }
  const play = (selected: Game) => { setGame(selected); setView('game'); window.scrollTo(0,0) }
  const daily = () => { setWorldId(3); setGame(worlds[2].games[0]); setView('game') }

  return <div className="min-h-screen">
    {view !== 'game' && <Header view={view} goHome={home} openTeacher={() => setView('teacher')}/>}
    <AnimatePresence mode="wait">
      <motion.div key={view + (game?.id ?? '')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}>
        {view === 'home' && <HomeView openWorld={openWorld} playDaily={daily}/>}
        {view === 'world' && <WorldView world={world} back={home} play={play}/>}
        {view === 'game' && game && <GamePlayer game={game} world={world} exit={() => setView('world')} finish={() => setView('world')}/>}
        {view === 'teacher' && <TeacherDashboard back={home}/>}
      </motion.div>
    </AnimatePresence>
  </div>
}
