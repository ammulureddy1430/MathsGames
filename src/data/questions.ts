import type { Game, Question } from '../types'

const shuffled = <T,>(items: T[]) => [...items].sort(() => Math.random() - .5)
const options = (answer: number, max = 20) => shuffled([...new Set([answer, Math.max(0, answer - 1), Math.min(max, answer + 1), Math.min(max, answer + 2)])]).slice(0, 4)
const repeat = (icon: string, n: number) => Array(n).fill(icon).join(' ')

const pairRounds = [
  ['🧦', '🧦 🧦', ['🧦 🧦', '🧦 🧤', '🧢 🧢', '👟 🧢']],
  ['👟', '👟 👟', ['👟 👟', '👟 🧦', '🧤 🧤', '🎒 🧢']],
  ['🧤', '🧤 🧤', ['🧤 🧤', '🧤 🧦', '👟 👟', '🧢 🎒']],
  ['🧢', '🧢 🧢', ['🧢 🧢', '🧢 👟', '🎒 🎒', '🧦 🧤']],
  ['🎒', '🎒 🎒', ['🎒 🎒', '🎒 🧢', '🧦 🧦', '👟 🧤']],
] as const

const oddRounds = [
  { display: '🍎  🍎  🍌  🍎', answer: '🍌', options: ['🍎', '🍌', '🍊', '🍇'] },
  { display: '🔺  🔺  🟦  🔺', answer: '🟦', options: ['🔺', '🟦', '🟡', '🟩'] },
  { display: '🐟  🐟  🐥  🐟', answer: '🐥', options: ['🐟', '🐥', '🐘', '🦋'] },
  { display: '⭐  ⭐  🌙  ⭐', answer: '🌙', options: ['⭐', '🌙', '☀️', '☁️'] },
  { display: '🚗  🚗  🚲  🚗', answer: '🚲', options: ['🚗', '🚲', '🚌', '🚂'] },
] as const

const colorRounds = [
  { color: 'red', answer: '🍎 ❤️ 🌹', options: ['🍎 ❤️ 🌹', '🍌 ⭐ 🌽', '🫐 💙 🦋', '🥬 🟢 🍏'] },
  { color: 'yellow', answer: '🍌 ⭐ 🌽', options: ['🍌 ⭐ 🌽', '🍎 ❤️ 🌹', '🫐 💙 🦋', '🥬 🟢 🍏'] },
  { color: 'blue', answer: '🫐 💙 🦋', options: ['🫐 💙 🦋', '🍌 ⭐ 🌽', '🍎 ❤️ 🌹', '🥬 🟢 🍏'] },
  { color: 'green', answer: '🥬 🟢 🍏', options: ['🥬 🟢 🍏', '🫐 💙 🦋', '🍎 ❤️ 🌹', '🍌 ⭐ 🌽'] },
  { color: 'orange', answer: '🍊 🟠 🥕', options: ['🍊 🟠 🥕', '🥬 🟢 🍏', '🫐 💙 🦋', '🍎 ❤️ 🌹'] },
] as const

function makeCompareQuestion(game: Game, i: number, b: number): Question {
  if (game.id === 'sorting-safari') {
    const rounds = [
      { display: '🦁 🦁     🐘', answer: 2, options: [1,2,3,4] },
      { display: '🐒 🐒 🐒     🦒 🦒', answer: 3, options: [2,3,4,5] },
      { display: '🐢 🐢     🐇 🐇 🐇 🐇', answer: 4, options: [1,2,3,4] },
      { display: '🦜 🦜 🦜 🦜 🦜     🐍 🐍', answer: 5, options: [2,3,4,5] },
      { display: '🐘 🐘 🐘     🦁 🦁 🦁 🦁', answer: 4, options: [2,3,4,5] },
    ] as const
    const round = rounds[i % rounds.length]
    return { prompt: 'Which safari group has more?', display: round.display, options: shuffled([...round.options]), answer: round.answer, hint: 'Count both animal groups and choose the bigger number.' }
  }

  if (game.id === 'match-the-pair') {
    const [single, answer, choices] = pairRounds[i % pairRounds.length]
    return { prompt: 'Which two make a pair?', display: single, options: shuffled([...choices]), answer, hint: 'A pair has two same things.' }
  }

  if (game.id === 'find-the-odd-one') {
    const round = oddRounds[i % oddRounds.length]
    return { prompt: 'Find the odd one out', display: round.display, options: shuffled([...round.options]), answer: round.answer, hint: 'Look for the picture that is different.' }
  }

  if (game.id === 'color-grouping') {
    const round = colorRounds[i % colorRounds.length]
    return { prompt: `Choose the ${round.color} group`, display: `Match things with ${round.color} color`, options: shuffled([...round.options]), answer: round.answer, hint: `Pick the group where every item is ${round.color}.` }
  }

  if (game.id === 'more-or-less') {
    const left = i + 2, right = i + 4
    return { prompt: 'Which number is more?', display: `${left} things     ${right} things`, options: [left, right], answer: right, hint: 'More means the bigger number.' }
  }

  const left = b + i + 1, right = b + i + 3
  return { prompt: 'Which group has more?', display: `${repeat('⭐',left)}     ${repeat('⭐',right)}`, options: [left,right], answer: right, hint: 'Count both groups.' }
}

