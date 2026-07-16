import { Question } from "./types";

export const CATEGORIES_INFO = {
  atendimentoComunicacao: {
    name: "Atendimento e Comunicação",
    description: "Avalia a velocidade, o histórico de interações e a gestão de relacionamento (CRM) com os clientes.",
    icon: "MessageSquare",
    color: "#6D28D9"
  },
  presencaDigital: {
    name: "Presença Digital e Site",
    description: "Mede a qualidade do seu site, o posicionamento no Google e a presença estratégica na internet.",
    icon: "Globe",
    color: "#F0A500"
  },
  marketingAnuncios: {
    name: "Marketing e Anúncios",
    description: "Avalia o investimento em tráfego pago, consistência de redes sociais e uso de Inteligência Artificial para atração ativa.",
    icon: "Compass",
    color: "#8B5CF6"
  },
  processoVendas: {
    name: "Processo de Vendas",
    description: "Mede o controle de leads, o passo a passo de fechamento e o acompanhamento de taxas de conversão.",
    icon: "Coins",
    color: "#EC4899"
  },
  gestaoOperacoes: {
    name: "Gestão e Operações",
    description: "Analisa a automação de processos internos, controle de estoque/compras e acompanhamento de indicadores em tempo real.",
    icon: "BarChart3",
    color: "#10B981"
  }
};

