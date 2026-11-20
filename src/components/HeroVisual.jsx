import heroBoard from '../assets/hero-board.webp'
import './HeroVisual.css'

/*
 * Composição única: processador + placa-mãe contínua, com profundidade de campo.
 * O render original (CORE_W x RENDER_H) fica à direita; à esquerda, a placa
 * continua por mais EXT_W px, cada vez mais desfocada e escura, para se
 * dissolver atrás do texto sem corte.
 *
 * O brilho do símbolo e as trilhas usam as coordenadas do render original,
 * dentro de .cpu-core.
 */
const EXT_W = 820
const CORE_W = 957
const RENDER_W = EXT_W + CORE_W
const RENDER_H = 841

const traces = [
  { d: 'M957 285 L860 357 L740 430 L690 470', dur: 5.5, delay: 1.2 },
  { d: 'M0 470 L120 520 L210 545', dur: 4.5, delay: 2.6 },
  { d: 'M170 180 L268 210 L330 240', dur: 4, delay: 3.6 },
  { d: 'M720 470 L600 565 L470 690', dur: 5.5, delay: 4.8 },
]

function Board({ className, priority }) {
  return (
    <img
      className={`cpu-img ${className}`}
      src={heroBoard}
      width={RENDER_W}
      height={RENDER_H}
      alt=""
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}

export default function HeroVisual() {
  return (
    <div className="cpu-visual" aria-hidden="true">
      <div
        className="cpu-stage"
        style={{
          aspectRatio: `${RENDER_W} / ${RENDER_H}`,
          '--board-scale': RENDER_W / CORE_W,
        }}
      >
        <Board className="cpu-base" priority />
        <Board className="cpu-energize" />

        <div className="cpu-core" style={{ width: `${(CORE_W / RENDER_W) * 100}%` }}>
          <div className="cpu-glyph-glow" />

          <svg className="cpu-traces" viewBox={`0 0 ${CORE_W} ${RENDER_H}`}>
            <defs>
              <radialGradient id="cpu-spark">
                <stop offset="0" stopColor="#e6efff" />
                <stop offset="0.35" stopColor="#5b8cff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#2e6bff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {traces.map((t, i) => (
              <circle key={i} r="7" fill="url(#cpu-spark)" opacity="0">
                <animateMotion
                  path={t.d}
                  dur={`${t.dur}s`}
                  begin={`${t.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.85;0.85;0"
                  keyTimes="0;0.15;0.8;1"
                  dur={`${t.dur}s`}
                  begin={`${t.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
