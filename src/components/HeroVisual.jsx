import './HeroVisual.css'

export default function HeroVisual() {
  return (
    <div className="visual" aria-hidden="true">
      <div className="visual-glow" />
      <div className="visual-dots" />

      <div className="scene">
        <div className="plane">
          <div className="ring ring-3" />
          <div className="ring ring-2" />
          <div className="ring ring-1" />

          <div className="layer" style={{ '--z': '0px' }} />
          <div className="layer" style={{ '--z': '7px' }} />
          <div className="layer" style={{ '--z': '14px' }} />
          <div className="layer" style={{ '--z': '21px' }} />

          <div className="key">
            <svg className="key-glyph" viewBox="0 0 120 80" fill="none">
              <path
                d="M14 16l26 22-26 22"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
              <path d="M58 62h50" stroke="currentColor" strokeWidth="12" strokeLinecap="square" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
