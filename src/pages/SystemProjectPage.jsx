import { useEffect, useRef } from 'react'
import { Link, useDocumentMeta } from '../router.jsx'
import { systemProjects, systemProjectPath, SYSTEMS_CONTACT } from '../data/systemProjects.js'
import ProjectGallery from '../components/ProjectGallery.jsx'
import './ServicePage.css'
import './SitesPage.css'
import './SiteProjectPage.css'
import './SystemsPage.css'

const BACK_TO_PROJECTS = '/servicos/sistemas#projetos-sistemas'

export default function SystemProjectPage({ project }) {
  const titleRef = useRef(null)

  useDocumentMeta(`${project.shortName} — Sistemas Sob Medida | CodeIn Tecnologia`, project.summary)

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true })
  }, [project.id])

  const others = systemProjects.filter((p) => p.id !== project.id)

  return (
    <article className="service-page project-page system-project-page">
      <div className="container">
        <nav aria-label="Você está em">
          <Link className="sp-back" to={BACK_TO_PROJECTS}>
            <span aria-hidden="true">←</span> Voltar para os projetos
          </Link>
        </nav>

        {/* 1. Nome e categoria */}
        <header className="pp-header">
          <p className="eyebrow">Sistemas Sob Medida · Projeto {project.number}</p>
          <h1 className="sp-title" ref={titleRef} tabIndex={-1}>
            {project.name}
          </h1>
          <p className="sysp-category">{project.category}</p>
        </header>

        {/* 2 e 3. Apresentação e funcionalidades */}
        <div className="sysp-overview">
          <section aria-labelledby="sysp-about">
            <h2 className="sysp-label" id="sysp-about">
              Sobre o sistema
            </h2>
            <div className="sites-prose">
              {project.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="sysp-features">
            <h2 className="sysp-label" id="sysp-features">
              Principais funcionalidades
            </h2>
            <ul className="sysp-features">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* 4. Galeria */}
        <section className="sysp-gallery" aria-labelledby="sysp-gallery-title">
          <div className="sysp-gallery-head">
            <h2 className="sysp-label" id="sysp-gallery-title">
              Telas do sistema
            </h2>
            <p className="sysp-gallery-note">Clique na imagem para ampliar.</p>
          </div>
          {/* a key reinicia a galeria (imagem atual, zoom) ao trocar de projeto */}
          <ProjectGallery
            key={project.id}
            name={project.shortName}
            kind="do sistema"
            images={project.images}
            hasCover={Boolean(project.cover)}
          />
        </section>

        {/* 6. Chamada para um sistema semelhante */}
        <section className="sp-cta sysp-cta" aria-labelledby="sysp-cta-title">
          <div>
            <h2 className="sp-cta-title" id="sysp-cta-title">
              Precisa de um sistema parecido?
            </h2>
            <p className="sp-cta-text">
              Conte como funciona a rotina da sua empresa e vamos entender o que pode ser
              desenvolvido para você.
            </p>
          </div>
          <Link className="btn btn-primary" to={SYSTEMS_CONTACT}>
            Solicitar um sistema semelhante
          </Link>
        </section>

        {others.length > 0 && (
          <nav className="sp-others" aria-labelledby="sysp-others-title">
            <h2 className="sp-others-title" id="sysp-others-title">
              Outros sistemas
            </h2>
            <ul className="pp-others">
              {others.map((p) => (
                <li key={p.id}>
                  <Link className="pp-other" to={systemProjectPath(p.id)}>
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

        {/* 5. Voltar aos projetos */}
        <div className="pp-footer">
          <Link className="btn btn-outline" to={BACK_TO_PROJECTS}>
            ← Voltar para os projetos
          </Link>
        </div>
      </div>
    </article>
  )
}
