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
import { collectImages } from './projectImages.js'

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

export const siteProjects = siteProjectList.map((p, i) => ({
  ...p,
  number: String(i + 1).padStart(2, '0'),
  ...collectImages(files, BASE, p.folder),
}))

export const findSiteProject = (id) => siteProjects.find((p) => p.id === id)

export const siteProjectPath = (id) => `/servicos/sites/${id}`
