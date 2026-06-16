export type GameKind = 'count' | 'number' | 'compare' | 'add' | 'subtract' | 'shape' | 'zero' | 'sequence' | 'money' | 'time' | 'measure' | 'digital' | 'tens'

export interface Game {
  id: string
  title: string
  icon: string
  kind: GameKind
  difficulty: 1 | 2 | 3
}

export interface World {
  id: number
  title: string
  shortTitle: string
  icon: string
  color: string
  softColor: string
  skill: string
  games: Game[]
}

export interface Question {
  prompt: string
  display: string
  options: (number | string)[]
  answer: number | string
  hint: string
}

export interface GameResult {
  gameId: string
  worldId: number
  skill: string
  correct: number
  attempts: number
  stars: number
  seconds: number
  playedAt: string
}

export interface PlayerProgress {
  name: string
  totalStars: number
  streak: number
  lastPlayed: string
  results: GameResult[]
  earnedBadges: string[]
}
