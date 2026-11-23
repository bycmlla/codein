/*
 * Monta a lista de imagens de um projeto a partir das versões otimizadas (WebP)
 * geradas por scripts/optimize_site_images.py.
 *
 * `files` é o resultado de um import.meta.glob (caminho → URL) e `base` o prefixo
 * da pasta otimizada. A capa ("capa") vem primeiro; as demais seguem em ordem
 * numérica natural (img2 antes de img10).
 */

/** Ordenação natural: compara trechos numéricos como números ("img2" < "img10"). */
const collator = new Intl.Collator('pt-BR', { numeric: true, sensitivity: 'base' })

export function collectImages(files, base, folder) {
  const prefix = `${base}${folder}/`
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

  return {
    cover,
    gallery,
    /** Capa + demais capturas, na ordem de exibição */
    images: cover ? [cover, ...gallery] : gallery,
  }
}
