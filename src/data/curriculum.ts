import type { GameKind, World } from '../types'

const game = (title: string, icon: string, kind: GameKind, difficulty: 1 | 2 | 3 = 1) => ({
  id: title.toLowerCase().replaceAll(' ', '-'),
  title, icon, kind, difficulty,
})

export const worlds: World[] = [
  { id: 1, title: 'Pre-Mathematical Concepts', shortTitle: 'Sort & Match', icon: '🧩', color: '#9B6BDE', softColor: '#F0E9FF', skill: 'Matching & sorting', games: [game('Sorting Safari','🦁','compare'),game('Match the Pair','🧦','compare'),game('Find the Odd One','🔎','compare'),game('Color Grouping','🎨','compare')] },
  { id: 2, title: 'Shapes', shortTitle: 'Shape Land', icon: '🔺', color: '#F26B62', softColor: '#FFE9E6', skill: 'Recognise shapes', games: [game('Shape Hunt','🔍','shape'),game('Shape Match','🟦','shape'),game('Build a House','🏠','shape'),game('Shape Puzzle','🧩','shape')] },
  { id: 3, title: 'Numbers 1–5', shortTitle: 'Tiny Numbers', icon: '🍎', color: '#EF9F27', softColor: '#FFF3D8', skill: 'Count to 5', games: [game('Count the Fruits','🍎','count'),game('Feed the Monkey','🐵','count'),game('Number Hunt','🔢','number'),game('Count the Birds','🐦','count')] },
  { id: 4, title: 'Numbers 6–9', shortTitle: 'Number Garden', icon: '🌻', color: '#61B96F', softColor: '#E7F8E9', skill: 'Count to 9', games: [game('Number Garden','🌼','count'),game('Missing Numbers','❓','sequence'),game('Animal Counting','🐘','count')] },
  { id: 5, title: 'Before, After & More', shortTitle: 'Number Train', icon: '🚂', color: '#4BA7D8', softColor: '#E4F5FD', skill: 'Order & compare', games: [game('Number Train','🚂','sequence'),game('Missing Wagon','🚃','sequence'),game('Rabbit Jump','🐰','sequence'),game('More or Less','⚖️','compare')] },
  { id: 6, title: 'Zero', shortTitle: 'Zero Hero', icon: '0️⃣', color: '#6C83D9', softColor: '#E9EDFF', skill: 'Understand zero', games: [game('Empty Basket','🧺','zero'),game('Find Zero','🔎','zero'),game('No Apples','🍎','zero')] },
  { id: 7, title: 'Addition up to 9', shortTitle: 'Add Together', icon: '➕', color: '#EC6DA5', softColor: '#FFE7F2', skill: 'Visual addition', games: [game('Fruit Addition','🍓','add'),game('Balloon Addition','🎈','add'),game('Toy Shop Addition','🧸','add')] },
  { id: 8, title: 'Subtraction up to 9', shortTitle: 'Take Away', icon: '➖', color: '#9A73D4', softColor: '#F1EAFE', skill: 'Visual subtraction', games: [game('Birds Fly Away','🐦','subtract'),game('Balloon Pop','🎈','subtract'),game('Jungle Adventure','🌴','subtract')] },
  { id: 9, title: 'Numbers 10–20', shortTitle: 'Big Numbers', icon: '⭐', color: '#E89D37', softColor: '#FFF1D9', skill: 'Count beyond 10', games: [game('Treasure Numbers','💎','number',2),game('Count the Stars','⭐','count',2),game('Number Adventure','🗺️','number',2)] },
  { id: 10, title: 'Addition up to 20', shortTitle: 'Super Addition', icon: '🛒', color: '#58AF79', softColor: '#E3F7EA', skill: 'Addition fluency', games: [game('Toy Market','🧸','add',2),game('Fruit Basket Challenge','🧺','add',2),game('Number Line Jump','🐸','add',2)] },
  { id: 11, title: 'Digital Literacy', shortTitle: 'Digital World', icon: '💻', color: '#4689D6', softColor: '#E5F0FF', skill: 'Digital familiarity', games: [game('Tap and Learn','👆','digital'),game('Device Explorer','💻','digital'),game('Digital Detective','🕵️','digital')] },
  { id: 12, title: 'Subtraction up to 20', shortTitle: 'Super Take Away', icon: '🎈', color: '#E66E73', softColor: '#FFE7E8', skill: 'Subtraction fluency', games: [game('Remove the Fruits','🍊','subtract',2),game('Balloon Pop Advanced','🎈','subtract',2),game('Number Line Jump Back','🐸','subtract',2)] },
  { id: 13, title: 'Introduction of Tens', shortTitle: 'Tens Bundles', icon: '🪵', color: '#C5804E', softColor: '#F8EBDD', skill: 'Place value', games: [game('Bundle the Sticks','🪵','tens'),game('Group by Tens','🔟','tens'),game('Tens Treasure','💰','tens')] },
  { id: 14, title: 'Numbers 20–100', shortTitle: 'Hundred Trail', icon: '🏔️', color: '#47A4A2', softColor: '#E2F5F4', skill: 'Recognise to 100', games: [game('Hundred Trail','🛤️','number',3),game('Missing Number Adventure','❓','sequence',3),game('Number Mountain','🏔️','number',3)] },
  { id: 15, title: 'Before, Between & After', shortTitle: 'Number Neighbours', icon: '🌉', color: '#7B75D2', softColor: '#ECEBFF', skill: 'Number relationships', games: [game('Missing Number Bridge','🌉','sequence',3),game('Number Train Advanced','🚂','sequence',3),game('Find the Neighbor','🏡','sequence',3)] },
  { id: 16, title: 'Money', shortTitle: 'Little Shop', icon: '🪙', color: '#E0A32F', softColor: '#FFF2D3', skill: 'Money awareness', games: [game('Fruit Shop','🍌','money'),game('Coin Match','🪙','money'),game('Buy the Toy','🪀','money')] },
  { id: 17, title: 'Time', shortTitle: 'Time Town', icon: '🕘', color: '#4E9FCB', softColor: '#E4F5FD', skill: 'Time awareness', games: [game('Time Town','🕘','time'),game('Day and Night','🌙','time'),game('Daily Routine Match','🪥','time')] },
  { id: 18, title: 'Length, Weight & Size', shortTitle: 'Measure Me', icon: '📏', color: '#70AD58', softColor: '#EAF7E4', skill: 'Measure & compare', games: [game('Tall Tower','🗼','measure'),game('Long Snake','🐍','measure'),game('Heavy Basket','🧺','measure'),game('Big vs Small','🐘','measure')] },
]

export const badges = [
  { id: 'first-step', name: 'First Step', icon: '🌟', rule: 'Play your first game' },
  { id: 'star-five', name: 'Star Collector', icon: '⭐', rule: 'Collect 5 stars' },
  { id: 'perfect', name: 'Math Marvel', icon: '🏆', rule: 'Get every answer right' },
  { id: 'explorer', name: 'World Explorer', icon: '🗺️', rule: 'Try 5 different games' },
]
