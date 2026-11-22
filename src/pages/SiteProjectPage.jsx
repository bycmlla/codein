import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useDocumentMeta } from '../router.jsx'
import { siteProjects, siteProjectPath } from '../data/siteProjects.js'
import './ServicePage.css'
import './SiteProjectPage.css'

const BACK_TO_PROJECTS = '/servicos/sites#projetos-sites'

function imageLabel(project, index) {
  return index === 0 && project.cover
    ? `Capa do site ${project.name}`
    : `Captura ${index + 1} de ${project.images.length} do site ${project.name}`
}

/** Visualizador ampliado (tela cheia), com setas, Esc e foco preso no diálogo. */
function Lightbox({ project, index, onChange, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const total = project.images.length
  const img = project.images[index]

  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onChange((index + 1) % total)
      else if (e.key === 'ArrowLeft') onChange((index - 1 + total) % total)
      else if (e.key === 'Tab') {
        const items = dialogRef.current.querySelectorAll('button')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, total, onChange, onClose])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — imagem ampliada`}
      ref={dialogRef}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={closeRef} type="button" className="lb-close" onClick={onClose} aria-label="Fechar">
        ×
      </button>

      <figure className="lb-figure" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img src={img.full} alt={imageLabel(project, index)} />
        <figcaption className="lb-caption">
          {index + 1} / {total}
        </figcaption>
      </figure>

      {total > 1 && (
        <>
          <button
            type="button"
            className="lb-nav lb-prev"
            onClick={() => onChange((index - 1 + total) % total)}
            aria-label="Imagem anterior"
          >
            ←
          </button>
          <button
            type="button"
            className="lb-nav lb-next"
            onClick={() => onChange((index + 1) % total)}
            aria-label="Próxima imagem"
          >
            →
          </button>
        </>
      )}
    </div>
  )
}

export default function SiteProjectPage({ project }) {
  const [current, setCurrent] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const titleRef = useRef(null)
  const thumbsRef = useRef(null)
  const total = project.images.length
  const image = project.images[current]

  useDocumentMeta(
    `${project.name} — Desenvolvimento de Sites | CodeIn Tecnologia`,
    project.description ?? `Conheça o site ${project.name}, desenvolvido pela CodeIn Tecnologia.`,
  )

  useEffect(() => {
    setCurrent(0)
    setZoomed(false)
    titleRef.current?.focus({ preventScroll: true })
  }, [project.id])

  // mantém a miniatura ativa visível na faixa de miniaturas
  useEffect(() => {
    thumbsRef.current
      ?.querySelector('[aria-current="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }, [current])

  const go = useCallback((i) => setCurrent(i), [])
  const closeZoom = useCallback(() => setZoomed(false), [])

  const others = siteProjects.filter((p) => p.id !== project.id)

  return (
    <article className="service-page project-page">
      <div className="container">
        <nav aria-label="Você está em">
          <Link className="sp-back" to={BACK_TO_PROJECTS}>
            <span aria-hidden="true">←</span> Voltar para os projetos
          </Link>
        </nav>

        <header className="pp-header">
          <p className="eyebrow">Desenvolvimento de Sites · Projeto {project.number}</p>
          <h1 className="sp-title" ref={titleRef} tabIndex={-1}>
            {project.name}
          </h1>
          {project.description && <p className="sp-intro">{project.description}</p>}
        </header>

        {total === 0 ? (
          <p className="pp-empty">As imagens deste projeto ainda não foram adicionadas.</p>
        ) : (
          <section className="pp-viewer" aria-label={`Galeria do site ${project.name}`}>
            <div className="pp-stage">
              <button
                type="button"
                className="pp-stage-btn"
                onClick={() => setZoomed(true)}
                aria-label={`Ampliar: ${imageLabel(project, current)}`}
              >
                <img
                  key={image.full}
                  src={image.full}
                  alt={imageLabel(project, current)}
                  decoding="async"
                  fetchPriority={current === 0 ? 'high' : undefined}
                />
                <span className="pp-zoom-hint" aria-hidden="true">
                  Ampliar
                </span>
              </button>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    className="pp-nav pp-prev"
                    onClick={() => go((current - 1 + total) % total)}
                    aria-label="Imagem anterior"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="pp-nav pp-next"
                    onClick={() => go((current + 1) % total)}
                    aria-label="Próxima imagem"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            <div className="pp-meta">
              <span className="pp-counter" aria-live="polite">
                {current === 0 && project.cover ? 'Capa' : `Imagem ${current + 1}`} · {current + 1} de{' '}
                {total}
              </span>
            </div>

            {total > 1 && (
              <ol className="pp-thumbs" ref={thumbsRef}>
                {project.images.map((img, i) => (
                  <li key={img.full}>
                    <button
                      type="button"
                      className="pp-thumb"
                      aria-current={i === current ? 'true' : undefined}
                      aria-label={`Ver ${imageLabel(project, i).toLowerCase()}`}
                      onClick={() => go(i)}
                    >
                      <img src={img.thumb} alt="" loading="lazy" decoding="async" />
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </section>
        )}

        {others.length > 0 && (
          <nav className="sp-others" aria-labelledby="pp-others-title">
            <h2 className="sp-others-title" id="pp-others-title">
              Outros projetos
            </h2>
            <ul className="pp-others">
              {others.map((p) => (
                <li key={p.id}>
                  <Link className="pp-other" to={siteProjectPath(p.id)}>
                    {p.cover && <img src={p.cover.thumb} alt="" loading="lazy" decoding="async" />}
                    <span className="pp-other-name">{p.name}</span>
                    <span className="sp-other-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="pp-footer">
          <Link className="btn btn-outline" to={BACK_TO_PROJECTS}>
            ← Voltar para os projetos
          </Link>
          <Link className="btn btn-primary" to="/#orcamento">
            Conversar sobre meu projeto
          </Link>
        </div>
      </div>

      {zoomed && <Lightbox project={project} index={current} onChange={go} onClose={closeZoom} />}
    </article>
  )
}
