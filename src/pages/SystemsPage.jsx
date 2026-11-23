import { useEffect, useRef } from 'react'
import { Link, useDocumentMeta } from '../router.jsx'
import { systemProjects, systemProjectPath, SYSTEMS_CONTACT } from '../data/systemProjects.js'
import ServiceIcon from '../components/ServiceIcon.jsx'
import Faq from '../components/Faq.jsx'
import './ServicePage.css'
import './SitesPage.css'
import './SystemsPage.css'

const types = [
  {
    title: 'Sistemas de gestão empresarial',
    text: 'Reúna informações de diferentes áreas da sua empresa em um só lugar, como financeiro, estoque, vendas, compras e produção.',
  },
  {
    title: 'Controle de ordens de serviço e produção',
    text: 'Acompanhe serviços em andamento, etapas de produção, prazos e informações importantes para sua operação.',
  },
  {
    title: 'Gestão comercial e de clientes',
    text: 'Organize cadastros, contatos, propostas, oportunidades de venda e o acompanhamento do relacionamento com seus clientes.',
  },
  {
    title: 'Painéis e relatórios gerenciais',
    text: 'Visualize informações da sua empresa por meio de indicadores, gráficos e relatórios que ajudam no acompanhamento dos resultados.',
  },
  {
    title: 'Ferramentas personalizadas',
    text: 'Nem toda necessidade exige um sistema grande. Também desenvolvemos ferramentas específicas para resolver problemas pontuais da sua rotina.',
  },
]

const steps = [
  {
    title: 'Entendemos sua necessidade',
    text: 'Conversamos para conhecer a rotina da sua empresa, identificar dificuldades e entender o que você espera do sistema.',
  },
  {
    title: 'Planejamos a solução',
    text: 'Definimos as funcionalidades, organizamos as etapas do projeto e avaliamos a melhor maneira de desenvolver a ferramenta.',
  },
  {
    title: 'Desenvolvemos e apresentamos',
    text: 'Durante o desenvolvimento, apresentamos a evolução do sistema para que você possa acompanhar e validar as funcionalidades.',
  },
  {
    title: 'Entregamos e acompanhamos',
    text: 'Após os testes e ajustes previstos, colocamos o sistema em funcionamento e oferecemos suporte e manutenção conforme o que foi contratado.',
  },
]

const improvements = [
  'Atualizar funcionalidades',
  'Reorganizar partes do código',
  'Melhorar a interface',
  'Integrar novos recursos',
]

const faq = [
  {
    q: 'O que é um sistema sob medida?',
    a: 'É um sistema desenvolvido especificamente para atender às necessidades de uma empresa. Em vez de adaptar sua rotina a um programa pronto, criamos funcionalidades de acordo com seus processos.',
  },
  {
    q: 'Quanto custa desenvolver um sistema?',
    a: 'O valor depende das funcionalidades, integrações e complexidade do projeto. Primeiro entendemos sua necessidade e, a partir disso, elaboramos uma proposta.',
  },
  {
    q: 'Quanto tempo leva para desenvolver um sistema?',
    a: 'O prazo varia conforme o tamanho e as funcionalidades do projeto. Após entendermos o que precisa ser desenvolvido, organizamos as etapas e apresentamos uma previsão de entrega.',
  },
  {
    q: 'Posso começar com poucas funcionalidades?',
    a: 'Sim. Dependendo do projeto, podemos começar pelas funcionalidades essenciais e acrescentar novos recursos ao longo do tempo.',
  },
  {
    q: 'Vocês conseguem melhorar um sistema que já utilizo?',
    a: 'Podemos avaliar sistemas existentes para verificar a possibilidade de melhorias, atualizações, refatoração de código e integração com outras ferramentas. Isso depende da tecnologia utilizada e do acesso necessário ao sistema.',
  },
  {
    q: 'O sistema terá mensalidade?',
    a: 'Isso depende da modalidade de contratação e dos serviços envolvidos. Custos de desenvolvimento, hospedagem, manutenção e serviços de terceiros são apresentados e definidos na proposta comercial.',
  },
  {
    q: 'O sistema será meu?',
    a: 'As condições de utilização, entrega do código-fonte e propriedade intelectual são definidas no contrato, de maneira transparente antes do início do projeto.',
  },
  {
    q: 'Vocês oferecem suporte após a entrega?',
    a: 'Sim. Podemos oferecer suporte, manutenção e desenvolvimento de novas funcionalidades conforme as necessidades do cliente e as condições contratadas.',
  },
]

const pad = (n) => String(n).padStart(2, '0')

