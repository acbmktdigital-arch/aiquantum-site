import {
  generateLeadReport,
  saveLeadToSheet,
  computeOverallAverage,
} from "../../lib/diagnostico";

// Função serverless (Netlify): gera o relatório do diagnóstico e salva
// o lead na planilha Google via Apps Script.
// A propriedade `path` faz a função responder direto em /api/diagnostico.
export const config = {
  path: "/api/diagnostico",
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

  const { scores, answers, lead } = body || {};
  if (!scores) {
    return Response.json({ error: "Scores are required" }, { status: 400 });
  }

  // Gera SÓ a versão do lead aqui (limite de tempo por função no Netlify);
  // a versão técnica do consultor é gerada em /api/agendar-1a1.
  const t0 = Date.now();
  const { text, fromAI } = await generateLeadReport(scores, answers || {});
  const genMs = Date.now() - t0;

  // Salva o lead antes de responder (em serverless a execução termina
  // junto com a resposta, então não pode ser "fire and forget").
  const t1 = Date.now();
  await saveLeadToSheet({
    type: "novo_lead",
    lead: lead || {},
    scores,
    overallAverage: computeOverallAverage(scores),
    report: text,
  });
  const sheetMs = Date.now() - t1;

  // meta: diagnóstico de latência (o frontend ignora)
  return Response.json({ text, meta: { genMs, sheetMs, fromAI } });
}
