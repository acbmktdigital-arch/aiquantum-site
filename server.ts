import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import {
  generateReports,
  saveLeadToSheet,
  computeOverallAverage,
} from "./lib/diagnostico";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gera o relatório e salva o lead na planilha (mesma lógica das
  // funções serverless em api/ — usada aqui para desenvolvimento local).
  app.post("/api/diagnostico", async (req, res) => {
    try {
      const { scores, answers, lead } = req.body;
      if (!scores) {
        return res.status(400).json({ error: "Scores are required" });
      }

      const { leadText, consultantText } = await generateReports(scores, answers || {});

      await saveLeadToSheet({
        type: "novo_lead",
        lead: lead || {},
        scores,
        overallAverage: computeOverallAverage(scores),
        report: leadText,
        reportConsultor: consultantText,
      });

      // O lead recebe apenas a versão comercial
      res.json({ text: leadText });
    } catch (error: any) {
      console.error("Erro no diagnóstico:", error);
      res.status(500).json({ error: error.message || "Erro interno do servidor ao gerar diagnóstico" });
    }
  });

  // Lead clicou em "Agendar 1A1": marca na planilha e o Apps Script
  // envia o relatório por e-mail ao consultor.
  app.post("/api/agendar-1a1", async (req, res) => {
    try {
      const { lead, overallAverage, report } = req.body;
      if (!lead || (!lead.email && !lead.name)) {
        return res.status(400).json({ error: "Dados do lead são obrigatórios" });
      }

      await saveLeadToSheet({
        type: "solicitou_1a1",
        lead,
        overallAverage,
        report,
      });

      res.json({ ok: true });
    } catch (error: any) {
      console.error("Erro ao registrar pedido de 1A1:", error);
      res.status(500).json({ error: error.message || "Erro interno do servidor" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
