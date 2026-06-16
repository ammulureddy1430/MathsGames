import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameResult, PlayerProgress } from '../types'

interface ProgressState extends PlayerProgress {
  addResult: (result: GameResult) => void
  resetProgress: () => void
}

const initial: PlayerProgress = { name: 'Math Star', totalStars: 12, streak: 3, lastPlayed: '', results: [], earnedBadges: ['first-step','star-five'] }

export const useProgress = create<ProgressState>()(persist((set) => ({
  ...initial,
  addResult: (result) => set((state) => {
    const results = [...state.results, result]
    const earned = new Set(state.earnedBadges)
    earned.add('first-step')
    if (state.totalStars + result.stars >= 5) earned.add('star-five')
    if (result.correct === result.attempts) earned.add('perfect')
    if (new Set(results.map(r => r.gameId)).size >= 5) earned.add('explorer')
    return { results, totalStars: state.totalStars + result.stars, lastPlayed: result.playedAt, earnedBadges: [...earned] }
  }),
  resetProgress: () => set(initial),
}), { name: 'pehchaan-math-progress' }))
