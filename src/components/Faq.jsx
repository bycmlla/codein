import { useId, useState } from 'react'

/*
 * Acordeão de perguntas frequentes: fechado por padrão, uma pergunta aberta por vez.
 * Estilos em src/pages/SitesPage.css (classes .faq-*).
 */
export default function Faq({ items }) {
  const [open, setOpen] = useState(null)
  const baseId = useId()

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-q${i}`
        const panelId = `${baseId}-a${i}`
        return (
          <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.q}>
            <h3 className="faq-q">
              <button
                id={btnId}
                type="button"
                className="faq-btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              className="faq-panel"
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
            >
              <div className="faq-panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