export const QUESTIONS: Question[] = [
  // 1. Atendimento e Comunicação (Canais, Atendimento, Opiniões/Feedback)
  {
    id: "q1",
    text: "Por quais canais você vende seus produtos ou serviços?",
    category: "atendimentoComunicacao",
    categoryName: "Atendimento e Comunicação",
    helperText: "Presença multicanal de vendas integrada com ferramentas.",
    options: [
      { text: "Vendo apenas pessoalmente, em loja física ou em atendimento presencial.", score: 2.5 },
      { text: "Vendo pessoalmente e recebo pedidos por WhatsApp ou redes sociais.", score: 5.0 },
      { text: "Além dos atendimentos presenciais e redes sociais, vendo também pelo meu site ou plataformas de vendas on-line (ex: Mercado Livre, OLX).", score: 7.5 },
      { text: "Uso vários canais (loja física, site, redes sociais, sites de vendas online) e faço gestão de forma integrada com apoio de um sistema (software).", score: 10.0 }
    ]
  },
  {
    id: "q2",
    text: "Como você atende e se comunica com seus clientes?",
    category: "atendimentoComunicacao",
    categoryName: "Atendimento e Comunicação",
    helperText: "Histórico de atendimento e sistemas de relacionamento (CRM).",
    options: [
      { text: "Atendo apenas pessoalmente ou por telefone, sem anotar informações dos clientes.", score: 2.5 },
      { text: "Mantenho o histórico das conversas na ferramenta que o cliente fez contato (WhatsApp Business, e-mail etc).", score: 5.0 },
      { text: "Uso sistemas que registram os atendimentos, com dados dos clientes e histórico de compras, permitindo um atendimento personalizado.", score: 7.5 },
      { text: "Além de registrar atendimentos utilizo estratégias de gestão do relacionamento com o cliente (CRM) com suporte de um sistema dedicado.", score: 10.0 }
    ]
  },
  {
    id: "q3",
    text: "Como você recebe opiniões e sugestões dos clientes?",
    category: "atendimentoComunicacao",
    categoryName: "Atendimento e Comunicação",
    helperText: "Coleta e análise sistemática de feedbacks para melhoria.",
    options: [
      { text: "Não tenho um processo para receber opiniões.", score: 2.5 },
      { text: "Recebo opiniões informalmente, quando os clientes procuram.", score: 5.0 },
      { text: "Acompanho regularmente os comentários em redes sociais, aplicativos e sites de avaliação/reclamação.", score: 7.5 },
      { text: "Utilizo ferramentas específicas para coletar e analisar opiniões, tenho processos de envio e análise, melhorando produtos e serviços.", score: 10.0 }
    ]
  },

  // 2. Presença Digital e Site (Presença, Frequência, Site e Google)
  {
    id: "q4",
    text: "Como é a presença do seu negócio na internet?",
    category: "presencaDigital",
    categoryName: "Presença Digital e Site",
    helperText: "Consistência e investimento estratégico na sua imagem digital.",
    options: [
      { text: "Não tenho presença on-line ou tenho apenas um perfil básico em redes sociais.", score: 2.5 },
      { text: "Tenho um perfil ativo em redes sociais, mas posto de forma irregular e sem planejamento.", score: 5.0 },
      { text: "Uso os canais digitais de forma estratégica, e eles contribuem fortemente para meus resultados empresariais.", score: 7.5 },
      { text: "Invisto em marketing digital, tenho verba mensal para anúncios on-line, tenho canais otimizados e faço análise de resultados com frequência.", score: 10.0 }
    ]
  },
  {
    id: "q5",
    text: "Sua empresa posta com frequência nas redes sociais (Instagram, Facebook, etc.)?",
    category: "presencaDigital",
    categoryName: "Presença Digital e Site",
    helperText: "Consistência de conteúdo para engajamento e atração.",
    options: [
      { text: "Ainda não fazemos.", score: 3.3 },
      { text: "Fazemos de vez em quando.", score: 6.6 },
      { text: "Fazemos sempre e dá resultado.", score: 10.0 }
    ]
  },
  {
    id: "q6",
    text: "Seu site é rápido, funciona bem no celular e passa confiança?",
    category: "presencaDigital",
    categoryName: "Presença Digital e Site",
    helperText: "Qualidade técnica e credibilidade do seu endereço oficial.",
    options: [
      { text: "Não temos site", score: 3.3 },
      { text: "Temos site, mas nunca avaliei o desempenho", score: 5.0 },
      { text: "Sim, funciona muito bem", score: 10.0 }
    ]
  },

  // 3. Marketing e Anúncios (Anúncios Pagos, Uso de IA)
  {
    id: "q7",
    text: "Sua empresa faz anúncios pagos (Google, Instagram ou Facebook) para atrair clientes?",
    category: "marketingAnuncios",
    categoryName: "Marketing e Anúncios",
    helperText: "Atração ativa de novos leads qualificados através de tráfego pago.",
    options: [
      { text: "Ainda não fazemos.", score: 3.3 },
      { text: "Fazemos de vez em quando.", score: 6.6 },
      { text: "Fazemos sempre e dá resultado.", score: 10.0 }
    ]
  },
  {
    id: "q8",
    text: "Sua empresa já utiliza Inteligência Artificial (ex: ChatGPT, assistentes automáticos) no dia a dia da operação?",
    category: "marketingAnuncios",
    categoryName: "Marketing e Anúncios",
    helperText: "Inovação tecnológica para criar conteúdos e responder clientes.",
    options: [
      { text: "Ainda não fazemos.", score: 3.3 },
      { text: "Fazemos de vez em quando.", score: 6.6 },
      { text: "Fazemos sempre e dá resultado.", score: 10.0 }
    ]
  },

  // 4. Processo de Vendas (Contatos, Follow-up, Passo a passo, Taxa Conversão)
  {
    id: "q9",
    text: "Sua empresa tem um lugar organizado para guardar os contatos de quem demonstra interesse (planilha, sistema, CRM)?",
    category: "processoVendas",
    categoryName: "Processo de Vendas",
    helperText: "Armazenamento seguro e centralizado das oportunidades de vendas.",
    options: [
      { text: "Ainda não fazemos.", score: 3.3 },
      { text: "Fazemos de vez em quando.", score: 6.6 },
      { text: "Fazemos sempre e dá resultado.", score: 10.0 }
    ]
  },
  {
    id: "q10",
    text: "Vocês fazem contato de volta com quem pediu informação (por WhatsApp, e-mail, ligação)?",
    category: "processoVendas",
    categoryName: "Processo de Vendas",
    helperText: "Sistemática de follow-up ativo para recuperar e fechar negócios.",
    options: [
      { text: "Ainda não fazemos.", score: 3.3 },
      { text: "Fazemos de vez em quando.", score: 6.6 },
      { text: "Fazemos sempre e dá resultado.", score: 10.0 }
    ]
  },
  {
    id: "q11",
    text: "Sua empresa tem um passo a passo claro para transformar interessados em clientes?",
    category: "processoVendas",
    categoryName: "Processo de Vendas",
    helperText: "Processo de conversão estruturado do início ao fechamento.",
    options: [
      { text: "Ainda não fazemos.", score: 3.3 },
      { text: "Fazemos de vez em quando.", score: 6.6 },
      { text: "Fazemos sempre e dá resultado.", score: 10.0 }
    ]
  },
  {
    id: "q12",
    text: "Você sabe quantos contatos viram clientes todo mês?",
    category: "processoVendas",
    categoryName: "Processo de Vendas",
    helperText: "Métricas de conversão de leads para avaliar eficiência comercial.",
    options: [
      { text: "Ainda não fazemos.", score: 3.3 },
      { text: "Fazemos de vez em quando.", score: 6.6 },
      { text: "Fazemos sempre e dá resultado.", score: 10.0 }
    ]
  },

  // 5. Gestão e Operações (Gerenciamento, Estoque, Indicadores)
  {
    id: "q13",
    text: "Como você gerencia as operações do seu negócio?",
    category: "gestaoOperacoes",
    categoryName: "Gestão e Operações",
    helperText: "Organização operacional por planilhas ou sistemas de gestão integrada.",
    options: [
      { text: "Uso métodos manuais e anotações em papel.", score: 2.5 },
      { text: "Utilizo planilhas no computador para algumas atividades.", score: 5.0 },
      { text: "Uso um programa simples para organizar processos.", score: 7.5 },
      { text: "Tenho sistemas integrados que automatizam processos e fornecem análises.", score: 10.0 }
    ]
  },
  {
    id: "q14",
    text: "Como você controla o estoque e as compras do seu negócio?",
    category: "gestaoOperacoes",
    categoryName: "Gestão e Operações",
    helperText: "Gestão inteligente de insumos/estoque para otimizar capital de giro.",
    options: [
      { text: "Faço registros manuais esporádicos e não monitoro com frequência.", score: 2.5 },
      { text: "Uso planilhas para controlar estoque e compras de forma regular.", score: 5.0 },
      { text: "Utilizo programas específicos para gestão de estoque e pedidos a fornecedores.", score: 7.5 },
      { text: "Tenho sistemas integrados que automatizam vendas, estoque, compras e preveem necessidades futuras.", score: 10.0 }
    ]
  },
  {
    id: "q15",
    text: "Sua empresa acompanha indicadores de faturamento, margem e custos em tempo real por um sistema?",
    category: "gestaoOperacoes",
    categoryName: "Gestão e Operações",
    helperText: "Saúde financeira monitorada de forma automatizada (DRE, EBITDA).",
    options: [
      { text: "Ainda não fazemos.", score: 3.3 },
      { text: "Fazemos de vez em quando.", score: 6.6 },
      { text: "Fazemos sempre e dá resultado.", score: 10.0 }
    ]
  }
];
