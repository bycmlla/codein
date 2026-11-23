import { useEffect, useRef } from 'react'
import { Link, useDocumentMeta } from '../router.jsx'
import { siteProjects, siteProjectPath } from '../data/siteProjects.js'
import ProjectGallery from '../components/ProjectGallery.jsx'
import './ServicePage.css'
import './SiteProjectPage.css'

const BACK_TO_PROJECTS = '/servicos/sites#projetos-sites'

export default function SiteProjectPage({ project }) {
  const titleRef = useRef(null)

  useDocumentMeta(
    `${project.name} — Desenvolvimento de Sites | CodeIn Tecnologia`,
    project.description ?? `Conheça o site ${project.name}, desenvolvido pela CodeIn Tecnologia.`,
  )

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true })
  }, [project.id])

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

        {/* a key reinicia a galeria (imagem atual, zoom) ao trocar de projeto */}
        <ProjectGallery
          key={project.id}
          name={project.name}
          kind="do site"
          images={project.images}
          hasCover={Boolean(project.cover)}
        />

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
    </article>
  )
}
