import { GoogleGenAI } from "@google/genai";

// Lógica compartilhada entre o servidor local (server.ts) e as
// funções serverless da Vercel (pasta api/).

export interface CategoryScores {
  atendimentoComunicacao: number;
  presencaDigital: number;
  marketingAnuncios: number;
  processoVendas: number;
  gestaoOperacoes: number;
}

export interface LeadInfo {
  name?: string;
  email?: string;
  phone?: string;
}

export function computeOverallAverage(scores: CategoryScores): number {
  const values = Object.values(scores);
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

// Versão TÉCNICA — vai apenas para o consultor (e-mail + planilha).
export function buildConsultantPrompt(scores: CategoryScores, answers: Record<string, number>): string {
  return `Você é um consultor de negócios de elite especializado em Transformação Digital, Automação de Processos e Inteligência Artificial para Pequenas e Médias Empresas.
Você recebeu os resultados do Questionário Raio-X de Maturidade Digital de uma empresa. As notas por Área de Análise (de 0% a 100%) são:
- Atendimento e Comunicação: ${scores.atendimentoComunicacao}%
- Presença Digital e Site: ${scores.presencaDigital}%
- Marketing e Anúncios: ${scores.marketingAnuncios}%
- Processo de Vendas: ${scores.processoVendas}%
- Gestão e Operações: ${scores.gestaoOperacoes}%

As notas individuais das 15 perguntas (de 0 a 10) foram:
${JSON.stringify(answers, null, 2)}

Gere um Relatório Diagnóstico Raio-X personalizado de altíssimo nível. O relatório deve ser escrito em português do Brasil, em tom encorajador, altamente profissional, executivo, sofisticado e cirúrgico (sem enrolação, mas muito profundo). Use termos do mercado corporativo e de tecnologia (ex: automação de fluxos, integração de sistemas, eficiência operacional, CRM, inteligência artificial, canais integrados, KPIs).
O relatório deve conter exatamente as seguintes seções estruturadas em Markdown:
### 📊 1. Nível Geral de Maturidade Digital e Operações
Uma análise sincera e de alto nível da maturidade digital e operacional da empresa (se ela se comporta como Operação Manual, Em Digitalização ou Empresa Inteligente/Conectada) baseado em sua média geral e na harmonia dos scores. Destaque o que ela já faz de excelente.

### ⚠️ 2. O Maior Gargalo Operacional (Perda de Tempo e Clientes)
Identifique qual área está mais prejudicando a capacidade dela de escalar, reduzir custos ou de fechar mais clientes com velocidade. Explique o impacto psicológico ou financeiro que esse gargalo específico causa no negócio.

### 🚀 3. Plano de Ação Estratégico (3 Passos de Impacto)
Forneça exatamente 3 passos cirúrgicos e práticos para a empresa implementar nos próximos 30 dias para otimizar seus processos, economizar tempo e aumentar o lucro através de tecnologia e automações.`;
}

// Versão COMERCIAL — exibida ao lead na tela de resultado.
// Personalizada pelas notas, mas sem jargão e sem entregar o "como",
// para preservar o interesse na Sessão 1A1.
export function buildLeadPrompt(scores: CategoryScores, answers: Record<string, number>): string {
  return `Você é um consultor de negócios experiente conversando com o DONO de uma pequena ou média empresa no Brasil. Ele acabou de responder o Questionário Raio-X de Maturidade Digital. As notas por Área de Análise (de 0% a 100%) são:
- Atendimento e Comunicação: ${scores.atendimentoComunicacao}%
- Presença Digital e Site: ${scores.presencaDigital}%
- Marketing e Anúncios: ${scores.marketingAnuncios}%
- Processo de Vendas: ${scores.processoVendas}%
- Gestão e Operações: ${scores.gestaoOperacoes}%

As notas individuais das 15 perguntas (de 0 a 10) foram:
${JSON.stringify(answers, null, 2)}

Escreva um Relatório Diagnóstico personalizado e direto para esse empresário, em português do Brasil.

REGRAS OBRIGATÓRIAS DE LINGUAGEM:
- O relatório completo deve ter NO MÁXIMO 350 palavras.
- Fale como quem conversa com um dono de negócio, não com um técnico.
- PROIBIDO usar termos técnicos, siglas ou nomes de ferramentas/aplicativos. Não escreva CRM, KPI, pipeline, funil, dashboard, ERP, follow-up, leads, chatbot, API, software específico ou nome de qualquer aplicativo. Use expressões simples como "controle de clientes", "acompanhamento de vendas", "respostas automáticas", "indicadores do negócio".
- Foque em DINHEIRO e TEMPO: onde a empresa está perdendo vendas, deixando clientes esperando ou gastando horas em tarefa manual — e o quanto pode melhorar.
- Tom encorajador e sincero: mostre o potencial, não só o problema.
- NÃO explique COMO implementar as soluções (não dê passo a passo técnico, não cite tecnologias). Mostre O QUE precisa ser resolvido e o impacto de resolver.

O relatório deve conter exatamente as seguintes seções estruturadas em Markdown:
### 📊 1. Onde Sua Empresa Está Hoje
Uma análise sincera e acessível do momento do negócio com base na média geral e no equilíbrio entre as áreas. Destaque também o que a empresa já faz bem.

### ⚠️ 2. Onde Você Está Perdendo Dinheiro e Tempo
Aponte a área mais crítica segundo as notas e explique, em linguagem do dia a dia, como esse gargalo se traduz em clientes perdidos, vendas esquecidas ou horas desperdiçadas.

### 🚀 3. Suas 3 Frentes de Ação Prioritárias
Liste exatamente 3 frentes que a empresa precisa atacar nos próximos 30 dias, dizendo O QUE resolver e o resultado esperado — sem detalhar o como. Feche a seção com uma frase convidando o empresário a agendar a Sessão Estratégica 1A1 gratuita de 30 minutos, onde será desenhado o caminho exato, sob medida, para executar essas frentes.`;
}

// Fallback exibido ao LEAD quando a IA está indisponível — mesma
// linguagem simples e sem jargão da versão gerada.
export function buildFallbackReport(overallAverage: number): string {
  return `### 📊 1. Onde Sua Empresa Está Hoje
Com uma pontuação média geral de **${overallAverage}%**, sua empresa está no caminho da modernização, mas ainda existem tarefas manuais e falhas invisíveis no atendimento e no controle das vendas que seguram seu faturamento e consomem seu tempo. O potencial de crescimento é grande quando esses pontos são corrigidos na ordem certa.

### ⚠️ 2. Onde Você Está Perdendo Dinheiro e Tempo
Seus menores indicadores apontam para o atendimento e o acompanhamento das vendas. Quando um cliente interessado não recebe resposta rápida — ou é esquecido depois do primeiro contato — a venda vai para o concorrente. Isso significa dinheiro deixado na mesa todos os meses, sem que ninguém perceba.

### 🚀 3. Suas 3 Frentes de Ação Prioritárias
1. **Atendimento que responde na hora**: garantir que nenhum cliente fique esperando, mesmo fora do horário comercial.
2. **Acompanhamento de cada venda**: saber exatamente quem demonstrou interesse, em que etapa parou e quem precisa de um retorno hoje.
3. **Menos tarefa manual na rotina**: liberar horas da sua semana automatizando controles que hoje dependem de anotação e memória.

Na **Sessão Estratégica 1A1 gratuita de 30 minutos**, desenhamos juntos o caminho exato, sob medida para a sua empresa, para executar essas três frentes.`;
}

// Fallback do CONSULTOR — versão técnica resumida com as notas,
// para ele nunca chegar à sessão sem contexto.
export function buildConsultantFallback(scores: CategoryScores, overallAverage: number): string {
  return `### 📊 1. Nível Geral de Maturidade Digital e Operações
Média geral de **${overallAverage}%** (relatório gerado sem IA — chave indisponível no momento do diagnóstico).
Notas por área:
- Atendimento e Comunicação: ${scores.atendimentoComunicacao}%
- Presença Digital e Site: ${scores.presencaDigital}%
- Marketing e Anúncios: ${scores.marketingAnuncios}%
- Processo de Vendas: ${scores.processoVendas}%
- Gestão e Operações: ${scores.gestaoOperacoes}%

### ⚠️ 2. O Maior Gargalo Operacional
Priorizar na sessão as duas áreas de menor score acima. Padrão típico: ausência de funil automatizado e de fluxo de follow-up (IA + CRM), gerando perda de leads por demora ou esquecimento.

### 🚀 3. Direcionamento para a Sessão 1A1
1. **Atendimento**: avaliar IA integrada ao WhatsApp para triagem e resposta 24/7.
2. **Vendas**: estruturar pipeline em CRM com follow-up sistemático.
3. **Operações**: integrar estoque/finanças em painel de indicadores com alertas automáticos.`;
}

function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Até 2 tentativas: erros 503 ("model overloaded") do Gemini são
// transitórios. Modelo flash-lite + relatórios curtos: a resposta
// precisa caber no limite de ~10s das funções do Netlify (o 3.5-flash
// levava ~30s e estourava o limite).
async function callGemini(ai: GoogleGenAI, prompt: string): Promise<string | null> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      // Teto de 9s por tentativa: uma chamada travada não pode consumir
      // o tempo total da função serverless (o lead recebe o fallback).
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("gemini-timeout-9s")), 9000)
      );
      const response = await Promise.race([
        ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: prompt,
        }),
        timeout,
      ]);
      if (response.text) return response.text;
      console.warn(`Gemini retornou vazio (tentativa ${attempt}).`);
    } catch (error: any) {
      console.error(`Erro na chamada Gemini (tentativa ${attempt}):`, error?.status || error?.message || error);
    }
    if (attempt < 2) await new Promise((r) => setTimeout(r, 500));
  }
  return null;
}

