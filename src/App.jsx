import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import ServicePage from './pages/ServicePage.jsx'
import NotFound from './pages/NotFound.jsx'
import { findService, serviceRedirects } from './data/services.js'
import { Redirect, useDocumentMeta, useLocation, useScrollOnNavigate } from './router.jsx'

const HOME_TITLE = 'CodeIn Tecnologia'
const HOME_DESCRIPTION = 'CodeIn Tecnologia — software, sites e suporte de TI para o seu negócio.'

function Home() {
  useDocumentMeta(HOME_TITLE, HOME_DESCRIPTION)
  return (
    <>
      <Hero />
      <Services />
      <Projects />
    </>
  )
}

function Routes({ pathname }) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/') return <Home />

  const match = path.match(/^\/servicos\/([^/]+)$/)
  const service = match && findService(match[1])
  if (service) return <ServicePage service={service} />
  if (match && serviceRedirects[match[1]]) return <Redirect to={serviceRedirects[match[1]]} />
  if (path === '/servicos') return <Redirect to="/#servicos" />

  return <NotFound />
}

export default function App() {
  const location = useLocation()
  useScrollOnNavigate(location)

  return (
    <>
      <Header />
      <main>
        <Routes pathname={location.pathname} />
      </main>
    </>
  )
}
