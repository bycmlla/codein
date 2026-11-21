import { Link } from '../router.jsx'
import { services, servicePath } from '../data/services.js'
import ServiceIcon from './ServiceIcon.jsx'
import './Services.css'

export default function Services() {
  return (
    <section className="services" id="servicos" aria-labelledby="services-title">
      <div className="container">
        <header className="services-header">
          <p className="eyebrow">O que oferecemos</p>
          <h2 className="services-title" id="services-title">
            Soluções em tecnologia para o <span className="highlight">seu negócio.</span>
          </h2>
          <p className="services-lead">
            Desenvolvimento, suporte e presença digital em um só lugar. Criamos soluções que se
            adaptam à sua realidade e ajudam seu negócio a evoluir.
          </p>
        </header>

        <ul className="services-grid">
          {services.map((s) => (
            <li key={s.slug}>
              <Link className="service-card" to={servicePath(s.slug)}>
                <div className="service-card-top">
                  <span className="service-icon">
                    <ServiceIcon name={s.icon} />
                  </span>
                  <span className="service-number" aria-hidden="true">
                    {s.number}
                  </span>
                </div>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-text">{s.summary}</p>
                <span className="service-more">
                  Ver detalhes <span className="service-arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
