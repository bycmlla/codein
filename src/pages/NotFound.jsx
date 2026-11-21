import { Link, useDocumentMeta } from '../router.jsx'

export default function NotFound() {
  useDocumentMeta('Página não encontrada | CodeIn Tecnologia', 'A página que você procura não existe.')

  return (
    <section className="service-page">
      <div className="container">
        <p className="eyebrow">Erro 404</p>
        <h1 className="sp-title">Página não encontrada.</h1>
        <p className="sp-intro">O endereço acessado não existe ou foi alterado.</p>
        <p style={{ marginTop: 32 }}>
          <Link className="link" to="/">
            Voltar para a página inicial
          </Link>
        </p>
      </div>
    </section>
  )
}