function makeCountQuestion(game: Game, i: number, a: number, max: number): Question {
  if (game.id === 'feed-the-monkey') {
    return { prompt: 'How many bananas for the monkey?', display: `🐵 wants\n${repeat('🍌', Math.min(a, 20))}`, options: options(a, max), answer: a, hint: 'Count each banana before feeding.' }
  }

  if (game.id === 'count-the-birds') {
    return { prompt: 'How many birds are on the wire?', display: `━━━━\n${repeat('🐦', Math.min(a, 20))}`, options: options(a, max), answer: a, hint: 'Point to each bird one by one.' }
  }

  if (game.id === 'number-garden') {
    return { prompt: 'How many flowers bloomed?', display: repeat('🌼', Math.min(a, 20)), options: options(a, max), answer: a, hint: 'Count every flower in the garden.' }
  }

  if (game.id === 'animal-counting') {
    return { prompt: 'How many animals are walking?', display: repeat(['🐘','🦒','🐢','🐇','🦆'][i % 5], Math.min(a, 20)), options: options(a, max), answer: a, hint: 'Count the animals slowly.' }
  }

  if (game.id === 'count-the-stars') {
    return { prompt: 'How many stars are shining?', display: repeat('⭐', Math.min(a, 20)), options: options(a, max), answer: a, hint: 'Count each star in the sky.' }
  }

  return { prompt: 'How many fruits can you count?', display: repeat(game.icon, Math.min(a, 20)), options: options(a, max), answer: a, hint: 'Touch each one as you count.' }
}

function makeNumberQuestion(game: Game, i: number, a: number): Question {
  if (game.id === 'treasure-numbers') {
    return { prompt: 'Pick the number on the treasure chest', display: `💎 Chest number ${a}`, options: shuffled([a, a + 1, a - 1, a + 2]), answer: a, hint: 'Match the number written on the chest.' }
  }

  if (game.id === 'number-adventure') {
    return { prompt: 'Follow the map to this number', display: `🗺️ Go to ${a}`, options: shuffled([a, a + 1, Math.max(0, a - 1), a + 3]), answer: a, hint: 'Find the exact number on the map.' }
  }

  if (game.id === 'hundred-trail') {
    return { prompt: 'Step on this trail number', display: `🛤️ ${a}`, options: shuffled([a, a + 10, a - 10, a + 1]), answer: a, hint: 'Look at both digits carefully.' }
  }

  if (game.id === 'number-mountain') {
    return { prompt: 'Climb to this mountain number', display: `🏔️ ${a}`, options: shuffled([a, a + 5, a - 5, a + 1]), answer: a, hint: 'Choose the same number shown on the mountain.' }
  }

  return { prompt: 'Find this number', display: String(a), options: shuffled([a, a + 1, Math.max(0, a - 1), a + 2]), answer: a, hint: 'Look carefully at the big number.' }
}

