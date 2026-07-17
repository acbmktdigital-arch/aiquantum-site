# Configuração da Planilha de Leads (Google Sheets + Apps Script)

Este guia configura o armazenamento dos leads do quiz Raio-X numa planilha
Google e o envio automático do relatório por e-mail ao consultor quando o
lead clica em **"Agendar Diagnóstico Gratuito 1A1"**.

Tempo estimado: **10 minutos**. Custo: **zero**.

---

## Passo 1 — Criar a planilha

1. Acesse [sheets.new](https://sheets.new) (logado na conta Google que será dona dos dados).
2. Dê um nome, por exemplo: **Leads Raio-X — AI Quantum**.
3. Não precisa criar colunas — o script cria tudo sozinho na primeira execução.

## Passo 2 — Instalar o script

1. Na planilha, abra o menu **Extensões → Apps Script**.
2. Apague qualquer código que estiver lá e cole o código abaixo.
3. Na primeira linha, troque `consultor@exemplo.com` pelo **e-mail real do consultor**.
4. Salve (ícone de disquete ou Ctrl+S).

```javascript
// ============ CONFIGURAÇÃO ============
var EMAIL_CONSULTOR = "consultor@exemplo.com"; // <-- TROQUE AQUI
var NOME_ABA = "Leads";
// ======================================

function doPost(e) {
  var dados = JSON.parse(e.postData.contents);
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(NOME_ABA);

  if (!aba) {
    aba = planilha.insertSheet(NOME_ABA);
    aba.appendRow([
      "Data", "Nome", "E-mail", "WhatsApp",
      "Atendimento e Comunicação", "Presença Digital e Site",
      "Marketing e Anúncios", "Processo de Vendas", "Gestão e Operações",
      "Índice Geral (%)", "Relatório (Lead)", "Solicitou 1A1", "Relatório Consultor"
    ]);
    aba.getRange(1, 1, 1, 13).setFontWeight("bold");
    aba.setFrozenRows(1);
  }

  // Migração: planilhas criadas antes não têm a coluna 13
  if (aba.getRange(1, 13).getValue() === "") {
    aba.getRange(1, 13).setValue("Relatório Consultor").setFontWeight("bold");
  }

  var lead = dados.lead || {};

  // ---- Novo lead terminou o quiz ----
  if (dados.type === "novo_lead") {
    var s = dados.scores || {};
    aba.appendRow([
      new Date(),
      lead.name || "", lead.email || "", lead.phone || "",
      s.atendimentoComunicacao, s.presencaDigital, s.marketingAnuncios,
      s.processoVendas, s.gestaoOperacoes,
      dados.overallAverage, dados.report || "", "Não",
      dados.reportConsultor || ""
    ]);
  }

  // ---- Lead clicou em "Agendar 1A1" ----
  // A versão técnica (reportConsultor) chega NESTA chamada: é gerada
  // pelo servidor no momento do clique e gravada na coluna 13.
  if (dados.type === "solicitou_1a1") {
    var valores = aba.getDataRange().getValues();
    var linha = -1;

    // Procura o lead mais recente com o mesmo e-mail
    for (var i = valores.length - 1; i >= 1; i--) {
      if (valores[i][2] === lead.email) { linha = i + 1; break; }
    }

    var relatorioTecnico = dados.reportConsultor || "";
    var indice = dados.overallAverage || "";

    if (linha > 0) {
      aba.getRange(linha, 12).setValue("Sim");
      if (relatorioTecnico) {
        aba.getRange(linha, 13).setValue(relatorioTecnico);
      } else {
        // Sem versão técnica na chamada: usa a que estiver salva, ou a do lead
        relatorioTecnico = valores[linha - 1][12] || valores[linha - 1][10] || dados.report || "";
      }
      if (!indice) indice = valores[linha - 1][9];
    } else {
      // Lead não encontrado (ex: falha anterior) — cria a linha agora
      if (!relatorioTecnico) relatorioTecnico = dados.report || "";
      aba.appendRow([
        new Date(), lead.name || "", lead.email || "", lead.phone || "",
        "", "", "", "", "", indice, dados.report || "", "Sim", relatorioTecnico
      ]);
    }

    // E-mail para o consultor com a VERSÃO TÉCNICA do relatório
    MailApp.sendEmail({
      to: EMAIL_CONSULTOR,
      subject: "📋 Pedido de Sessão 1A1 — " + (lead.name || "Lead sem nome") + " (índice " + indice + "%)",
      body:
        "Um lead pediu a Sessão Estratégica 1A1 pelo quiz Raio-X.\n\n" +
        "DADOS DO LEAD\n" +
        "Nome: " + (lead.name || "-") + "\n" +
        "E-mail: " + (lead.email || "-") + "\n" +
        "WhatsApp: " + (lead.phone || "-") + "\n" +
        "Índice geral: " + indice + "%\n\n" +
        "==============================\n" +
        "RELATÓRIO TÉCNICO (uso interno — o lead viu uma versão simplificada)\n" +
        "==============================\n\n" +
        relatorioTecnico + "\n\n" +
        "Planilha completa: " + planilha.getUrl()
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Passo 3 — Publicar o script como App da Web

1. No editor do Apps Script, clique em **Implantar → Nova implantação**.
2. Clique na engrenagem ⚙️ ao lado de "Selecionar tipo" e escolha **App da Web**.
3. Configure:
   - **Executar como:** Eu (sua conta)
   - **Quem pode acessar:** **Qualquer pessoa** ← importante!
4. Clique em **Implantar**.
5. Autorize as permissões quando o Google pedir (planilha + envio de e-mail).
6. **Copie a URL do App da Web** (termina em `/exec`).

## Passo 4 — Configurar a URL no site

**Local (desenvolvimento):** crie/edite o arquivo `.env` na pasta `ai quantum`:

```
APPS_SCRIPT_URL="https://script.google.com/macros/s/SEU_ID/exec"
GEMINI_API_KEY="sua-chave-gemini"
```

**No Netlify (produção):** em *Site configuration → Environment variables*
do site, adicione as mesmas duas variáveis (`APPS_SCRIPT_URL` e
`GEMINI_API_KEY`) e faça um novo deploy.

## Pronto! Como funciona

| Momento | O que acontece |
|---|---|
| Lead termina o quiz e preenche o formulário | Linha nova na aba **Leads** com dados, notas e o relatório simplificado que o lead viu (col. "Relatório (Lead)"). Coluna "Solicitou 1A1" = **Não** |
| Lead clica em **"Agendar Diagnóstico Gratuito 1A1"** | O servidor gera a **versão técnica** naquele momento; a coluna "Solicitou 1A1" vira **Sim**, a versão técnica é gravada na col. "Relatório Consultor" e o consultor recebe o **e-mail** com ela + contatos do lead |

### Observações

- Se `APPS_SCRIPT_URL` não estiver configurada, o site continua funcionando
  normalmente — só não salva os leads (fica um aviso no log do servidor).
- Para **alterar o script** depois: edite e use **Implantar → Gerenciar
  implantações → editar (lápis) → Nova versão**. A URL não muda.
- O e-mail sai da conta Google dona do script (limite gratuito: ~100
  e-mails/dia, mais que suficiente).
