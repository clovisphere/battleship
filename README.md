[![Tests](https://github.com/clovisphere/blip/actions/workflows/test.yml/badge.svg)](https://github.com/clovisphere/blip/actions)
[![Bun](https://img.shields.io/badge/Bun-1.2-black?logo=bun)](https://bun.sh)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES2020-yellow?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

```
              ╔═════╗
              ║     ║
         ─────╢  ⊕  ╟─────
              ║     ║
              ╚═════╝

   ╔═══╤═══╤═══╤═══╤═══╤═══╤═══╗
   ║ · │ · │ · │ · │ · │ · │ · ║
   ╠═══╪═══╪═══╪═══╪═══╪═══╪═══╣
   ║ · │ · │ ▓ │ ▓ │ ▓ │ · │ · ║
   ╠═══╪═══╪═══╪═══╪═══╪═══╪═══╣
   ║ · │ · │ · │ · │ · │ · │ · ║
   ╠═══╪═══╪═══╪═══╪═══╪═══╪═══╣
   ║ · │ · │ · │ · │ · │ · │ · ║
   ╚═══╧═══╧═══╧═══╧═══╧═══╧═══╝
               — Blip —
```

Hunt the hidden fleet — fire on a 4×7 grid before your attempts or time run out.

## How to play

1. Open `index.html` in a browser (or serve it locally — see below).
2. Pick a difficulty: **N00b**, **Ninja**, or **Hacker**.
3. Click a grid cell to fire. Hits and misses show distinct icons per mode.
4. Sink all three ship sections to win. Hit **Play again** to reset.

## Difficulty modes

| Mode      | Attempts | Timer | Ship placement      | Rule                                                        |
| --------- | -------- | ----- | ------------------- | ----------------------------------------------------------- |
| 🐣 N00b   | 6        | 15 s  | Consecutive (H/V)   | Ends early if remaining attempts can't cover remaining hits |
| 🥷 Ninja  | 4        | 10 s  | Consecutive (H/V)   | Ends early if remaining attempts can't cover remaining hits |
| 👾 Hacker | 3        | 5 s   | Random (scattered)  | Any miss ends the game immediately                          |

- All modes have a countdown: **N00b** 15 s, **Ninja** 10 s, **Hacker** 5 s.
- Each hit adds **+5 seconds** to the clock.
- Letting the timer reach zero is an instant loss.

## Cell icons

| Event         | N00b | Ninja | Hacker |
| ------------- | ---- | ----- | ------ |
| Hit           | 🚢   | 💥    | ☠      |
| Miss          | 🌊   | 💨    | ✗      |
| Reveal (loss) | ⚓   | ⚓    | ?      |

## Running locally

```bash
bun run dev
```

Then open `http://localhost:3000`.

Or with [Python](https://www.python.org/) if you don't have [Bun](https://bun.com/):

```bash
python -m http.server 3000
```

> **Note:** The game uses ES modules (`type="module"`), so opening `index.html` directly via `file://` will fail in most browsers due to CORS restrictions. A local server is required.

## Project structure

```
blip/
├── index.html
├── package.json
├── server.js             # Bun static file server
├── tests/
│   └── game.test.js      # unit tests (bun:test)
└── public/
    ├── css/style.css
    └── js/
        ├── game.js       # pure game logic (ship placement, abort check)
        ├── main.js       # UI and game loop
        ├── matrix.js     # Matrix rain canvas (Hacker mode)
        └── sound.js      # Web Audio sound effects
```

## TODO

- [x] Add unit tests (game logic — ship placement, hit/miss, abort conditions)
- [x] Mobile touch improvements
- [x] High score persistence across difficulty resets
- [ ] Rebalance difficulty attempts and timers for the 4×7 grid
- [ ] Add end-to-end tests (Playwright)

## Tech

- Vanilla JS (ES modules, no build step)
- Web Audio API for procedural sound effects (hit, miss, win, lose, sonar, tick)
- CSS animations — per-cell fire burn on loss, confetti on win, vignette in Ninja mode, Matrix rain in Hacker mode
- Per-mode theming via CSS custom properties (amber / dark teal / terminal green)