function makeAddQuestion(game: Game, a: number, b: number, max: number): Question {
  const ans = Math.min(max, a + b)

  if (game.id === 'balloon-addition') {
    return { prompt: 'How many balloons altogether?', display: `${repeat('🎈', Math.min(a, 10))}  +  ${repeat('🎈', Math.min(b, 10))}`, options: options(ans, max), answer: ans, hint: 'Count the first bunch and the second bunch.' }
  }

  if (game.id === 'toy-shop-addition') {
    return { prompt: 'How many toys in the shop?', display: `${repeat('🧸', Math.min(a, 10))}  +  ${repeat('🪀', Math.min(b, 10))}`, options: options(ans, max), answer: ans, hint: 'Add both toy groups.' }
  }

  if (game.id === 'toy-market') {
    return { prompt: 'How many toys on both stalls?', display: `Stall 1: ${repeat('🚗', Math.min(a, 10))}\nStall 2: ${repeat('🧩', Math.min(b, 10))}`, options: options(ans, max), answer: ans, hint: 'Add the toys from both stalls.' }
  }

  if (game.id === 'fruit-basket-challenge') {
    return { prompt: 'How many fruits in both baskets?', display: `🧺 ${repeat('🍎', Math.min(a, 10))}\n🧺 ${repeat('🍌', Math.min(b, 10))}`, options: options(ans, max), answer: ans, hint: 'Count fruits in both baskets together.' }
  }

  if (game.id === 'number-line-jump') {
    return { prompt: 'Where does the frog land?', display: `🐸 ${a} + ${b} jumps`, options: options(ans, max), answer: ans, hint: 'Start at the first number and jump forward.' }
  }

  return { prompt: 'How many fruits altogether?', display: `${repeat('🍓', Math.min(a,10))}  +  ${repeat('🍓', Math.min(b,10))}`, options: options(ans, max), answer: ans, hint: 'Count both groups together.' }
}

function makeSubtractQuestion(game: Game, a: number, b: number, max: number): Question {
  const ans = Math.max(0, a - b)

  if (game.id === 'balloon-pop') {
    return { prompt: 'How many balloons are left?', display: `${a} 🎈  pop ${b}`, options: options(ans, max), answer: ans, hint: 'Take away the popped balloons.' }
  }

  if (game.id === 'balloon-pop-advanced') {
    return { prompt: 'How many balloons stay in the sky?', display: `Sky had ${a} balloons\n${b} floated away`, options: options(ans, max), answer: ans, hint: 'Subtract the balloons that floated away.' }
  }

  if (game.id === 'jungle-adventure') {
    return { prompt: 'How many fruits remain in the jungle?', display: `${a} 🍌  minus ${b}`, options: options(ans, max), answer: ans, hint: 'Start with all fruits and remove some.' }
  }

  if (game.id === 'remove-the-fruits') {
    return { prompt: 'How many fruits stay in the basket?', display: `🧺 ${a} fruits\nremove ${b}`, options: options(ans, max), answer: ans, hint: 'Count back after removing fruits.' }
  }

  if (game.id === 'number-line-jump-back') {
    return { prompt: 'Where does the frog land?', display: `🐸 ${a} - ${b} jumps`, options: options(ans, max), answer: ans, hint: 'Start at the first number and jump backward.' }
  }

  return { prompt: 'How many birds are left?', display: `${a} 🐦  fly away ${b}`, options: options(ans, max), answer: ans, hint: 'Take away the birds that flew away.' }
}

