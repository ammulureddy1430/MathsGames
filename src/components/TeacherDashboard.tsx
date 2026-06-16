import { ArrowLeft, BarChart3, Clock, RotateCcw, Star, Target, TrendingUp } from 'lucide-react'
import { worlds } from '../data/curriculum'
import { useProgress } from '../store/useProgress'

export function TeacherDashboard({ back }: { back: () => void }) {
  const progress = useProgress()
  const attempts = progress.results.reduce((n,r) => n+r.attempts,0)
  const correct = progress.results.reduce((n,r) => n+r.correct,0)
  const accuracy = attempts ? Math.round(correct/attempts*100) : 0
  const minutes = Math.max(0, Math.round(progress.results.reduce((n,r) => n+r.seconds,0)/60))
  const skillRows = worlds.map(w => {
    const rows = progress.results.filter(r => r.worldId === w.id)
    const total = rows.reduce((n,r) => n+r.attempts,0)
    const score = total ? Math.round(rows.reduce((n,r) => n+r.correct,0)/total*100) : 0
    return { ...w, plays: rows.length, score }
  }).filter(w => w.plays > 0)
  return <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-8">
    <button onClick={back} className="mb-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 font-black shadow-sm"><ArrowLeft size={19}/> Back to play</button>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="font-black uppercase tracking-widest text-[#5579A0]">Teacher dashboard</p><h1 className="mt-1 text-3xl font-black md:text-5xl">Learning overview</h1><p className="mt-2 font-bold text-[#81776d]">A clear look at Math Star’s progress.</p></div>
      <button onClick={progress.resetProgress} className="flex items-center gap-2 rounded-2xl bg-[#fff0ed] px-4 py-3 font-black text-[#B65649]"><RotateCcw size={18}/> Reset demo data</button>
    </div>
    <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Metric icon={<BarChart3/>} value={progress.results.length} label="Games played" color="#6E62C7"/>
      <Metric icon={<Target/>} value={`${accuracy}%`} label="Accuracy" color="#4BAE73"/>
      <Metric icon={<Clock/>} value={`${minutes}m`} label="Time played" color="#E38B39"/>
      <Metric icon={<Star/>} value={progress.totalStars} label="Stars earned" color="#D9A51D"/>
    </section>
    <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-[28px] bg-white p-5 shadow-soft md:p-7">
        <h2 className="text-xl font-black">Skill mastery</h2>
        <p className="mt-1 text-sm font-bold text-[#8c837a]">Accuracy across practiced curriculum areas</p>
        <div className="mt-6 space-y-5">
          {skillRows.length ? skillRows.map(row => <div key={row.id}><div className="mb-2 flex justify-between text-sm font-black"><span>{row.icon} {row.skill}</span><span>{row.score}%</span></div><div className="h-3 overflow-hidden rounded-full bg-[#eeeae3]"><div className="h-full rounded-full" style={{ width: `${row.score}%`, background: row.color }}/></div></div>) : <Empty/>}
        </div>
      </div>
      <div className="rounded-[28px] bg-[#5B4DB1] p-6 text-white shadow-soft">
        <TrendingUp size={28}/>
        <h2 className="mt-4 text-2xl font-black">Recommended next</h2>
        <p className="mt-2 font-bold text-white/75">{accuracy < 70 ? 'Build confidence with visual counting and shape games.' : 'Ready for a fresh challenge in the next number world.'}</p>
        <div className="mt-6 rounded-[22px] bg-white/12 p-4"><span className="text-3xl">{accuracy < 70 ? '🍎' : '🚂'}</span><b className="mt-2 block">{accuracy < 70 ? 'Count the Fruits' : 'Number Train'}</b><span className="text-sm font-bold text-white/70">{accuracy < 70 ? 'Numbers 1–5' : 'Before & After'}</span></div>
      </div>
    </section>
    <section className="mt-8 rounded-[28px] bg-white p-5 shadow-soft md:p-7">
      <h2 className="text-xl font-black">Recent activity</h2>
      <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[620px] text-left"><thead className="text-xs uppercase tracking-wider text-[#958b81]"><tr><th className="py-3">Activity</th><th>Skill</th><th>Score</th><th>Stars</th><th>Time</th></tr></thead><tbody>{progress.results.slice(-8).reverse().map((r,i) => <tr key={i} className="border-t border-[#eeeae3] font-bold"><td className="py-4">{r.gameId.replaceAll('-',' ')}</td><td>{r.skill}</td><td>{r.correct}/{r.attempts}</td><td>⭐ {r.stars}</td><td>{r.seconds}s</td></tr>)}</tbody></table>{!progress.results.length && <Empty/>}</div>
    </section>
  </main>
}

function Metric({ icon, value, label, color }: { icon: React.ReactNode; value: string|number; label: string; color: string }) { return <div className="rounded-[26px] bg-white p-5 shadow-soft"><span className="grid h-11 w-11 place-items-center rounded-2xl text-white" style={{ background: color }}>{icon}</span><b className="mt-4 block text-3xl">{value}</b><span className="text-sm font-bold text-[#8c837a]">{label}</span></div> }
function Empty() { return <div className="py-8 text-center font-bold text-[#978d83]">Play a game to see learning data here.</div> }
