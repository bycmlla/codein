import { useEffect, useRef } from 'react'
import { Link, useDocumentMeta } from '../router.jsx'
import { services, servicePath } from '../data/services.js'
import ServiceIcon from '../components/ServiceIcon.jsx'
import './ServicePage.css'

export default function ServicePage({ service }) {
  const titleRef = useRef(null)
  useDocumentMeta(service.seoTitle, service.seoDescription)

  // Leva o foco ao título ao trocar de página (leitores de tela anunciam a nova página)
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true })
  }, [service.slug])

  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <article className="service-page">
      <div className="container">
        <nav className="sp-breadcrumb" aria-label="Você está em">
          <Link className="sp-back" to="/#servicos">
            <span aria-hidden="true">←</span> Voltar para serviços
          </Link>
        </nav>

        <header className="sp-header">
          <div className="sp-header-icon">
            <ServiceIcon name={service.icon} />
          </div>
          <p className="eyebrow">Serviços · {service.number}</p>
          <h1 className="sp-title" ref={titleRef} tabIndex={-1}>
            {service.title}
          </h1>
          <p className="sp-intro">{service.summary}</p>
        </header>

        <section className="sp-list-wrap" aria-labelledby="sp-list-title">
          <h2 className="sp-list-title" id="sp-list-title">
            O que fazemos
          </h2>
          <ol className="sp-list">
            {service.items.map((item, i) => (
              <li className="sp-item" key={item.title}>
                <span className="sp-item-number" aria-hidden="true">
                  {service.items.length > 1 ? String(i + 1).padStart(2, '0') : '—'}
                </span>
                <div>
                  <h3 className="sp-item-title">{item.title}</h3>
                  <p className="sp-item-text">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="sp-cta" aria-labelledby="sp-cta-title">
          <div>
            <h2 className="sp-cta-title" id="sp-cta-title">
              Precisa de algum desses serviços?
            </h2>
            <p className="sp-cta-text">Conte o que você precisa e vamos conversar sobre o seu projeto.</p>
          </div>
          <Link className="btn btn-primary" to="/#orcamento">
            Solicitar orçamento
          </Link>
        </section>

        <nav className="sp-others" aria-labelledby="sp-others-title">
          <h2 className="sp-others-title" id="sp-others-title">
            Outros serviços
          </h2>
          <ul className="sp-others-list">
            {others.map((s) => (
              <li key={s.slug}>
                <Link className="sp-other" to={servicePath(s.slug)}>
                  <span className="sp-other-icon">
                    <ServiceIcon name={s.icon} />
                  </span>
                  <span className="sp-other-name">{s.title}</span>
                  <span className="sp-other-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  )
}