function makeSequenceQuestion(game: Game, a: number, max: number): Question {
  if (game.id === 'missing-wagon') {
    const ans = a + 1
    return { prompt: 'Which wagon is missing?', display: `🚃 ${a}  🚃 ?  🚃 ${a + 2}`, options: options(ans, max), answer: ans, hint: 'The wagons count forward by one.' }
  }

  if (game.id === 'rabbit-jump') {
    const ans = a + 1
    return { prompt: 'Where will the rabbit jump next?', display: `🐰 ${a}  →  ?`, options: options(ans, max), answer: ans, hint: 'Jump one number forward.' }
  }

  if (game.id === 'missing-numbers') {
    const ans = a + 1
    return { prompt: 'Fill the missing number', display: `${a}, ?, ${a + 2}`, options: options(ans, max), answer: ans, hint: 'Say the numbers in order.' }
  }

  if (game.id === 'missing-number-adventure') {
    const ans = a + 10
    return { prompt: 'Find the next stop on the adventure', display: `${a}  →  ?  →  ${a + 20}`, options: shuffled([ans, ans - 1, ans + 1, ans + 10]), answer: ans, hint: 'These stops go up by ten.' }
  }

  if (game.id === 'missing-number-bridge') {
    const ans = a + 1
    return { prompt: 'Put the missing plank on the bridge', display: `${a}  🌉  ?  🌉  ${a + 2}`, options: options(ans, max), answer: ans, hint: 'The bridge numbers go in order.' }
  }

  if (game.id === 'number-train-advanced') {
    const ans = a + 10
    return { prompt: 'What comes next on the train?', display: `${a}  →  ?`, options: shuffled([ans, ans + 1, ans - 1, ans + 10]), answer: ans, hint: 'This train counts by tens.' }
  }

  if (game.id === 'find-the-neighbor') {
    const ans = a + 1
    return { prompt: 'Find the number between', display: `${a}  _  ${a + 2}`, options: options(ans, max), answer: ans, hint: 'The neighbor sits between the two numbers.' }
  }

  const ans = a + 1
  return { prompt: 'What comes next?', display: `${a}  →  ?  →  ${a + 2}`, options: options(ans, max), answer: ans, hint: 'Count one step forward.' }
}

function makeZeroQuestion(game: Game, i: number): Question {
  if (game.id === 'find-zero') {
    const rounds = [
      ['0 is the empty number', ['0', '1', '2', '3']],
      ['Find zero on the card', ['4', '0', '5', '6']],
      ['Which number means none?', ['7', '8', '0', '9']],
      ['Tap the round zero', ['10', '0', '1', '2']],
      ['Zero comes before one', ['3', '2', '1', '0']],
    ] as const
    const [display, choices] = rounds[i % rounds.length]
    return { prompt: 'Tap the zero', display, options: shuffled([...choices]), answer: '0', hint: 'Zero looks like a round ring.' }
  }

  if (game.id === 'no-apples') {
    const rounds = [
      ['Find no apples', '🍽️', ['🍽️', '🍎', '🍎🍎', '🍎🍎🍎']],
      ['Which bowl has no apples?', '🥣', ['🍎🥣', '🥣', '🍎🍎🥣', '🍎🍎🍎🥣']],
      ['Which tray is empty?', '▭', ['🍎▭', '▭', '🍎🍎▭', '🍎🍎🍎▭']],
      ['Which lunch box has zero apples?', '🍱', ['🍱', '🍱🍎', '🍱🍎🍎', '🍱🍎🍎🍎']],
      ['Which basket has no apples?', '🧺', ['🧺🍎', '🧺🍎🍎', '🧺', '🧺🍎🍎🍎']],
    ] as const
    const [display, answer, choices] = rounds[i % rounds.length]
    return { prompt: 'Which place has no apples?', display, options: shuffled([...choices]), answer, hint: 'No apples means it is empty.' }
  }

  return { prompt: 'Which basket has zero?', display: ['🧺', '🧺 🍎', '🧺 🍌🍌', '🧺 🍊🍊🍊', '🧺 🍇🍇🍇🍇'][i % 5], options: ['🧺', '🍎🍎', '🍌', '🍊🍊🍊'], answer: '🧺', hint: 'Zero means nothing is there.' }
}

function makeShapeQuestion(game: Game, i: number): Question {
  const shapes = [['●','Circle'],['▲','Triangle'],['■','Square'],['▭','Rectangle'],['⬭','Oval']] as const
  const s = shapes[i % shapes.length]

  if (game.id === 'shape-match') {
    return { prompt: `Match the ${s[1]}`, display: `${s[0]}  =  ?`, options: shuffled(shapes.map(x => x[0])), answer: s[0], hint: 'Choose the same shape.' }
  }

  if (game.id === 'build-a-house') {
    const houseParts = [['▲','roof'],['■','wall'],['▭','door'],['●','window'],['■','floor tile']] as const
    const part = houseParts[i % houseParts.length]
    return { prompt: `Choose the ${part[1]} shape`, display: '🏠', options: shuffled(shapes.map(x => x[0])), answer: part[0], hint: 'Think about the shape used in a house.' }
  }

  if (game.id === 'shape-puzzle') {
    return { prompt: 'Find the missing puzzle shape', display: `${s[0]}  🧩  ?`, options: shuffled(shapes.map(x => x[0])), answer: s[0], hint: 'The missing piece has the same shape.' }
  }

  return { prompt: `Find the ${s[1]}`, display: s[0], options: shuffled(shapes.map(x => x[0])), answer: s[0], hint: 'Match the shape you see.' }
}

