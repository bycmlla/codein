import Logo from './Logo.jsx'
import './Header.css'

const links = [
  { label: 'Projetos', href: '#projetos' },
  { label: 'Serviços', href: '#servicos' },
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
                <a className="nav-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-outline nav-cta" href="#orcamento">
            Orçamento
          </a>
        </nav>
      </div>
    </header>
  )
}
