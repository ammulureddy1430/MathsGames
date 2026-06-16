import { BarChart3, Home, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProgress } from '../store/useProgress'

interface Props {
  view: string
  goHome: () => void
  openTeacher: () => void
}

export function Header({ view, goHome, openTeacher }: Props) {
  const stars = useProgress(s => s.totalStars)
  return (
    <header className="sticky top-0 z-30 px-4 pt-3 md:px-8">
      <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-[24px] border border-white px-4 py-3 shadow-soft">
        <button onClick={goHome} className="flex items-center gap-2 rounded-2xl p-1 pr-3 font-black" aria-label="Go home">
          <motion.span whileHover={{ rotate: -8 }} className="grid h-11 w-11 place-items-center rounded-2xl bg-[#FFCB44] text-2xl">P</motion.span>
          <span className="hidden text-left leading-tight sm:block"><b className="block text-lg">PEHCHAAN</b><span className="text-xs text-[#82786d]">MATH PLAY</span></span>
        </button>
        <div className="flex items-center gap-2">
          {view !== 'home' && <button onClick={goHome} className="grid h-11 w-11 place-items-center rounded-2xl bg-[#fff4d4]" aria-label="Home"><Home size={21}/></button>}
          <div className="flex h-11 items-center gap-1.5 rounded-2xl bg-[#fff4d4] px-3 font-black text-[#B77B00]"><Star size={20} fill="#FFBE25"/>{stars}</div>
          <button onClick={openTeacher} className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e9f2ff] text-[#3977b9]" aria-label="Teacher dashboard"><BarChart3 size={21}/></button>
        </div>
      </div>
    </header>
  )
}
