const paths = {
  // Globo — sites
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.4 3.5 5.3 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.3-3.5-8.5S9.6 5.9 12 3.5z" />
    </>
  ),
  // Camadas — sistemas
  layers: (
    <>
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5z" />
      <path d="M3.5 12 12 16.5 20.5 12" />
      <path d="M3.5 16 12 20.5 20.5 16" />
    </>
  ),
  // Smartphone — aplicativos
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.2h3" />
    </>
  ),
  // Fluxo / conexões — automações e integrações
  workflow: (
    <>
      <rect x="3" y="3.5" width="7" height="6" rx="1.5" />
      <rect x="14" y="14.5" width="7" height="6" rx="1.5" />
      <path d="M6.5 9.5v3.5a2 2 0 0 0 2 2H14" />
      <path d="M10 6.5h5.5a2 2 0 0 1 2 2v6" />
    </>
  ),
  // Chip / circuito — inteligência artificial
  ai: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <path d="M10 2.5v4M14 2.5v4M10 17.5v4M14 17.5v4M2.5 10h4M2.5 14h4M17.5 10h4M17.5 14h4" />
      <path d="M10 14.5l1.4-5h1.2l1.4 5M10.5 13h3" />
    </>
  ),
  // Monitor — suporte e infraestrutura
  support: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M8.5 20h7" />
      <path d="M12 16.5V20" />
      <path d="M9.5 10.5l1.8 1.8 3.2-3.6" />
    </>
  ),
  // Megafone — presença e divulgação
  megaphone: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h2.5L14 19V5L7.5 9H5a1 1 0 0 0-1 1z" />
      <path d="M7.5 15l1 4.5" />
      <path d="M17.5 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M20 7a7 7 0 0 1 0 10" />
    </>
  ),
}

export default function ServiceIcon({ name, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
