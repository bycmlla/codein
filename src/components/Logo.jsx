export default function Logo() {
  return (
    <a href="/" className="logo" aria-label="CodeIn — página inicial">
      <svg className="logo-icon" viewBox="0 0 48 42" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="44" height="30" rx="5" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M12 11.5l6 5-6 5"
          stroke="var(--primary-light)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M21 23h10" stroke="var(--primary-light)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M17 39h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="logo-text">
        Code<span className="logo-accent">In</span>
      </span>
    </a>
  )
}
