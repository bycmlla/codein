import { useEffect, useId, useRef, useState } from 'react'
import { Link, useDocumentMeta } from '../router.jsx'
import { siteProjects, siteProjectPath } from '../data/siteProjects.js'
import ServiceIcon from '../components/ServiceIcon.jsx'
import './ServicePage.css'
import './SitesPage.css'

const CONTACT = '/#orcamento'

const types = [
  {
    title: 'Sites institucionais',
    text: 'Para empresas e profissionais que querem apresentar sua história, serviços, diferenciais e formas de contato em um só lugar.',
  },
  {
    title: 'Landing pages',
    text: 'Páginas objetivas, desenvolvidas para divulgar um produto, serviço, campanha ou oferta específica e incentivar uma ação do visitante.',
  },
  {
    title: 'Lojas virtuais (e-commerce)',
    text: 'Criamos lojas online para apresentar e vender produtos, com catálogo, carrinho de compras, integração com meios de pagamento e recursos adequados à operação do negócio.',
  },
  {
    title: 'Portais e páginas personalizadas',
    text: 'Desenvolvemos experiências web com estrutura, conteúdo e funcionalidades adaptados ao que cada projeto precisa.',
  },
]

const steps = [
  {
    title: 'Entendemos sua ideia',
    text: 'Conversamos para conhecer seu negócio, entender seu público e identificar o que você precisa.',
  },
  {
    title: 'Planejamos seu site',
    text: 'Organizamos as páginas, o conteúdo e a estrutura visual de acordo com os objetivos do projeto.',
  },
  {
    title: 'Desenvolvemos e ajustamos',
    text: 'Criamos o site, apresentamos o andamento e realizamos os ajustes previstos no projeto.',
  },
  {
    title: 'Publicamos e acompanhamos',
    text: 'Colocamos seu site no ar e oferecemos orientação, suporte e manutenção conforme o que foi contratado.',
  },
]

const faq = [
  {
    q: 'Quanto tempo leva para desenvolver um site?',
    a: 'O prazo depende do tipo de site e das funcionalidades necessárias. Depois de entendermos seu projeto, definimos as etapas e apresentamos uma previsão de entrega.',
  },
  {
    q: 'Vocês também criam lojas virtuais?',
    a: 'Sim. Desenvolvemos lojas online com catálogo de produtos, carrinho de compras e integração com meios de pagamento, conforme as necessidades do negócio.',
  },
  {
    q: 'O site funciona em celulares e computadores?',
    a: 'Sim. Desenvolvemos interfaces responsivas, adaptadas para diferentes tamanhos de tela.',
  },
  {
    q: 'Vocês ajudam com domínio e hospedagem?',
    a: 'Podemos auxiliar na configuração do domínio, hospedagem e publicação do site, conforme o que for combinado no projeto.',
  },
  {
    q: 'Vou conseguir atualizar meu site depois?',
    a: 'Isso depende da estrutura escolhida. Podemos desenvolver uma solução com recursos para que você atualize determinados conteúdos sem precisar modificar o código.',
  },
  {
    q: 'Meu site vai aparecer no Google?',
    a: 'Aplicamos boas práticas de SEO técnico para facilitar a indexação do site pelos mecanismos de busca. O posicionamento nos resultados depende também de conteúdo, concorrência e outros fatores.',
  },
]

const pad = (n) => String(n).padStart(2, '0')

