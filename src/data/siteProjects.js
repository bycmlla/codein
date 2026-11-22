/*
 * Portfólio de sites — "Alguns que já fizemos."
 *
 * Para adicionar um projeto:
 *   1. coloque as capturas em src/assets/Sites/<pasta> (a principal deve se chamar "capa");
 *   2. rode `python scripts/optimize_site_images.py`;
 *   3. acrescente um item em `siteProjectList` abaixo.
 *
 * As imagens são encontradas automaticamente na pasta otimizada (src/assets/sites-web),
 * com a capa primeiro e as demais em ordem numérica natural (img2 antes de img10).
 */

const siteProjectList = [
  {
    id: 'gmac',
    name: 'GMAC',
    folder: 'GMAC/GMAC Site',
    description: null, // a preencher
  },
  {
    id: 'jtd-transportes',
    name: 'JTD Transportes',
    folder: 'JTD Transportes',
    description: null, // a preencher
  },
  {
    id: 'mdione',
    name: 'MDione',
    folder: 'MDione',
    description: null, // a preencher
  },
]

// Todas as versões otimizadas (WebP) — só URLs, nada é embutido no JS
const files = import.meta.glob('../assets/sites-web/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const BASE = '../assets/sites-web/'

/** Ordenação natural: compara trechos numéricos como números ("img2" < "img10"). */
const collator = new Intl.Collator('pt-BR', { numeric: true, sensitivity: 'base' })

function imagesFor(folder) {
  const prefix = `${BASE}${folder}/`
  const byName = new Map()

  for (const [path, url] of Object.entries(files)) {
    if (!path.startsWith(prefix)) continue
    const rest = path.slice(prefix.length)
    if (rest.includes('/')) continue // ignora subpastas (outros projetos)
    const isThumb = rest.endsWith('.thumb.webp')
    const name = rest.replace(/(\.thumb)?\.webp$/, '')
    const entry = byName.get(name) ?? { name }
    entry[isThumb ? 'thumb' : 'full'] = url
    byName.set(name, entry)
  }

  const all = [...byName.values()]
    .filter((img) => img.full)
    .map((img) => ({ ...img, thumb: img.thumb ?? img.full }))

  const cover = all.find((img) => img.name.toLowerCase() === 'capa') ?? null
  const gallery = all
    .filter((img) => img !== cover)
    .sort((a, b) => collator.compare(a.name, b.name))

  return { cover, gallery }
}

export const siteProjects = siteProjectList.map((p, i) => {
  const { cover, gallery } = imagesFor(p.folder)
  return {
    ...p,
    number: String(i + 1).padStart(2, '0'),
    cover,
    gallery,
    /** Capa + demais capturas, na ordem de exibição */
    images: cover ? [cover, ...gallery] : gallery,
  }
})

export const findSiteProject = (id) => siteProjects.find((p) => p.id === id)

export const siteProjectPath = (id) => `/servicos/sites/${id}`