export default function SystemsPage({ service }) {
  const titleRef = useRef(null)
  useDocumentMeta(service.seoTitle, service.seoDescription)

  useEffect(() => {
    // foco no título ao abrir a página, exceto quando há âncora (ex.: voltar aos projetos)
    if (!window.location.hash) titleRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <article className="service-page sites-page systems-page">
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
            Sistemas Sob Medida.
          </h1>
          <p className="sp-intro">
            Cada empresa tem sua própria rotina, e nem sempre um sistema pronto consegue atender a
            tudo. Na CodeIn, desenvolvemos sistemas personalizados para organizar informações,
            facilitar processos e ajudar você a ter mais controle sobre o seu negócio.
          </p>
          <Link className="btn btn-outline sites-intro-cta" to={SYSTEMS_CONTACT}>
            Solicitar orçamento
          </Link>
        </header>

        {/* 2. Sobre o serviço */}
        <section className="sites-split" aria-labelledby="sys-deliver">
          <h2 className="sites-h2" id="sys-deliver">
            O que entregamos.
          </h2>
          <div className="sites-prose">
            <p>
              Criamos sistemas de acordo com as necessidades de cada empresa. Pode ser uma ferramenta
              para controlar ordens de serviço, acompanhar a produção, organizar o financeiro,
              gerenciar vendas ou reunir informações que hoje estão espalhadas em várias planilhas.
            </p>
            <p>
              Antes de começar, buscamos entender como sua empresa funciona, quais são as
              dificuldades do dia a dia e o que realmente precisa ser desenvolvido.
            </p>
            <p>
              A ideia é criar uma solução que faça sentido para sua operação, sem acrescentar
              funcionalidades desnecessárias.
            </p>
          </div>
        </section>

        <section className="sites-split" aria-labelledby="sys-problem">
          <h2 className="sites-h2" id="sys-problem">
            O problema que resolvemos.
          </h2>
          <div className="sites-prose">
            <p>
              Muitas empresas acabam adaptando sua forma de trabalhar às limitações dos sistemas que
              utilizam.
            </p>
            <p>
              Outras ainda dependem de planilhas, anotações e processos manuais para acompanhar
              informações importantes.
            </p>
            <p>
              Isso pode gerar retrabalho, dificultar o acesso aos dados e tornar tarefas simples mais
              demoradas do que deveriam ser.
            </p>
            <p>
              Nosso trabalho é entender essas dificuldades e desenvolver ferramentas que ajudem a
              organizar a rotina, centralizar informações e facilitar o acompanhamento das
              atividades.
            </p>
          </div>
        </section>

        {/* 3. O que podemos desenvolver */}
        <section className="sites-section" aria-labelledby="sys-types">
          <h2 className="sites-h2" id="sys-types">
            O que podemos desenvolver.
          </h2>
          <ol className="sites-types sys-types">
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
        <section
          className="sites-portfolio"
          id="projetos-sistemas"
          aria-labelledby="sys-portfolio-title"
        >
          <p className="eyebrow">Portfólio</p>
          <h2 className="sites-portfolio-title" id="sys-portfolio-title">
            Alguns que já desenvolvemos.
          </h2>
          <p className="sites-portfolio-lead">
            Cada empresa tem suas próprias necessidades. Conheça alguns sistemas que desenvolvemos
            para diferentes áreas de atuação.
          </p>

          <ul className="site-grid sys-grid">
            {systemProjects.map((p) => (
              <li key={p.id}>
                <Link className="site-card sys-card" to={systemProjectPath(p.id)}>
                  <div className="site-card-media">
                    {p.cover && (
                      <img
                        src={p.cover.thumb}
                        alt={`Tela do sistema ${p.shortName}`}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <div className="site-card-body">
                    <p className="sys-card-category">
                      <span aria-hidden="true">{p.number} · </span>
                      {p.category}
                    </p>
                    <h3 className="site-card-title">{p.name}</h3>
                    <p className="site-card-text">{p.summary}</p>
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
        <section className="sites-section" aria-labelledby="sys-steps">
          <h2 className="sites-h2" id="sys-steps">
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

        {/* 6. Desenvolvimento por etapas */}
        <section className="sites-split" aria-labelledby="sys-grow">
          <h2 className="sites-h2" id="sys-grow">
            Um sistema que pode crescer com você.
          </h2>
          <div className="sites-prose">
            <p>Nem sempre é necessário desenvolver todas as funcionalidades de uma só vez.</p>
            <p>
              Dependendo do projeto, podemos começar pelo que é mais importante para sua operação e
              acrescentar novas ferramentas conforme surgirem outras necessidades.
            </p>
            <p>
              Assim, o desenvolvimento acompanha as prioridades do negócio, sem precisar começar com
              um sistema maior do que você realmente precisa.
            </p>
          </div>
        </section>

        {/* 7. Modernização de sistemas existentes */}
        <section className="sites-split sys-modern" aria-labelledby="sys-modern-title">
          <div>
            <p className="sys-kicker">Serviço complementar</p>
            <h2 className="sites-h2" id="sys-modern-title">
              Seu sistema precisa de melhorias?
            </h2>
          </div>
          <div className="sites-prose">
            <p>Nem sempre é necessário começar tudo do zero.</p>
            <p>
              Se sua empresa já utiliza um sistema, mas enfrenta dificuldades com funcionalidades
              antigas, lentidão, problemas de manutenção ou falta de integração com outras
              ferramentas, podemos avaliar a estrutura existente e identificar oportunidades de
              melhoria.
            </p>
            <p>Dependendo das condições do projeto, podemos:</p>
            <ul className="sys-checklist">
              {improvements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Nosso objetivo é aproveitar o que ainda funciona e ajudar sua empresa a continuar
              utilizando suas ferramentas de forma mais eficiente.
            </p>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="sites-split sites-faq" aria-labelledby="sys-faq-title">
          <h2 className="sites-h2" id="sys-faq-title">
            Tire suas dúvidas.
          </h2>
          <Faq items={faq} />
        </section>

        {/* 9. Chamada final */}
        <section className="sites-final" aria-labelledby="sys-final-title">
          <h2 className="sites-final-title" id="sys-final-title">
            Vamos desenvolver o sistema que sua empresa precisa?
          </h2>
          <p className="sites-final-text">
            Conte um pouco sobre sua ideia ou sobre os desafios da sua operação. Vamos conversar e
            entender como podemos ajudar.
          </p>
          <Link className="btn btn-primary" to={SYSTEMS_CONTACT}>
            Conversar sobre meu projeto
          </Link>
        </section>
      </div>
    </article>
  )
}