function makeTensQuestion(game: Game, i: number): Question {
  const ans = i + 1

  if (game.id === 'group-by-tens') {
    return { prompt: 'How many groups of ten?', display: repeat('🔟', ans), options: options(ans, 10), answer: ans, hint: 'Each group is one ten.' }
  }

  if (game.id === 'tens-treasure') {
    return { prompt: 'How many ten-coins are in the treasure?', display: repeat('💰', ans), options: options(ans, 10), answer: ans, hint: 'Each treasure bag is one group of ten.' }
  }

  return { prompt: 'How many stick bundles?', display: repeat('🪵', ans), options: options(ans, 10), answer: ans, hint: 'Each bundle is one ten.' }
}

function makeMoneyQuestion(game: Game, i: number): Question {
  const moneyRounds = [
    { value: 1, label: 'one rupee' },
    { value: 2, label: 'two rupees' },
    { value: 5, label: 'five rupees' },
    { value: 10, label: 'ten rupees' },
    { value: 20, label: 'twenty rupees' },
  ] as const
  const round = moneyRounds[i % moneyRounds.length]
  const ans = round.value
  const moneyOptions = shuffled(moneyRounds.map(item => item.value))

  if (game.id === 'coin-match') {
    return { prompt: 'Match the coin value', display: `🪙 ₹${ans}`, options: moneyOptions, answer: ans, hint: 'Choose the number printed on the coin.' }
  }

  if (game.id === 'buy-the-toy') {
    return { prompt: 'Which coin buys the toy?', display: `🪀 price ₹${ans}`, options: moneyOptions, answer: ans, hint: 'Match the toy price.' }
  }

  return { prompt: 'Pay for the fruit', display: `🍌 costs ${round.label}`, options: moneyOptions, answer: ans, hint: 'Choose the coin with the same value.' }
}

function makeTimeQuestion(game: Game, i: number): Question {
  const times = ['Morning','Afternoon','Evening','Night']

  if (game.id === 'day-and-night') {
    const rounds = [
      ['☀️ Sun is up', 'Day'],
      ['🌙 Moon is up', 'Night'],
      ['🏫 Going to school', 'Day'],
      ['🛏️ Sleeping', 'Night'],
      ['🌅 Birds wake up', 'Day'],
    ] as const
    const [display, ans] = rounds[i % rounds.length]
    return { prompt: 'Is this day or night?', display, options: ['Day','Night'], answer: ans, hint: 'Look for the sun or moon.' }
  }

  if (game.id === 'daily-routine-match') {
    const rounds = [
      ['🪥 Brush teeth', 'Morning'],
      ['🍱 Eat lunch', 'Afternoon'],
      ['🎮 Play after school', 'Evening'],
      ['🛏️ Sleep', 'Night'],
      ['🎒 Pack school bag', 'Morning'],
    ] as const
    const [display, ans] = rounds[i % rounds.length]
    return { prompt: 'Match the routine time', display, options: times, answer: ans, hint: 'Think about when you do this in a day.' }
  }

  const rounds = [
    ['🌅 Wake up', 'Morning'],
    ['☀️ Eat lunch', 'Afternoon'],
    ['🌇 Play outside', 'Evening'],
    ['🌙 Go to sleep', 'Night'],
    ['🚌 Go to school', 'Morning'],
  ] as const
  const [display, ans] = rounds[i % rounds.length]
  return { prompt: 'When does this happen?', display, options: times, answer: ans, hint: 'Think about your day.' }
}