function Faq() {
  const [open, setOpen] = useState(null)
  const baseId = useId()

  return (
    <div className="faq">
      {faq.map((item, i) => {
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

export default function SitesPage({ service }) {
  const titleRef = useRef(null)
  useDocumentMeta(service.seoTitle, service.seoDescription)

  useEffect(() => {
    // foco no título ao abrir a página, exceto quando há âncora (ex.: voltar aos projetos)
    if (!window.location.hash) titleRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <article className="service-page sites-page">
      <div className="container">
        <nav aria-label="Você está em">
          <Link className="sp-back" to="/#servicos">
            <span aria-hidden="true">←</span> Voltar para serviços
          </Link>
        </nav>

        {/* 1. Apresentação */}
        <header className="sp-header">
          <div className="sp-header-icon">
            <ServiceIcon name={service.icon} />
          </div>
          <p className="eyebrow">Serviços · {service.number}</p>
          <h1 className="sp-title" ref={titleRef} tabIndex={-1}>
            Desenvolvimento de Sites.
          </h1>
          <p className="sp-intro">
            Criamos sites institucionais, landing pages, lojas virtuais e portais personalizados,
            combinando design moderno, boa navegação e desempenho para apresentar sua empresa e seus
            produtos da melhor forma.
          </p>
          <Link className="btn btn-outline sites-intro-cta" to={CONTACT}>
            Solicitar orçamento
          </Link>
        </header>

        {/* 2. Sobre o serviço */}
        <section className="sites-split" aria-labelledby="sites-deliver">
          <h2 className="sites-h2" id="sites-deliver">
            O que entregamos.
          </h2>
          <div className="sites-prose">
            <p>
              Na CodeIn, cada site é desenvolvido pensando na identidade e nas necessidades de quem
              está por trás do negócio. Nosso trabalho é criar um espaço na internet que represente
              bem sua empresa, apresente seus produtos ou serviços e facilite o contato com seus
              clientes.
            </p>
            <p>
              Cuidamos desde a organização das informações e do visual até a adaptação para celulares
              e computadores, desempenho, segurança e boas práticas de SEO.
            </p>
            <p>
              Também podemos auxiliar com domínio, hospedagem, publicação e manutenção, conforme as
              necessidades de cada projeto.
            </p>
          </div>
        </section>

        <section className="sites-split" aria-labelledby="sites-problem">
          <h2 className="sites-h2" id="sites-problem">
            O problema que resolvemos.
          </h2>
          <div className="sites-prose">
            <p>
              Muitas empresas oferecem bons produtos e serviços, mas ainda não conseguem apresentar
              isso de forma profissional na internet.
            </p>
            <p>
              Às vezes, as informações estão espalhadas pelas redes sociais, o cliente não encontra o
              que procura ou o site existente já não representa a empresa como deveria.
            </p>
            <p>
              Nós ajudamos a mudar isso criando sites organizados, fáceis de navegar e preparados para
              apresentar seu negócio com clareza, transmitir confiança e facilitar novas oportunidades
              de contato e venda.
            </p>
          </div>
        </section>

        {/* 3. O que podemos desenvolver */}
        <section className="sites-section" aria-labelledby="sites-types">
          <h2 className="sites-h2" id="sites-types">
            O que podemos desenvolver.
          </h2>
          <ol className="sites-types">
            {types.map((t, i) => (
              <li key={t.title} className="sites-type">
                <span className="sites-num" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h3 className="sites-h3">{t.title}</h3>
                <p className="sites-text">{t.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. Portfólio */}
        <section className="sites-portfolio" id="projetos-sites" aria-labelledby="sites-portfolio-title">
          <p className="eyebrow">Portfólio</p>
          <h2 className="sites-portfolio-title" id="sites-portfolio-title">
            Alguns que já fizemos.
          </h2>
          <p className="sites-portfolio-lead">
            Cada projeto tem sua própria identidade. Aqui estão alguns dos sites que já
            desenvolvemos.
          </p>

          <ul className="site-grid">
            {siteProjects.map((p) => (
              <li key={p.id}>
                <Link className="site-card" to={siteProjectPath(p.id)}>
                  <div className="site-card-media">
                    {p.cover && (
                      <img
                        src={p.cover.thumb}
                        alt={`Capa do site ${p.name}`}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <div className="site-card-body">
                    <span className="site-card-num" aria-hidden="true">
                      {p.number}
                    </span>
                    <h3 className="site-card-title">{p.name}</h3>
                    {p.description && <p className="site-card-text">{p.description}</p>}
                    <span className="site-card-more">
                      Ver projeto{' '}
                      <span className="site-card-arrow" aria-hidden="true">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Como trabalhamos */}
        <section className="sites-section" aria-labelledby="sites-steps">
          <h2 className="sites-h2" id="sites-steps">
            Como trabalhamos.
          </h2>
          <ol className="sites-steps">
            {steps.map((s, i) => (
              <li key={s.title} className="sites-step">
                <span className="sites-num" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h3 className="sites-h3">{s.title}</h3>
                <p className="sites-text">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 6. FAQ */}
        <section className="sites-split sites-faq" aria-labelledby="sites-faq-title">
          <h2 className="sites-h2" id="sites-faq-title">
            Tire suas dúvidas.
          </h2>
          <Faq />
        </section>

        {/* 7. Chamada final */}
        <section className="sites-final" aria-labelledby="sites-final-title">
          <h2 className="sites-final-title" id="sites-final-title">
            Vamos criar o site da sua empresa?
          </h2>
          <p className="sites-final-text">
            Conte um pouco sobre o que você precisa. Vamos conversar sobre a melhor forma de colocar
            sua ideia em prática.
          </p>
          <Link className="btn btn-primary" to={CONTACT}>
            Conversar sobre meu projeto
          </Link>
        </section>
      </div>
    </article>
  )
}