// Chamada SEM pressa, usada só pelo relatório do consultor, que roda
// numa Netlify Background Function (limite de 15 min). Por isso usa o
// modelo completo gemini-3.5-flash, sem limite de palavras. Teto de
// 90s por tentativa apenas para não pendurar em uma chamada travada.
async function callGeminiFull(ai: GoogleGenAI, prompt: string): Promise<string | null> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("gemini-timeout-90s")), 90000)
      );
      const response = await Promise.race([
        ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        }),
        timeout,
      ]);
      if (response.text) return response.text;
      console.warn(`Gemini (full) retornou vazio (tentativa ${attempt}).`);
    } catch (error: any) {
      console.error(`Erro na chamada Gemini full (tentativa ${attempt}):`, error?.status || error?.message || error);
    }
    if (attempt < 2) await new Promise((r) => setTimeout(r, 1000));
  }
  return null;
}

// Versão COMERCIAL exibida ao lead — gerada no fim do quiz.
export async function generateLeadReport(
  scores: CategoryScores,
  answers: Record<string, number>
): Promise<{ text: string; fromAI: boolean }> {
  const overallAverage = computeOverallAverage(scores);
  const ai = getGeminiClient();
  if (!ai) {
    console.warn("GEMINI_API_KEY ausente — usando fallback do lead.");
    return { text: buildFallbackReport(overallAverage), fromAI: false };
  }
  const raw = await callGemini(ai, buildLeadPrompt(scores, answers));
  if (!raw) console.warn("Versão do lead falhou — usando fallback do lead.");
  return { text: raw || buildFallbackReport(overallAverage), fromAI: Boolean(raw) };
}