function makeMeasureQuestion(game: Game, i: number): Question {
  if (game.id === 'long-snake') {
    const rounds = ['🐍🐍🐍     🐍', '━━━━━━     ━━', '🚂🚃🚃     🚂', '🧵🧵🧵🧵     🧵', '✏️✏️     ✏️'] as const
    return { prompt: 'Which one is longer?', display: rounds[i % rounds.length], options: ['First','Second'], answer: 'First', hint: 'Longer means it stretches farther.' }
  }

  if (game.id === 'heavy-basket') {
    const rounds = ['🧺🍎🍎🍎     🧺🍎', '🎒📚📚     🎒', '🪣🪨🪨     🪣🍂', '📦📦📦     📦', '🥥🥥🥥     🍃'] as const
    return { prompt: 'Which one is heavier?', display: rounds[i % rounds.length], options: ['First','Second'], answer: 'First', hint: 'More things usually make it heavier.' }
  }

  if (game.id === 'big-vs-small') {
    const rounds = ['🐘     🐭', '🏠     🪑', '🌳     🌱', '🚌     🚲', '🎈🎈🎈     🎈'] as const
    return { prompt: 'Which one is bigger?', display: rounds[i % rounds.length], options: ['First','Second'], answer: 'First', hint: 'Bigger takes up more space.' }
  }

  const ans = ['Taller','Taller','Taller','Taller','Taller'][i % 5]
  return { prompt: `Which one is ${ans.toLowerCase()}?`, display: ['🌴  🌱','🗼  🏠','🦒  🐕','🏢  🛖','📏📏📏  📏'][i % 5], options: ['First','Second'], answer: 'First', hint: 'Compare the heights.' }
}

function makeDigitalQuestion(game: Game, i: number): Question {
  if (game.id === 'device-explorer') {
    const pairs = [['Computer','💻'],['Phone','📱'],['Camera','📷'],['Mouse','🖱️'],['Keyboard','⌨️']][i % 5]
    return { prompt: `Find the ${pairs[0]}`, display: 'Choose the device', options: shuffled(['💻','📱','📷','🖱️','⌨️']), answer: pairs[1], hint: 'Match the device name to its picture.' }
  }

  if (game.id === 'digital-detective') {
    const pairs = [['takes photos','📷'],['moves the pointer','🖱️'],['shows videos','💻'],['makes calls','📱'],['types letters','⌨️']][i % 5]
    return { prompt: `Which device ${pairs[0]}?`, display: 'Be a digital detective', options: shuffled(['💻','📱','📷','🖱️','⌨️']), answer: pairs[1], hint: 'Think about what each device does.' }
  }

  const pairs = [['Tap','👆'],['Computer','💻'],['Camera','📷'],['Mouse','🖱️'],['Keyboard','⌨️']][i % 5]
  return { prompt: `Find the ${pairs[0]}`, display: pairs[1], options: shuffled(['👆','💻','📷','🖱️','⌨️']), answer: pairs[1], hint: 'Match the picture.' }
}

export function makeQuestions(game: Game): Question[] {
  const max = game.difficulty === 1 ? 9 : game.difficulty === 2 ? 20 : 100
  const start = game.difficulty === 1 ? 2 : game.difficulty === 2 ? 11 : 35
  const make = (i: number): Question => {
    const a = Math.min(max, start + i)
    const b = game.difficulty === 1 ? (i % 4) + 1 : (i % 6) + 2
    switch (game.kind) {
      case 'count': return makeCountQuestion(game, i, a, max)
      case 'number': return makeNumberQuestion(game, i, a)
      case 'add': return makeAddQuestion(game, a, b, max)
      case 'subtract': return makeSubtractQuestion(game, a, b, max)
      case 'sequence': return makeSequenceQuestion(game, a, max)
      case 'zero': return makeZeroQuestion(game, i)
      case 'shape': return makeShapeQuestion(game, i)
      case 'compare': return makeCompareQuestion(game, i, b)
      case 'tens': return makeTensQuestion(game, i)
      case 'money': return makeMoneyQuestion(game, i)
      case 'time': return makeTimeQuestion(game, i)
      case 'measure': return makeMeasureQuestion(game, i)
      case 'digital': return makeDigitalQuestion(game, i)
    }
  }
  return Array.from({ length: 5 }, (_, i) => make(i))
}
