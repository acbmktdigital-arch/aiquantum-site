import { generateConsultantReport, saveLeadToSheet } from "../../lib/diagnostico";

// BACKGROUND FUNCTION (sufixo "-background"): o Netlify responde 202 na
// hora e executa isto em segundo plano por até 15 min. Por isso o
// relatório do consultor pode usar o modelo completo do Gemini, sem
// limite de palavras — o lead não espera por esta resposta (o site já
// abriu o WhatsApp). Mantemos o path /api/agendar-1a1 para o frontend
// não mudar.
export const config = {
  path: "/api/agendar-1a1",
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ error: "Método não permitido" }, { status: 405 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { lead, overallAverage, report, scores, answers } = body || {};
  if (!lead || (!lead.email && !lead.name)) {
    return Response.json({ error: "Dados do lead são obrigatórios" }, { status: 400 });
  }

  // Gera a versão técnica COMPLETA (sem pressa) e grava na planilha;
  // o Apps Script preenche a coluna "Relatório Consultor" e envia o e-mail.
  let reportConsultor = "";
  if (scores) {
    reportConsultor = (await generateConsultantReport(scores, answers || {})).text;
  }

  await saveLeadToSheet({
    type: "solicitou_1a1",
    lead,
    overallAverage,
    report,
    reportConsultor,
  });

  return Response.json({ ok: true });
}
