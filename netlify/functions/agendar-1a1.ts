import { generateConsultantReport, saveLeadToSheet } from "../../lib/diagnostico";

// Função serverless (Netlify): chamada quando o lead clica em
// "Agendar Diagnóstico Gratuito 1A1" na tela de resultado.
// Marca o lead na planilha e dispara o e-mail com o relatório
// para o consultor (feito pelo Apps Script).
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

  // A versão técnica é gerada agora (o lead não espera por esta chamada):
  // o Apps Script grava na coluna "Relatório Consultor" e envia por e-mail.
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
