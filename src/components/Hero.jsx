import HeroVisual from './HeroVisual.jsx'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow">CodeIn Tecnologia</p>

          <h1 className="hero-title">
            <span className="hero-title-line">Software feito</span>{' '}
            <span className="hero-title-line">
              para o <span className="highlight">seu negócio.</span>
            </span>
          </h1>

          <p className="hero-text">
            Criamos sistemas que acompanham sua operação, sites que apresentam sua marca e
            oferecemos suporte de TI para o dia a dia.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#orcamento">
              Conte seu projeto
            </a>
            <a className="link" href="#projetos">
              Explorar projetos
            </a>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
