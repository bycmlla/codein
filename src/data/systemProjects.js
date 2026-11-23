/*
 * Portfólio de sistemas — "Alguns que já desenvolvemos."
 *
 * Para adicionar um projeto ou imagens:
 *   1. coloque as capturas em src/assets/Sistemas/<pasta> (a principal deve se chamar "capa");
 *   2. rode `py scripts/optimize_site_images.py`;
 *   3. acrescente/ajuste o item em `systemProjectList` abaixo.
 *
 * Imagens com dados sensíveis ficam listadas em scripts/imagens_em_revisao.json
 * e não são publicadas até serem liberadas.
 */
import { collectImages } from './projectImages.js'

const systemProjectList = [
  {
    id: 'portal-gmac',
    name: 'Portal GMAC',
    folder: 'Portal GMAC',
    category: 'Sistema de Gestão Industrial',
    summary:
      'Gestão industrial com controle de ordens de serviço, produção, estoque, financeiro e operações.',
    description: [
      'Sistema de gestão desenvolvido para a GMAC Metalúrgica, reunindo em uma única plataforma ferramentas para organizar e acompanhar diferentes áreas da empresa.',
      'O portal permite gerenciar cadastros, ofertas e ordens de serviço, acompanhar a produção e os serviços em andamento, realizar planejamentos e controlar informações financeiras.',
      'Também conta com recursos para gestão de estoque, cálculos de pesos e medidas, relatórios e acompanhamento das operações, facilitando o acesso às informações e a organização da rotina industrial.',
    ],
    features: [
      'Gestão de cadastros',
      'Ofertas e ordens de serviço',
      'Acompanhamento da produção',
      'Controle de serviços em andamento e concluídos',
      'Estoque administrativo',
      'Calculadora de pesos e medidas',
      'Gestão financeira',
      'Relatórios e indicadores',
      'Planejamento operacional',
    ],
  },
  {
    id: 'vexo',
    name: 'Vexo',
    folder: 'Vexo',
    category: 'Sistema de Gestão para Transportadoras',
    summary:
      'Sistema de gestão para transportadoras com controle administrativo, operacional, financeiro e organização de cadastros.',
    description: [
      'O Vexo é um sistema de gestão empresarial voltado para o setor de transportes, desenvolvido para centralizar informações e facilitar o controle administrativo, operacional e financeiro.',
      'A plataforma reúne ferramentas para cadastro de unidades, fornecedores e seguros, além de recursos para gestão financeira, contas a pagar, lançamentos, programação de pagamentos e relatórios.',
      'Com diferentes módulos integrados, o sistema ajuda a organizar os processos da transportadora e permite acompanhar informações importantes da operação em um só ambiente.',
    ],
    features: [
      'Cadastro e gestão de unidades',
      'Cadastro de fornecedores',
      'Controle de seguros',
      'Gestão operacional',
      'Gestão financeira',
      'Contas a pagar',
      'Programação de pagamentos',
      'Lançamentos financeiros',
      'Relatórios e consultas',
    ],
  },
  {
    id: 'swc',
    name: 'SWC — Service Of WellControl',
    shortName: 'SWC',
    folder: 'Service of Well Control',
    category: 'Plataforma de Gestão de Treinamentos e Avaliações',
    summary:
      'Plataforma para gestão de alunos, instrutores, cursos, turmas, avaliações e relatórios de desempenho.',
    description: [
      'Sistema desenvolvido para organizar e acompanhar atividades educacionais e treinamentos, reunindo em uma única plataforma a gestão de alunos, instrutores, cursos, turmas e avaliações.',
      'Conta com ferramentas para cadastros, calendário, documentos, controle de atividades e emissão de relatórios, facilitando o acompanhamento das informações.',
      'A plataforma também oferece painéis com gráficos e indicadores de desempenho, permitindo analisar resultados de avaliações, médias de notas e informações por curso, turma e instrutor.',
    ],
    features: [
      'Gestão de alunos',
      'Cadastro de instrutores',
      'Organização de cursos e turmas',
      'Calendário de atividades',
      'Controle de avaliações',
      'Relatórios de desempenho',
      'Indicadores e gráficos',
      'Gestão de documentos',
      'Painel administrativo',
    ],
  },
]

// Versões otimizadas (WebP) — só URLs, nada é embutido no JS
const files = import.meta.glob('../assets/sistemas-web/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const BASE = '../assets/sistemas-web/'

export const systemProjects = systemProjectList.map((p, i) => ({
  ...p,
  shortName: p.shortName ?? p.name,
  number: String(i + 1).padStart(2, '0'),
  ...collectImages(files, BASE, p.folder),
}))

export const findSystemProject = (id) => systemProjects.find((p) => p.id === id)

export const systemProjectPath = (id) => `/servicos/sistemas/${id}`

/*
 * Fluxo de orçamento do site. O parâmetro `servico` identifica a origem do contato,
 * para o formulário de orçamento pré-selecionar "Sistemas Sob Medida".
 */
export const SYSTEMS_CONTACT = '/?servico=sistemas#orcamento'
