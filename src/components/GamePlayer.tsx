import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowLeft, Check, Lightbulb, Star, Volume2 } from 'lucide-react'
import type { Game, World } from '../types'
import { makeQuestions } from '../data/questions'
import { useProgress } from '../store/useProgress'

interface Props { game: Game; world: World; exit: () => void; finish: () => void }

export function GamePlayer({ game, world, exit, finish }: Props) {
  const questions = useMemo(() => makeQuestions(game), [game])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState<'correct'|'wrong'|null>(null)
  const [done, setDone] = useState(false)
  const started = useRef(Date.now())
  const addResult = useProgress(s => s.addResult)
  const q = questions[index]

  const choose = (answer: string | number) => {
    if (feedback) return
    setAttempts(v => v + 1)
    if (answer === q.answer) {
      setCorrect(v => v + 1); setFeedback('correct')
      confetti({ particleCount: 65, spread: 70, origin: { y: .7 }, colors: [world.color,'#FFD34E','#ffffff'] })
      window.setTimeout(() => {
        setFeedback(null)
        if (index === questions.length - 1) {
          const finalCorrect = correct + 1
          addResult({ gameId: game.id, worldId: world.id, skill: world.skill, correct: finalCorrect, attempts: attempts + 1, stars: finalCorrect >= 5 ? 3 : finalCorrect >= 3 ? 2 : 1, seconds: Math.round((Date.now()-started.current)/1000), playedAt: new Date().toISOString() })
          setDone(true)
        } else setIndex(v => v + 1)
      }, 900)
    } else { setFeedback('wrong'); window.setTimeout(() => setFeedback(null), 1100) }
  }

  if (done) return <Completion game={game} correct={correct} color={world.color} finish={finish}/>
  return <main className="mx-auto flex min-h-[calc(100vh-90px)] max-w-4xl flex-col px-4 pb-8 pt-5 md:px-8">
    <div className="flex items-center gap-3">
      <button onClick={exit} className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm" aria-label="Exit game"><ArrowLeft/></button>
      <div className="h-4 flex-1 overflow-hidden rounded-full bg-white shadow-inner"><motion.div animate={{ width: `${((index+1)/questions.length)*100}%` }} className="h-full rounded-full" style={{ background: world.color }}/></div>
      <span className="rounded-xl bg-white px-3 py-2 font-black">{index+1}/{questions.length}</span>
    </div>
    <section className="relative mt-6 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[36px] border-2 border-white bg-white p-5 text-center shadow-soft md:p-10">
      <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-[#eef5ff] text-[#417bb4]" aria-label="Read instruction aloud"><Volume2 size={20}/></button>
      <motion.div key={index} initial={{ scale: .85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <span className="inline-block rounded-full px-4 py-2 text-sm font-black uppercase tracking-wider" style={{ background: world.softColor, color: world.color }}>{game.title}</span>
        <h1 className="mt-4 text-2xl font-black md:text-4xl">{q.prompt}</h1>
        <div className="mx-auto mt-7 max-w-2xl whitespace-pre-wrap rounded-[28px] bg-[#fff9eb] p-6 text-4xl font-black leading-relaxed md:p-9 md:text-6xl">{q.display}</div>
      </motion.div>
      <div className="mt-7 grid w-full max-w-2xl grid-cols-2 gap-3 md:gap-4">
        {q.options.map((option, i) => <motion.button key={`${option}-${i}`} whileTap={{ scale: .94 }} onClick={() => choose(option)}
          className="min-h-20 rounded-[24px] border-2 border-[#eee9df] bg-white px-4 text-2xl font-black shadow-[0_5px_0_#e9e3d8] hover:border-[#d6caff] md:min-h-24 md:text-3xl">{option}</motion.button>)}
      </div>
      <AnimatePresence>
        {feedback && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`absolute bottom-5 flex items-center gap-2 rounded-2xl px-5 py-3 font-black text-white shadow-lg ${feedback === 'correct' ? 'bg-[#53B875]' : 'bg-[#F39A4A]'}`}>
          {feedback === 'correct' ? <><Check/> Brilliant! You got it!</> : <><Lightbulb/> {q.hint}</>}
        </motion.div>}
      </AnimatePresence>
    </section>
  </main>
}

function Completion({ game, correct, color, finish }: { game: Game; correct: number; color: string; finish: () => void }) {
  const stars = correct >= 5 ? 3 : correct >= 3 ? 2 : 1
  return <main className="mx-auto flex min-h-[calc(100vh-90px)] max-w-2xl items-center px-4 py-8 text-center">
    <motion.section initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full rounded-[38px] border-2 border-white bg-white p-8 shadow-soft md:p-12">
      <motion.div animate={{ rotate: [-5,5,-5], y: [0,-8,0] }} transition={{ duration: 2, repeat: Infinity }} className="text-8xl">🥳</motion.div>
      <h1 className="mt-5 text-4xl font-black">Wonderful work!</h1>
      <p className="mt-2 font-bold text-[#81776d]">You completed {game.title}</p>
      <div className="my-7 flex justify-center gap-2">{[1,2,3].map(n => <motion.span key={n} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .2*n }}><Star size={56} fill={n <= stars ? '#FFBE25' : '#E8E3DB'} color={n <= stars ? '#E9A800' : '#E8E3DB'}/></motion.span>)}</div>
      <p className="text-xl font-black" style={{ color }}>{correct} of 5 answers correct</p>
      <button onClick={finish} className="card-pop mt-7 min-h-14 w-full rounded-2xl px-6 font-black text-white" style={{ background: color }}>Choose another game</button>
    </motion.section>
  </main>
}