// Versão TÉCNICA completa para o consultor — gerada quando o lead pede a
// Sessão 1A1, numa Background Function (sem limite apertado de tempo).
// Usa o modelo completo (callGeminiFull) e o prompt sem limite de palavras.
export async function generateConsultantReport(
  scores: CategoryScores,
  answers: Record<string, number>
): Promise<{ text: string; fromAI: boolean }> {
  const overallAverage = computeOverallAverage(scores);
  const ai = getGeminiClient();
  if (!ai) {
    console.warn("GEMINI_API_KEY ausente — usando fallback do consultor.");
    return { text: buildConsultantFallback(scores, overallAverage), fromAI: false };
  }
  const raw = await callGeminiFull(ai, buildConsultantPrompt(scores, answers));
  if (!raw) console.warn("Versão do consultor falhou — usando fallback do consultor.");
  return { text: raw || buildConsultantFallback(scores, overallAverage), fromAI: Boolean(raw) };
}

export interface SheetPayload {
  type: "novo_lead" | "solicitou_1a1";
  lead: LeadInfo;
  scores?: CategoryScores;
  overallAverage?: number;
  report?: string;
  reportConsultor?: string;
}

// Envia os dados para o Google Apps Script vinculado à planilha de
// leads. Nunca lança erro: o lead não pode perder o relatório por
// falha no armazenamento — o erro fica registrado no log do servidor.
export async function saveLeadToSheet(payload: SheetPayload): Promise<boolean> {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) {
    console.warn("APPS_SCRIPT_URL não configurada — lead NÃO foi salvo na planilha.");
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    if (!response.ok) {
      console.error("Apps Script respondeu com status", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Falha ao enviar lead para a planilha:", error);
    return false;
  }
}
