import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Database, 
  Megaphone, 
  Wallet, 
  UserCheck, 
  TrendingUp 
} from 'lucide-react';

export default function Tools() {
  const tools = [
    {
      title: 'IA de atendimento',
      icon: MessageSquare,
      desc: 'Responde no WhatsApp na hora, inclusive à noite e fim de semana, com base nos produtos e políticas reais da empresa.'
    },
    {
      title: 'Cadastro de clientes sempre em dia',
      icon: Database,
      desc: 'Cada conversa vira registro organizado: histórico do cliente, etapa da venda e próximo passo, sem depender de planilha.'
    },
    {
      title: 'Marketing',
      icon: Megaphone,
      desc: 'Gera posts, campanhas e mensagens de reativação automaticamente, a partir do que a empresa já vende.'
    },
    {
      title: 'Financeiro',
      icon: Wallet,
      desc: 'Envia cobranças automaticamente, atualiza status de pagamento e gera relatório de fluxo de caixa em tempo real.'
    },
    {
      title: 'RH',
      icon: UserCheck,
      desc: 'Faz a triagem inicial de candidatos, agenda entrevistas e conduz o onboarding de novos funcionários.'
    },
    {
      title: 'Gestão',
      icon: TrendingUp,
      desc: 'Reúne os números de todos os setores num painel único, com alertas quando algo sai do esperado.'
    }
  ];

  return (
    <section id="ferramentas" className="py-20 px-6 bg-[#0d0620]/30 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9] block mb-2">
            NA PRÁTICA
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight">
            O Que Isso Significa na Prática
          </h2>
          <p className="text-base sm:text-lg italic text-[#B9AEDD] mt-3 max-w-2xl mx-auto">
            Cada parte do ecossistema resolve um problema concreto do dia a dia.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="tools-grid">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-[#1E1547] border border-[#5B21B6]/30 rounded-2xl p-6 sm:p-8 hover:border-[#F0A500]/50 transition-all duration-350 hover:-translate-y-1 shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#5B21B6]/15 border border-[#5B21B6]/35 flex items-center justify-center text-[#F0A500] group-hover:bg-[#F0A500]/10 group-hover:border-[#F0A500]/40 transition-all mb-6">
                  <Icon size={24} />
                </div>
                
                <h3 className="text-lg sm:text-xl font-sans font-bold text-[#F0A500] tracking-tight mb-3">
                  {tool.title}
                </h3>
                
                <p className="text-[#B9AEDD] text-sm sm:text-base leading-relaxed">
                  {tool.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
