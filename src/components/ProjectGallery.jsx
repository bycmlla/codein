import { useCallback, useEffect, useRef, useState } from 'react'
import './ProjectGallery.css'

/*
 * Galeria de projeto do portfólio: imagem principal, miniaturas e visualização ampliada.
 * Estilos base em src/pages/SiteProjectPage.css (classes .pp-* e .lb-*).
 *
 * Props:
 *   name     — nome do projeto
 *   kind     — complemento usado nas descrições acessíveis ("do site", "do sistema")
 *   images   — [{ full, thumb, name }], na ordem de exibição
 *   hasCover — a primeira imagem é a capa
 */

/** Capturas bem mais altas que largas (páginas inteiras) são ampliadas com rolagem. */
const TALL_RATIO = 1.25

function useImageLabel(name, kind, images, hasCover) {
  return useCallback(
    (index) =>
      index === 0 && hasCover
        ? `Capa ${kind} ${name}`
        : `Captura ${index + 1} de ${images.length} ${kind} ${name}`,
    [name, kind, images.length, hasCover],
  )
}

/** Visualizador ampliado (tela cheia), com setas, Esc e foco preso no diálogo. */
function Lightbox({ name, images, index, label, onChange, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [tallSrc, setTallSrc] = useState(null)
  const total = images.length
  const img = images[index]
  const isTall = tallSrc === img.full

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

  function onImageLoad(e) {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget
    if (w && h / w > TALL_RATIO) setTallSrc(img.full)
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} — imagem ampliada`}
      ref={dialogRef}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={closeRef} type="button" className="lb-close" onClick={onClose} aria-label="Fechar">
        ×
      </button>

      <figure
        className={`lb-figure${isTall ? ' is-tall' : ''}`}
        // em imagens com rolagem, o clique na barra de rolagem não deve fechar
        onClick={(e) => !isTall && e.target === e.currentTarget && onClose()}
        tabIndex={isTall ? 0 : undefined}
        aria-label={isTall ? 'Imagem ampliada — role para ver a página inteira' : undefined}
      >
        <img key={img.full} src={img.full} alt={label(index)} onLoad={onImageLoad} />
        <figcaption className="lb-caption">
          {index + 1} / {total}
          {isTall && <span className="lb-scroll-hint"> · role para ver a página inteira</span>}
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

export default function ProjectGallery({ name, kind, images, hasCover }) {
  const [current, setCurrent] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const thumbsRef = useRef(null)
  const total = images.length
  const image = images[current]
  const label = useImageLabel(name, kind, images, hasCover)

  // mantém a miniatura ativa visível na faixa de miniaturas
  useEffect(() => {
    thumbsRef.current
      ?.querySelector('[aria-current="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }, [current])

  const go = useCallback((i) => setCurrent(i), [])
  const closeZoom = useCallback(() => setZoomed(false), [])

  if (total === 0) {
    return <p className="pp-empty">As imagens deste projeto ainda não foram adicionadas.</p>
  }

  return (
    <section className="pp-viewer" aria-label={`Galeria ${kind} ${name}`}>
      <div className="pp-stage">
        <button
          type="button"
          className="pp-stage-btn"
          onClick={() => setZoomed(true)}
          aria-label={`Ampliar: ${label(current)}`}
        >
          <img
            key={image.full}
            src={image.full}
            alt={label(current)}
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
          {current === 0 && hasCover ? 'Capa' : `Imagem ${current + 1}`} · {current + 1} de {total}
        </span>
      </div>

      {total > 1 && (
        <ol className="pp-thumbs" ref={thumbsRef}>
          {images.map((img, i) => (
            <li key={img.full}>
              <button
                type="button"
                className="pp-thumb"
                aria-current={i === current ? 'true' : undefined}
                aria-label={`Ver ${label(i).toLowerCase()}`}
                onClick={() => go(i)}
              >
                <img src={img.thumb} alt="" loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ol>
      )}

      {zoomed && (
        <Lightbox
          name={name}
          images={images}
          index={current}
          label={label}
          onChange={go}
          onClose={closeZoom}
        />
      )}
    </section>
  )
}
