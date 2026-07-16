import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Target, 
  Sliders, 
  Megaphone, 
  TrendingUp, 
  Layers, 
  DollarSign,
  Cpu
} from 'lucide-react';

interface EcosystemNode {
  label: string;
  angle: number; // degrees
  icon: React.ComponentType<any>;
  impact: string;
  description: string;
}

export default function Ecosystem() {
  const [selectedNode, setSelectedNode] = useState<number>(2); // Default selected: WhatsApp

  const nodes: EcosystemNode[] = [
    { 
      label: 'RH', 
      angle: 0, 
      icon: Users,
      impact: 'Triagem de currículos & Onboarding',
      description: 'A IA conversa com candidatos no WhatsApp, faz a pré-avaliação do currículo, e conduz o fluxo inicial de integração e guias de políticas da empresa.'
    },
    { 
      label: 'Relatórios', 
      angle: 40, 
      icon: FileText,
      impact: 'Relatórios Gerenciais Automáticos',
      description: 'Chega de cruzar planilhas. A IA compila as métricas de vendas, suporte e finanças, enviando resumos mastigados direto no seu e-mail ou Slack.'
    },
    { 
      label: 'WhatsApp', 
      angle: 80, 
      icon: MessageSquare,
      impact: 'Atendimento e Suporte 24/7',
      description: 'Atendimento imediato para cada lead ou cliente. A IA responde de forma natural, consulta estoque, passa informações e faz pré-agendamentos.'
    },
    { 
      label: 'Clientes', 
      angle: 120, 
      icon: Target,
      impact: 'Funil de Vendas Automatizado',
      description: 'A IA registra as interações de forma automática, atualiza a etapa do lead, agenda tarefas para vendedores e faz o follow-up preventivo de propostas.'
    },
    { 
      label: 'Gestão', 
      angle: 160, 
      icon: Sliders,
      impact: 'Central de Operação Inteligente',
      description: 'Controle centralizado da sua operação com indicadores atualizados. Você é avisado imediatamente sobre gargalos e anomalias.'
    },
    { 
      label: 'Marketing', 
      angle: 200, 
      icon: Megaphone,
      impact: 'Conteúdo & Nutrição Personalizada',
      description: 'Criação de copys para campanhas, segmentação inteligente de listas e mensagens personalizadas para reativar clientes inativos.'
    },
    { 
      label: 'Comercial', 
      angle: 240, 
      icon: TrendingUp,
      impact: 'Qualificação Instantânea',
      description: 'A IA recebe o contato do anúncio, entende o perfil, as necessidades e o orçamento do lead, e passa para o seu vendedor apenas os prontos para fechar.'
    },
    { 
      label: 'Operações', 
      angle: 280, 
      icon: Layers,
      impact: 'Orquestração de Processos',
      description: 'Padronize a passagem de bastão entre setores. Assim que a venda é feita, a IA aciona o financeiro, o estoque e a equipe de entrega.'
    },
    { 
      label: 'Financeiro', 
      angle: 320, 
      icon: DollarSign,
      impact: 'Conciliação e Cobranças de IA',
      description: 'Lembretes de vencimento amigáveis, emissão automática de boletos e pix, e baixa imediata no seu sistema com alertas de inadimplência.'
    }
  ];

  // Helper to calculate coordinates
  const radius = 220; // radius of the circle in px for desktop

  return (
    <section id="ecossistema" className="py-20 px-6 bg-[#0A0118] relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-[#5B21B6]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F0A500] block mb-2">
            CONECTIVIDADE TOTAL
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight">
            O Ecossistema da Empresa Inteligente
          </h2>
          <p className="text-base sm:text-lg italic text-[#B9AEDD] mt-3 max-w-2xl mx-auto">
            Tudo conectado em uma única operação inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left/Middle Column: Interactive Radial Diagram (Hidden/Adjusted on small screens) */}
          <div className="lg:col-span-7 flex justify-center items-center h-[540px] relative order-2 lg:order-1" id="ecosystem-interactive-diagram">
            
            {/* Desktop Visual Radial Map (md+) */}
            <div className="hidden sm:block relative w-[500px] h-[500px]">
              
              {/* Outer boundary circle line */}
              <div className="absolute inset-0 rounded-full border border-[#5B21B6]/20 pointer-events-none" />
              <div className="absolute inset-[60px] rounded-full border border-[#5B21B6]/15 pointer-events-none" />
              
              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-36 h-36 rounded-full bg-[#1E1547] border-4 border-[#F0A500] flex flex-col items-center justify-center text-center p-4 shadow-2xl shadow-[#5B21B6]/50">
                  <Cpu className="text-[#F0A500] mb-1 animate-pulse" size={28} />
                  <span className="font-serif font-extrabold text-sm text-white tracking-wide leading-tight">
                    SUA EMPRESA
                  </span>
                  <span className="text-[9px] uppercase font-bold text-[#B9AEDD] mt-0.5 tracking-wider">
                    INTELIGENTE
                  </span>
                </div>
              </div>

              {/* Radial Nodes */}
              {nodes.map((node, index) => {
                const angleRad = (node.angle * Math.PI) / 180;
                const x = radius * Math.cos(angleRad);
                const y = radius * Math.sin(angleRad);
                const IconComponent = node.icon;
                const isSelected = selectedNode === index;

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedNode(index)}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      top: '50%',
                      left: '50%'
                    }}
                    className={`absolute z-30 p-1 rounded-full cursor-pointer flex flex-col items-center justify-center transition-all duration-300 ${
                      isSelected 
                        ? 'scale-110' 
                        : 'hover:scale-105'
                    }`}
                    aria-label={`Departamento: ${node.label}`}
                  >
                    <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-[#6D28D9] border-2 border-[#F0A500] text-white shadow-lg shadow-[#F0A500]/40' 
                        : 'bg-[#1E1547] border border-[#5B21B6]/40 text-[#B9AEDD] hover:text-white hover:border-[#6D28D9]'
                    }`}>
                      <IconComponent size={20} className={isSelected ? 'text-[#F0A500]' : ''} />
                      <span className="text-[10px] font-bold mt-1 tracking-wide">{node.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Layout (Strict list with 44px+ tap targets) */}
            <div className="sm:hidden w-full flex flex-wrap justify-center gap-3" id="ecosystem-mobile-grid">
              {nodes.map((node, index) => {
                const IconComponent = node.icon;
                const isSelected = selectedNode === index;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedNode(index)}
                    className={`min-h-[44px] flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      isSelected 
                        ? 'bg-[#6D28D9] border-[#F0A500] text-white shadow-md' 
                        : 'bg-[#1E1547] border-[#5B21B6]/30 text-[#B9AEDD]'
                    }`}
                  >
                    <IconComponent size={16} />
                    {node.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Explanatory / Active info block */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-[#1E1547]/80 border border-[#5B21B6]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative min-h-[280px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#F0A500]/10 border border-[#F0A500]/30 flex items-center justify-center text-[#F0A500]">
                    {React.createElement(nodes[selectedNode].icon, { size: 24 })}
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold text-[#F0A500] tracking-widest block">
                      DEPARTAMENTO SELECIONADO
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white tracking-tight mt-0.5">
                      {nodes[selectedNode].label}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#B9AEDD] tracking-wider block">
                      IMPACTO DIRETO DA IA
                    </span>
                    <p className="text-[#E8C766] font-bold text-base sm:text-lg mt-1">
                      {nodes[selectedNode].impact}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs uppercase font-bold text-[#B9AEDD] tracking-wider block">
                      COMO FUNCIONA NA PRÁTICA
                    </span>
                    <p className="text-gray-200 text-sm leading-relaxed mt-1">
                      {nodes[selectedNode].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive tooltip helper */}
              <div className="mt-8 pt-4 border-t border-[#5B21B6]/20 flex items-center justify-between text-xs text-[#B9AEDD]">
                <span>Clique em outro setor para ver como a IA atua.</span>
                <span className="font-mono text-[#F0A500] font-bold">
                  {selectedNode + 1} / {nodes.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
