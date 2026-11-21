import Logo from './Logo.jsx'
import { Link } from '../router.jsx'
import './Header.css'

// Links absolutos ("/#...") para funcionarem também nas páginas de serviço
const links = [
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Serviços', href: '/#servicos' },
]

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <nav className="nav" aria-label="Navegação principal">
          <ul className="nav-list">
            {links.map((link) => (
              <li key={link.href}>
                <Link className="nav-link" to={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="btn btn-outline nav-cta" to="/#orcamento">
            Orçamento
          </Link>
        </nav>
      </div>
    </header>
  )
}
