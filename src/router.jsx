/*
 * Roteador mínimo baseado na History API.
 * Suporta abrir uma URL diretamente, atualizar a página e o botão Voltar,
 * além de links para âncoras de outra página (ex.: "/#servicos").
 */
import { useEffect, useLayoutEffect, useSyncExternalStore } from 'react'

const listeners = new Set()
let version = 0
let lastWasPop = false

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  // a posição de rolagem é restaurada por nós ao usar Voltar/Avançar
  window.history.scrollRestoration = 'manual'
}

function notify() {
  version += 1
  listeners.forEach((l) => l())
}

function onPopState() {
  lastWasPop = true
  notify()
}

function subscribe(listener) {
  listeners.add(listener)
  window.addEventListener('popstate', onPopState)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener('popstate', onPopState)
  }
}

function saveScroll() {
  window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '')
}

export function navigate(to) {
  const url = new URL(to, window.location.href)
  const current = window.location.pathname + window.location.search + window.location.hash
  const next = url.pathname + url.search + url.hash
  saveScroll()
  if (next !== current) window.history.pushState(null, '', next)
  lastWasPop = false
  notify()
}

/** Substitui a URL atual (sem criar entrada no histórico) — usado em redirecionamentos. */
export function redirect(to) {
  const url = new URL(to, window.location.href)
  window.history.replaceState(null, '', url.pathname + url.search + url.hash)
  lastWasPop = false
  notify()
}

/** Componente que redireciona assim que é exibido. */
export function Redirect({ to }) {
  useLayoutEffect(() => {
    redirect(to)
  }, [to])
  return null
}

/** Re-renderiza a cada navegação e devolve a localização atual. */
export function useLocation() {
  useSyncExternalStore(subscribe, () => version)
  return { pathname: window.location.pathname, hash: window.location.hash, key: version }
}

/** Link interno: navega sem recarregar; mantém o comportamento padrão com Ctrl/Cmd/clique do meio. */
export function Link({ to, onClick, ...props }) {
  function handleClick(e) {
    onClick?.(e)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      props.target
    ) {
      return
    }
    e.preventDefault()
    navigate(to)
  }

  return <a href={to} onClick={handleClick} {...props} />
}

/** Rola até a âncora (ou ao topo) sempre que a rota muda; no Voltar, restaura a posição. */
export function useScrollOnNavigate(location) {
  useLayoutEffect(() => {
    const savedY = window.history.state?.scrollY
    if (lastWasPop && typeof savedY === 'number') {
      window.scrollTo(0, savedY)
      return
    }
    if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key])
}

// Salva a posição antes de recarregar/sair, para restaurá-la ao voltar
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', saveScroll)
}

/** Título e descrição da página para SEO. */
export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [title, description])
}
