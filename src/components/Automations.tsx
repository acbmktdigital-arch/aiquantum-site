import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';

export default function Automations() {
  const automations = [
    'Responder o primeiro contato do cliente na hora',
    'Saber quais clientes estão prontos pra comprar',
    'Montar orçamento sem começar do zero',
    'Marcar horário sem trocar 10 mensagens',
    'Lembrar de retomar contato com quem não respondeu',
    'Cobrar quem está atrasado sem constrangimento',
    'Manter o cadastro de clientes sempre atualizado',
    'Ver o resumo do mês sem montar planilha',
    'Saber se o cliente ficou satisfeito',
    'Voltar a vender pra quem já comprou antes',
    'Lembrar compromissos sem depender da memória',
    'Saber quem vai fazer o quê, sem confusão'
  ];

  return (
    <section id="automacoes" className="py-20 px-6 bg-[#0d0620]/30 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9] block mb-2">
            Seu tempo de volta
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight">
            O Que Você Para de Fazer na Mão
          </h2>
          <p className="text-base sm:text-lg italic text-[#B9AEDD] mt-3 max-w-2xl mx-auto">
            Tarefas que hoje tomam seu tempo (ou o da sua equipe) passam a acontecer sozinhas.
          </p>
        </div>

        {/* High Contrast Automations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="automations-grid">
          {automations.map((auto, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="bg-[#F5F3FF] rounded-xl p-5 flex items-center gap-3.5 shadow-md hover:scale-[1.015] hover:shadow-lg transition-all duration-300"
            >
              {/* Check gold circle */}
              <div className="w-8 h-8 rounded-full bg-[#F0A500] flex items-center justify-center text-[#0A0118] shrink-0 font-extrabold shadow-sm">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="text-[#1a1025] font-bold text-sm sm:text-base tracking-wide">
                {auto}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Result Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-[#0A0118] border border-[#5B21B6]/50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          id="automations-result-row"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#6D28D9]/10 p-2.5 rounded-lg border border-[#6D28D9]/30 text-[#F0A500]">
              <Sparkles size={24} />
            </div>
            <div>
              <span className="text-[#6D28D9] font-extrabold text-xs uppercase tracking-widest block">
                METAS ALCANÇADAS
              </span>
              <span className="text-white font-extrabold text-base sm:text-lg tracking-tight mt-0.5 block">
                O que sua empresa ganha no curto prazo:
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {['Mais tempo livre.', 'Menos custo.', 'Mais vendas.'].map((text, idx) => (
              <span 
                key={idx} 
                className="bg-[#1E1547] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#5B21B6]/30"
              >
                {text}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
