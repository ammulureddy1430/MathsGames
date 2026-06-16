import { motion } from 'framer-motion'
import { ArrowRight, Flame, Play, Sparkles, Star } from 'lucide-react'
import { worlds, badges } from '../data/curriculum'
import { useProgress } from '../store/useProgress'

interface Props { openWorld: (id: number) => void; playDaily: () => void }

export function HomeView({ openWorld, playDaily }: Props) {
  const progress = useProgress()
  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 md:px-8 md:pt-10">
      <section className="relative overflow-hidden rounded-[36px] bg-[#6851C7] p-6 text-white shadow-soft md:p-10">
        <div className="absolute -right-10 -top-12 h-60 w-60 rounded-full bg-[#FFD453]/20" />
        <div className="absolute bottom-[-60px] right-[20%] h-44 w-44 rounded-full bg-white/10" />
        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold"><Sparkles size={16}/> Today is a great day for maths!</div>
          <h1 className="text-3xl font-black leading-tight md:text-5xl">Hello, Math Star! <span className="inline-block">👋</span></h1>
          <p className="mt-3 max-w-lg text-base font-semibold text-white/80 md:text-lg">Pick a world, play a quick game, and discover how fun numbers can be.</p>
          <button onClick={playDaily} className="card-pop mt-6 flex min-h-14 items-center gap-3 rounded-2xl bg-[#FFCE4C] px-6 py-3 font-black text-[#4B3B18] shadow-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/60"><Play size={19} fill="currentColor"/></span>
            Play Today’s Challenge <ArrowRight size={20}/>
          </button>
        </div>
        <motion.div animate={{ y: [0,-8,0], rotate: [-2,2,-2] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-3 right-5 hidden text-[110px] md:block">🦊</motion.div>
      </section>

      <section className="mt-6 grid grid-cols-3 gap-3 md:max-w-xl md:gap-4">
        <Stat icon={<Star fill="#FFBE25" />} value={progress.totalStars} label="Stars earned" color="bg-[#fff1bd] text-[#A46C00]"/>
        <Stat icon={<Flame fill="#FF7A45" />} value={progress.streak} label="Day streak" color="bg-[#ffe4d8] text-[#B74C24]"/>
        <Stat icon={<span className="text-xl">🏆</span>} value={progress.earnedBadges.length} label="Badges" color="bg-[#e6f4ff] text-[#3470A7]"/>
      </section>

      <div className="mt-10 flex items-end justify-between">
        <div><p className="text-sm font-black uppercase tracking-widest text-[#91877d]">Learning journey</p><h2 className="mt-1 text-2xl font-black md:text-3xl">Choose a maths world</h2></div>
        <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-[#776d63] shadow-sm sm:block">{worlds.length} worlds to explore</span>
      </div>
      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {worlds.map((world, index) => {
          const played = progress.results.filter(r => r.worldId === world.id).length
          const locked = index > 5 && progress.results.length < index - 5
          return (
            <motion.button key={world.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * .025,.35) }}
              onClick={() => !locked && openWorld(world.id)} disabled={locked}
              className="card-pop relative flex min-h-36 items-center gap-4 overflow-hidden rounded-[28px] border-2 border-white bg-white p-5 text-left shadow-soft disabled:opacity-55">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-[24px] text-4xl" style={{ background: world.softColor }}>{locked ? '🔒' : world.icon}</span>
              <span className="min-w-0"><span className="block text-xs font-black uppercase tracking-wider" style={{ color: world.color }}>World {world.id}</span><b className="mt-1 block text-xl leading-tight">{world.shortTitle}</b><span className="mt-2 block text-sm font-bold text-[#8a8178]">{world.skill}</span></span>
              {played > 0 && <span className="absolute right-3 top-3 rounded-full bg-[#FFF1B8] px-2.5 py-1 text-xs font-black text-[#A37000]">⭐ {played}</span>}
            </motion.button>
          )
        })}
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-black">Your badge shelf</h2>
        <div className="scrollbar-none mt-4 flex gap-4 overflow-x-auto pb-3">
          {badges.map(badge => <div key={badge.id} className={`min-w-44 rounded-[24px] border-2 border-white p-4 shadow-soft ${progress.earnedBadges.includes(badge.id) ? 'bg-white' : 'bg-[#eeeae4] grayscale opacity-60'}`}><span className="text-4xl">{badge.icon}</span><b className="mt-2 block">{badge.name}</b><span className="text-xs font-bold text-[#8c837a]">{badge.rule}</span></div>)}
        </div>
      </section>
    </main>
  )
}

function Stat({ icon, value, label, color }: { icon: React.ReactNode; value: number; label: string; color: string }) {
  return <div className={`rounded-[22px] p-3 md:flex md:items-center md:gap-3 md:p-4 ${color}`}><span className="mb-1 block md:mb-0">{icon}</span><span><b className="block text-xl leading-none">{value}</b><span className="text-[11px] font-extrabold md:text-xs">{label}</span></span></div>
}
