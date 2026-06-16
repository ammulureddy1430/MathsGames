# Pehchaan Math Play

A tablet-first, JSON-driven Class 1 mathematics game platform aligned to the Telangana SCERT unit sequence.

## Included

- 18 curriculum worlds and 59 named mini-games
- Reusable question/game engine covering counting, numbers, shapes, sequences, addition, subtraction, money, time, measurement, digital literacy, and place value
- Child-friendly rewards, gentle hints, confetti, stars, badges, daily challenge, and progress paths
- LocalStorage persistence through Zustand
- Teacher dashboard with accuracy, time, mastery, recent activity, and recommended practice
- Responsive touch-first UI with accessible labels and large targets

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. Use the chart button in the top-right to open the teacher dashboard.

## Production build

```bash
npm run build
npm run preview
```

## Content architecture

Curriculum and game definitions live in `src/data/curriculum.ts`. Add a world or game there without creating a new screen. The generic engine in `src/data/questions.ts` produces appropriate rounds based on each game's `kind` and `difficulty`.

`src/content/sample-count-fruits.json` demonstrates the authoring format for hand-written curriculum rounds. For production curriculum authoring, load those JSON rounds into the same `Question` interface. The rest of the application will continue to work unchanged.

## Accessibility

The interface uses large touch targets, high-contrast controls, simple language, visible focus behavior from native controls, and icon labels. The sound button is prepared for future recorded instructions; no child typing is required.
