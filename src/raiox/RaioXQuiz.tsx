import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { DynamicIcon } from "./DynamicIcon";
import { RadarChart } from "./RadarChart";
import { QUESTIONS, CATEGORIES_INFO } from "./data";
import { CategoryScores, DiagnosisResult } from "./types";

interface RaioXQuizProps {
  onClose: () => void;
}

export default function RaioXQuiz({ onClose }: RaioXQuizProps) {
  // Application State
  const [screen, setScreen] = useState<"intro" | "quiz" | "lead" | "generating" | "result">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Lead state
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");

  // Result state
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genMessage, setGeneratingMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Lock the main site scroll while the overlay is open; Esc closes it
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const currentQuestion = QUESTIONS[currentIdx];
  const totalQuestions = QUESTIONS.length;
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  // Handle number click on quiz
  const handleScoreSelect = (score: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: score }));

    // Automatically advance with a slight visual feedback delay
    setTimeout(() => {
      if (currentIdx < totalQuestions - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        // Go to lead collection before results
        setScreen("lead");
      }
    }, 280);
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadPhone) {
      setErrorMsg("Por favor, preencha todos os campos para desbloquear seu plano estratégico.");
      return;
    }
    setErrorMsg("");
    generateDiagnostic();
  };

  // Diagnostic calculations and API fetch
  const generateDiagnostic = async () => {
    setScreen("generating");
    setIsGenerating(true);

    const steps = [
      "Processando suas respostas...",
      "Consolidando métricas das 5 áreas estratégicas...",
      "Invocando IA de diagnóstico corporativo...",
      "Alinhando diretrizes de automação e crescimento...",
      "Finalizando seu relatório executivo..."
    ];

    let stepIdx = 0;
    setGeneratingMessage(steps[0]);
    const timer = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setGeneratingMessage(steps[stepIdx]);
      } else {
        clearInterval(timer);
      }
    }, 900);

    // Calculate average for each of the 5 categories
    const initialScores: CategoryScores = {
      atendimentoComunicacao: 0,
      presencaDigital: 0,
      marketingAnuncios: 0,
      processoVendas: 0,
      gestaoOperacoes: 0
    };

    const countByCategory: Record<keyof CategoryScores, number> = {
      atendimentoComunicacao: 0,
      presencaDigital: 0,
      marketingAnuncios: 0,
      processoVendas: 0,
      gestaoOperacoes: 0
    };

    QUESTIONS.forEach((q) => {
      const scoreValue = answers[q.id] || 0;
      initialScores[q.category] += scoreValue;
      countByCategory[q.category] += 1;
    });

    const categories = Object.keys(initialScores) as Array<keyof CategoryScores>;
    const finalScores = { ...initialScores };
    let sumTotal = 0;

    categories.forEach((cat) => {
      const count = countByCategory[cat] || 1;
      const averageBase10 = finalScores[cat] / count; // average out of 10
      finalScores[cat] = Math.round(averageBase10 * 10); // convert to percentage (0 - 100)
      sumTotal += finalScores[cat];
    });

    const overallAverage = Math.round(sumTotal / categories.length);

    try {
      const response = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scores: finalScores,
          answers,
          lead: { name: leadName, email: leadEmail, phone: leadPhone }
        })
      });

      const data = await response.json();
      clearInterval(timer);

      if (response.ok && data.text) {
        setResult({
          scores: finalScores,
          answers,
          aiReport: data.text,
          overallAverage
        });
        setScreen("result");
      } else {
        // Fallback local report generation if API fails or offline
        console.warn("Express endpoint error:", data.error);
        generateFallbackReport(finalScores, overallAverage);
      }
    } catch (err) {
      clearInterval(timer);
      console.error("Failed to connect to API server:", err);
      generateFallbackReport(finalScores, overallAverage);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFallbackReport = (scores: CategoryScores, overallAverage: number) => {
    // Elegant hardcoded professional report in case Gemini key is missing
    const fallbackText = `### 📊 1. Nível Geral de Maturidade Digital e Operações
Com uma pontuação média geral de **${overallAverage}%**, sua empresa está trilhando o caminho da modernização digital. No entanto, há processos manuais e vazamentos invisíveis no atendimento e no controle de vendas que estão limitando sua escala e margem de lucro. O potencial de crescimento é expressivo se implementarmos as automações corretas.

### ⚠️ 2. O Maior Gargalo Operacional (Perda de Tempo e Clientes)
Seus menores indicadores apontam um gargalo crítico em Atendimento e Processos de Vendas. Sem um funil automatizado ou um fluxo de follow-up ágil (através de IA e CRM), os leads frios ou sem retorno acabam esquecidos, resultando em dinheiro deixado na mesa todos os meses.

### 🚀 3. Plano de Ação Estratégico (3 Passos de Impacto)
1. **Centralização e Automação de Atendimento**: Instale uma IA integrada ao seu WhatsApp para triagem e suporte imediato, garantindo respostas rápidas 24/7.
2. **Estruturação de Funil de Vendas (CRM)**: Abandone anotações informais. Use um pipeline de vendas integrado para saber exatamente em qual etapa cada cliente está e fazer follow-up sistemático.
3. **Automação de Rotinas e Estoque**: Conecte suas planilhas de estoque e finanças a um painel simples de indicadores, automatizando lembretes de reposição de produtos e alertas de faturamento.`;

    setResult({
      scores,
      answers,
      aiReport: fallbackText,
      overallAverage
    });
    setScreen("result");
  };

  // Registra o pedido de sessão 1A1: marca o lead na planilha e o
  // consultor recebe o relatório por e-mail. Não bloqueia a abertura
  // do WhatsApp (fire-and-forget com keepalive).
  const handleAgendar1a1 = () => {
    if (!result) return;
    fetch("/api/agendar-1a1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        lead: { name: leadName, email: leadEmail, phone: leadPhone },
        overallAverage: result.overallAverage,
        report: result.aiReport
      })
    }).catch((err) => console.warn("Falha ao registrar pedido de 1A1:", err));
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setResult(null);
    setScreen("intro");
    setErrorMsg("");
  };

  // Custom parser to translate markdown headings, bold text, and lists into gorgeous styling
  const renderFormattedReport = (text?: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={idx} className="text-xl font-display font-bold text-blue-400 mt-6 mb-3 border-b border-zinc-800 pb-1">
            {trimmed.replace("###", "").trim()}
          </h4>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={idx} className="text-2xl font-display font-extrabold text-white mt-7 mb-4">
            {trimmed.replace("##", "").trim()}
          </h3>
        );
      }
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        const listContent = trimmed.substring(1).trim();
        return (
          <li key={idx} className="ml-5 list-disc text-slate-300 mb-2 leading-relaxed font-sans text-sm">
            {renderBoldText(listContent)}
          </li>
        );
      }
      if (/^\d+\./.test(trimmed)) {
        // Starts with number list
        return (
          <div key={idx} className="pl-2 my-3 text-slate-300 leading-relaxed font-sans text-sm">
            {renderBoldText(trimmed)}
          </div>
        );
      }
      if (trimmed === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-slate-300 mb-3 leading-relaxed font-sans text-sm text-justify">
          {renderBoldText(trimmed)}
        </p>
      );
    });
  };

  // Helper to parse **bold** text in lines
  const renderBoldText = (txt: string) => {
    const parts = txt.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <strong key={i} className="text-white font-semibold">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  // Get dynamic level text & colors based on overall score
  const getMaturityBadge = (avg: number) => {
    if (avg < 50) {
      return {
        title: "Operação Tradicional / Manual",
        desc: "Sua empresa ainda possui muitos gargalos operacionais e processos manuais que limitam seu faturamento potencial e consomem muito do seu tempo.",
        color: "from-blue-600 to-cyan-500",
        bg: "bg-blue-500/15 text-blue-400 stroke-blue-500 border-blue-500/20"
      };
    } else if (avg < 85) {
      return {
        title: "Operação em Digitalização",
        desc: "Sua empresa já deu os primeiros passos em processos digitais, mas ainda restam vazamentos e falta de automação estratégica (IA e CRM) para escalar as vendas.",
        color: "from-[#2563EB] to-blue-500",
        bg: "bg-blue-500/15 text-blue-400 stroke-[#2563EB] border-blue-500/20"
      };
    } else {
      return {
        title: "Empresa Inteligente e de Alta Performance",
        desc: "Parabéns! Sua empresa opera no mais alto nível de eficiência digital, com processos automatizados, ótimo acompanhamento de indicadores e vendas integradas.",
        color: "from-[#F0A500] to-amber-500",
        bg: "bg-amber-500/15 text-amber-400 stroke-[#F0A500] border-amber-500/20"
      };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-[#121314] text-slate-100 font-sans selection:bg-[#2563EB]/20 overflow-y-auto overflow-x-hidden"
      id="raiox-overlay"
    >
      <div className="min-h-full relative flex flex-col justify-between">
        {/* Decorative ambient background glowing orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-radial from-[#2563EB]/10 to-transparent blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-[10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-radial from-blue-500/5 to-transparent blur-3xl pointer-events-none z-0" />

        {/* Main Container */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 z-10 flex-grow">

          {/* Header Branding */}
          <header className="flex items-center justify-between pb-6 border-b border-zinc-800 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] p-[2px] flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-zinc-900 rounded-[6px] flex items-center justify-center font-display font-black text-lg text-[#2563EB]">
                  RX
                </div>
              </div>
              <div>
                <span className="font-display font-extrabold text-sm tracking-wider text-white block">RAIO-X</span>
                <span className="text-[10px] text-slate-400 tracking-widest font-mono uppercase block">Maturidade Digital & Operações</span>
              </div>
            </div>

            <button
              onClick={onClose}
              id="btn-close-raiox"
              aria-label="Fechar diagnóstico e voltar ao site"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-zinc-800 text-slate-400 bg-zinc-900/60 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
            >
              <span className="hidden sm:inline">Voltar ao site</span>
              <X size={16} />
            </button>
          </header>

          {/* Dynamic Screens */}
          <AnimatePresence mode="wait">
            {/* INTRO SCREEN */}
            {screen === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-12 gap-8 items-center pt-2 sm:pt-6"
                id="rx-intro-screen"
              >
                <div className="md:col-span-7 flex flex-col gap-6">
                  <div className="inline-flex self-start px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest">
                    Mapeamento de Elite
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white leading-tight tracking-tight">
                    Quanto Dinheiro Sua Empresa Está Perdendo Por Excesso de Trabalho Manual e Falta de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-indigo-400 to-[#E8C766]">Inteligência Artificial?</span>
                  </h1>
                  <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
                    Descubra em 3 minutos onde seu atendimento, site, marketing, processos de vendas e gestão estão te fazendo perder clientes e faturamento — e receba um plano de ação gerado por Inteligência Artificial pra corrigir isso.
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-4 my-2">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 font-bold text-sm">✓</div>
                      <div>
                        <h4 className="font-semibold text-sm text-slate-100">Veja exatamente onde você está sangrando dinheiro</h4>
                        <p className="text-xs text-slate-400">Radar visual mostra em segundos os pontos fracos das 5 áreas que mais custam caro no seu negócio.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 font-bold text-sm">✓</div>
                      <div>
                        <h4 className="font-semibold text-sm text-slate-100">Descubra o gargalo que está travando suas vendas</h4>
                        <p className="text-xs text-slate-400">Identifique com precisão onde você perde tempo com tarefa manual e onde perde venda por demora no atendimento.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 font-bold text-sm">✓</div>
                      <div>
                        <h4 className="font-semibold text-sm text-slate-100">Receba um plano de ação pronto, feito por IA</h4>
                        <p className="text-xs text-slate-400">Recomendações específicas pra digitalizar e escalar sua operação — sem enrolação, sem termo técnico.</p>
                      </div>
                    </div>
                  </div>

                  {/* Repositioned Citation */}
                  <div className="border-l-4 border-amber-500 pl-4 py-1.5 bg-zinc-900/60 rounded-r-lg mt-2">
                    <p className="text-sm italic text-slate-300 leading-relaxed">
                      "O primeiro passo pra escalar seu negócio com eficiência é descobrir quais processos estão gerando custo oculto e onde você está deixando dinheiro na mesa."
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 mt-2">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <button
                        onClick={() => setScreen("quiz")}
                        id="btn-start-quiz"
                        className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:brightness-105 active:scale-95 text-white font-bold text-base py-4 px-8 rounded-xl shadow-lg shadow-blue-500/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        Fazer Meu Raio-X Agora
                        <DynamicIcon name="ArrowRight" size={18} />
                      </button>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      ⏱️ 3 minutos • 15 perguntas • Resultado na hora, direto no seu WhatsApp ou Aqui ! Sem compromisso.
                    </p>
                  </div>
                </div>

                {/* Side Card Mockup */}
                <div className="md:col-span-5 relative flex items-center justify-center">
                  <div className="w-full max-w-[360px] bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-800 relative overflow-hidden shadow-xl">
                    {/* Glowing effects */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#2563EB]/5 rounded-full blur-xl" />

                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs text-blue-400 font-mono tracking-widest uppercase font-bold">Diagnóstico Raio-X</span>
                      <span className="text-xs bg-zinc-950 text-slate-300 px-2.5 py-0.5 rounded-full border border-zinc-800 font-mono">5 Áreas</span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-2.5 bg-zinc-950/40 rounded-xl border border-zinc-800/40">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-slate-300 font-medium">Atendimento e Comunicação</span>
                          <span className="text-[#2563EB] font-mono font-bold">34%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full">
                          <div className="bg-[#2563EB] h-1.5 rounded-full" style={{ width: "34%" }} />
                        </div>
                      </div>
                      <div className="p-2.5 bg-zinc-950/40 rounded-xl border border-zinc-800/40">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-slate-300 font-medium">Presença Digital e Site</span>
                          <span className="text-amber-500 font-mono font-bold">17%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full">
                          <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "17%" }} />
                        </div>
                      </div>
                      <div className="p-2.5 bg-zinc-950/40 rounded-xl border border-zinc-800/40">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-slate-300 font-medium">Marketing e Anúncios</span>
                          <span className="text-pink-500 font-mono font-bold">3%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full">
                          <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: "3%" }} />
                        </div>
                      </div>
                      <div className="p-2.5 bg-zinc-950/40 rounded-xl border border-zinc-800/40">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-slate-300 font-medium">Processos e Automação</span>
                          <span className="text-[#10B981] font-mono font-bold">45%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full">
                          <div className="bg-[#10B981] h-1.5 rounded-full" style={{ width: "45%" }} />
                        </div>
                      </div>
                      <div className="p-2.5 bg-zinc-950/40 rounded-xl border border-zinc-800/40">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-slate-300 font-medium">Gestão e Follow-up</span>
                          <span className="text-indigo-400 font-mono font-bold">28%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full">
                          <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: "28%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* QUIZ SCREEN */}
            {screen === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-3xl mx-auto"
                id="rx-quiz-screen"
              >
                {/* Progress & Category Information Header */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono uppercase tracking-wider font-semibold">
                  <span>Área de Análise {currentIdx + 1}/{totalQuestions}</span>
                  <span>{progressPercent}% Completo</span>
                </div>
                <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-8 border border-zinc-700/30">
                  <div
                    className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(37,99,235,0.2)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Category Container */}
                <div className="bg-[#1C1D1F] rounded-2xl p-6 sm:p-8 border border-zinc-800 relative overflow-hidden shadow-2xl mb-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-sm shrink-0">
                      <DynamicIcon name={CATEGORIES_INFO[currentQuestion.category].icon} size={24} />
                    </div>
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-1 font-bold">
                        {currentQuestion.categoryName}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {CATEGORIES_INFO[currentQuestion.category].description}
                      </p>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="my-6">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                      {currentQuestion.text}
                    </h2>
                    <p className="text-xs text-blue-400 mt-3 italic bg-blue-500/5 px-3 py-1.5 rounded-lg border border-blue-500/10 inline-block">
                      💡 {currentQuestion.helperText}
                    </p>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="mt-8 space-y-3">
                    {currentQuestion.options.map((opt, i) => {
                      const isSelected = answers[currentQuestion.id] === opt.score;
                      return (
                        <button
                          key={i}
                          onClick={() => handleScoreSelect(opt.score)}
                          id={`option-btn-${i}`}
                          className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                            isSelected
                              ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-[#FFFFFF] border-transparent scale-[1.01] shadow-lg shadow-blue-500/10"
                              : "bg-zinc-900/60 text-slate-300 border-zinc-800 hover:border-blue-500/40 hover:text-white hover:bg-zinc-800/80"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border text-xs font-bold font-mono ${
                            isSelected
                              ? "bg-[#FFFFFF] text-[#2563EB] border-transparent"
                              : "border-zinc-700 text-slate-400"
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className="flex-grow leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrev}
                    disabled={currentIdx === 0}
                    id="btn-prev-question"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono border transition-all ${
                      currentIdx === 0
                        ? "opacity-35 cursor-not-allowed border-zinc-900 text-slate-500 bg-zinc-950"
                        : "border-zinc-800 text-slate-300 bg-zinc-900/60 hover:text-white hover:border-zinc-700 cursor-pointer"
                    }`}
                  >
                    <DynamicIcon name="ArrowLeft" size={14} />
                    Anterior
                  </button>
                  <div className="text-xs font-mono text-slate-400">
                    Sessão Raio-X • 1A1
                  </div>
                </div>
              </motion.div>
            )}

            {/* LEAD SCREEN (GATE) */}
            {screen === "lead" && (
              <motion.div
                key="lead"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-md mx-auto"
                id="rx-lead-screen"
              >
                <div className="bg-[#1C1D1F] rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl" />

                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-3 shadow-sm">
                      <DynamicIcon name="Lock" size={20} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white">Diagnóstico Concluído!</h2>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Insira seus dados profissionais abaixo para processar suas métricas corporativas e gerar seu relatório estratégico exclusivo de Inteligência Artificial.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 font-bold">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="Ex: Amanda Silva"
                        id="input-lead-name"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:bg-zinc-950 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 font-bold">
                        Seu Melhor E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="amanda@exemplo.com.br"
                        id="input-lead-email"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:bg-zinc-950 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 font-bold">
                        Seu WhatsApp para Contato *
                      </label>
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="(11) 99999-9999"
                        id="input-lead-phone"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:bg-zinc-950 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 transition-all font-sans"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs text-red-200">
                        ⚠️ {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      id="btn-submit-lead"
                      className="w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:brightness-110 active:scale-95 text-white font-bold text-sm py-3.5 rounded-xl mt-3 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
                    >
                      Desbloquear Meu Diagnóstico Completo
                    </button>
                  </form>

                </div>
              </motion.div>
            )}

            {/* GENERATING / LOADING SCREEN */}
            {screen === "generating" && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-center max-w-md mx-auto py-12"
                id="rx-generating-screen"
              >
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="w-24 h-24 rounded-full border border-blue-500/10 absolute animate-ping" />
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] p-[3px] animate-spin">
                    <div className="w-full h-full bg-[#121314] rounded-[10px]" />
                  </div>
                  <div className="absolute font-display font-black text-xl text-[#2563EB] animate-pulse">
                    AI
                  </div>
                </div>

                <h2 className="text-2xl font-display font-bold text-white tracking-tight mb-3">
                  Calculando Seus Indicadores
                </h2>
                <div className="text-xs text-slate-300 font-mono max-w-sm mx-auto h-12 flex items-center justify-center leading-normal animate-pulse px-4">
                  {genMessage}
                </div>

                {/* Fake progress grid to feel premium */}
                <div className="grid grid-cols-7 gap-1 max-w-[200px] mx-auto mt-6">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 bg-zinc-800 rounded-full overflow-hidden"
                    >
                      <div
                        className="bg-[#2563EB] h-full"
                        style={{
                          animation: `pulse 1.2s infinite ease-in-out ${i * 0.15}s`
                        }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RESULTS SCREEN */}
            {screen === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
                id="rx-results-screen"
              >
                {/* Top Banner and General Score */}
                <div className="bg-[#1C1D1F] border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl" />

                  {/* Visual Score Ring */}
                  <div className="shrink-0 relative flex items-center justify-center">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="54" stroke="rgba(63, 63, 70, 0.4)" strokeWidth="8" fill="transparent" />
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        stroke="#2563EB"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 54}
                        strokeDashoffset={2 * Math.PI * 54 * (1 - result.overallAverage / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-mono font-black text-white tracking-tighter">
                        {result.overallAverage}%
                      </span>
                      <span className="text-[10px] text-slate-400 tracking-widest font-mono uppercase font-semibold">
                        Índice Geral
                      </span>
                    </div>
                  </div>

                  {/* Maturity information text */}
                  <div className="flex-grow text-center md:text-left space-y-2">
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold border uppercase ${getMaturityBadge(result.overallAverage).bg}`}>
                      🏆 {getMaturityBadge(result.overallAverage).title}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                      Seu Diagnóstico de Maturidade Raio-X
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-light">
                      {getMaturityBadge(result.overallAverage).desc}
                    </p>
                  </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid md:grid-cols-12 gap-8">

                  {/* Column 1: SVG Radar Chart and Area Table */}
                  <div className="md:col-span-5 flex flex-col gap-6">
                    {/* Radar Chart Card */}
                    <div className="bg-[#1C1D1F] rounded-2xl p-6 border border-zinc-800 shadow-xl flex flex-col items-center">
                      <h3 className="text-sm font-mono tracking-widest text-blue-400 uppercase mb-4 text-center font-bold">
                        🕸️ Teia de Posicionamento Atual
                      </h3>
                      <RadarChart scores={result.scores} />
                    </div>

                    {/* Quantitative Score List Table */}
                    <div className="bg-[#1C1D1F] rounded-2xl p-6 border border-zinc-800 shadow-xl">
                      <h3 className="text-sm font-mono tracking-widest text-white uppercase mb-4 font-bold">
                        📊 Métricas Consolidadas por Área
                      </h3>
                      <div className="space-y-3.5">
                        {(Object.keys(result.scores) as Array<keyof CategoryScores>).map((key) => {
                          const score = result.scores[key];
                          const info = CATEGORIES_INFO[key];
                          return (
                            <div key={key} className="space-y-1">
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-300 flex items-center gap-1.5 font-semibold">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full inline-block"
                                    style={{ backgroundColor: info.color }}
                                  />
                                  {info.name}
                                </span>
                                <span className="font-mono text-slate-100 font-bold">{score}%</span>
                              </div>
                              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-850">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: `${score}%`,
                                    backgroundColor: info.color
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Personalised AI Action Plan */}
                  <div className="md:col-span-7 space-y-6">
                    {/* AI Report Card */}
                    <div className="bg-[#1C1D1F] rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl relative overflow-hidden">
                      <div className="prose prose-slate max-w-none">
                        {renderFormattedReport(result.aiReport)}
                      </div>
                    </div>

                    {/* Consultation Booking & CTA */}
                    <div className="bg-gradient-to-br from-zinc-900 via-[#1C1D1F] to-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-center sm:text-left space-y-5">
                      {/* Pulsing Gold Glow */}
                      <div className="absolute top-[-50%] left-[-50%] w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
                          <DynamicIcon name="MessageCircle" size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-display font-extrabold text-white">
                            Gostaria de Analisar Esses Números Comigo de Graça?
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 font-light">
                            Agende uma <strong className="font-semibold text-slate-200">Sessão 1A1 Gratuita de Diagnóstico</strong> de 30 minutos via Zoom/WhatsApp.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                        <a
                          href={`https://wa.me/5511954993098?text=Olá! Acabei de realizar o meu Mapeamento Raio-X de Maturidade Digital e obtive um índice geral de ${result.overallAverage}%. Gostaria de agendar minha sessão estratégica gratuita de 30 minutos.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleAgendar1a1}
                          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10 transition-all font-sans hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Agendar Diagnóstico Gratuito 1A1
                          <DynamicIcon name="ChevronRight" size={16} />
                        </a>
                        <button
                          onClick={handleRestart}
                          className="text-slate-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 font-bold text-xs py-3 px-5 rounded-xl transition-all cursor-pointer font-sans"
                        >
                          Refazer Questionário
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer copyright */}
        <footer className="w-full border-t border-zinc-800 py-6 px-4 mt-12 bg-[#121314]/80 backdrop-blur-md z-10">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center text-xs text-slate-400 gap-4">
            <div className="font-mono text-[10px] text-center">
              © {new Date().getFullYear()} • AI QUANTUM • TODOS OS DIREITOS RESERVADOS
            </div>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}
