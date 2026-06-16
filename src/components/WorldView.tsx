import { motion } from 'framer-motion'
import { ArrowLeft, Play, Star } from 'lucide-react'
import type { Game, World } from '../types'
import { useProgress } from '../store/useProgress'

interface Props { world: World; back: () => void; play: (game: Game) => void }

export function WorldView({ world, back, play }: Props) {
  const results = useProgress(s => s.results)
  return <main className="mx-auto max-w-5xl px-4 pb-28 pt-8 md:px-8">
    <button onClick={back} className="mb-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 font-black shadow-sm"><ArrowLeft size={19}/> All worlds</button>
    <section className="relative overflow-hidden rounded-[34px] p-7 text-white shadow-soft md:p-10" style={{ background: world.color }}>
      <div className="absolute -right-5 -top-10 text-[150px] opacity-25">{world.icon}</div>
      <p className="font-black uppercase tracking-[.2em] text-white/70">World {world.id}</p>
      <h1 className="relative mt-2 text-3xl font-black md:text-5xl">{world.title}</h1>
      <p className="relative mt-3 max-w-xl text-lg font-bold text-white/80">Practice {world.skill.toLowerCase()} through quick, playful activities.</p>
    </section>
    <h2 className="mt-9 text-2xl font-black">Choose a game</h2>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      {world.games.map((game, i) => {
        const best = results.filter(r => r.gameId === game.id).sort((a,b) => b.stars-a.stars)[0]
        return <motion.button key={game.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i*.08 }} onClick={() => play(game)} className="card-pop group flex min-h-32 items-center gap-4 rounded-[28px] border-2 border-white bg-white p-5 text-left shadow-soft">
          <span className="grid h-20 w-20 place-items-center rounded-[24px] text-4xl" style={{ background: world.softColor }}>{game.icon}</span>
          <span className="flex-1"><b className="block text-xl">{game.title}</b><span className="mt-1 block text-sm font-bold text-[#887f76]">5 quick rounds</span>{best && <span className="mt-2 flex items-center gap-1 text-sm font-black text-[#B57B00]"><Star size={15} fill="#FFBE25"/>{best.stars} best</span>}</span>
          <span className="grid h-11 w-11 place-items-center rounded-full text-white transition-transform group-hover:scale-110" style={{ background: world.color }}><Play size={18} fill="currentColor"/></span>
        </motion.button>
      })}
    </div>
  </main>
}
