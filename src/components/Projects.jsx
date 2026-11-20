import './Projects.css'

const projects = [
  {
    id: 'gmac',
    category: 'ERP Industrial',
    title: 'GMAC Metalúrgica',
    description: 'Da proposta à produção, acompanhe o andamento das peças de cada ordem de serviço.',
    href: '#',
    preview: (
      <div className="mock mock-left">
        <div className="mock-head">
          <strong>GMAC</strong>
          <span className="mock-sep">/</span>
          <strong>Produção</strong>
        </div>
        <ul className="mock-list">
          <li>
            <span>Ordem de serviço</span>
            <em>Etapa</em>
          </li>
          <li>
            <span>Peças sob encomenda</span>
            <em>Em produção</em>
          </li>
          <li>
            <span>Conjunto metálico</span>
            <em>Planejamento</em>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'jtd',
    category: 'Software para logística',
    title: 'JTD Transportes',
    description:
      'Do preço do diesel ao alerta de reajuste, reúna os dados que orientam a revisão do frete.',
    href: '#',
    preview: (
      <div className="mock mock-right">
        <div className="mock-head">
          <strong>JTD</strong>
          <span className="mock-sep">/</span>
          <strong>Histórico do diesel S10</strong>
        </div>
        <div className="mock-chart" aria-hidden="true">
          {[42, 55, 52, 66, 60, 78].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
  },
]

export default function Projects() {
  return (
    <section className="projects" id="projetos">
      <div className="container">
        <p className="eyebrow">Portfólio</p>
        <h2 className="section-title">Projetos em destaque</h2>

        <div className="projects-grid">
          {projects.map((p) => (
            <article className={`project-card project-${p.id}`} key={p.id}>
              <div className="project-preview">{p.preview}</div>
              <div className="project-body">
                <p className="project-category">{p.category}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-text">{p.description}</p>
                <a className="link" href={p.href}>
                  Conhecer o projeto
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
