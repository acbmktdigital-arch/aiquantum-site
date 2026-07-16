import React from 'react';
import { motion } from 'motion/react';
import { Check, Brain, HelpCircle, HardDrive, ShieldCheck, Heart } from 'lucide-react';

export default function AILearns() {
  const knowledgeItems = [
    'Produtos e serviços',
    'Políticas comerciais',
    'Processos internos',
    'Perguntas frequentes',
    'Histórico de clientes',
    'Documentação',
    'Treinamentos',
    'Procedimentos da empresa'
  ];

  return (
    <section id="ia" className="py-20 px-6 bg-[#0A0118] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F0A500] block mb-2">
            CONHECIMENTO PROFUNDO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight">
            IA que Aprende como Sua Empresa Funciona
          </h2>
          <p className="text-base sm:text-lg italic text-[#B9AEDD] mt-3 max-w-2xl mx-auto">
            Transforme o conhecimento acumulado da sua empresa em um ativo digital ativo 24/7.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch" id="ailearns-container">
          
          {/* Left Panel: Animated Knowledge Brain Grid & description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0d0620] border border-[#5B21B6]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-8 shadow-xl"
          >
            {/* Visual Brain Animation */}
            <div className="relative h-48 bg-[#1E1547]/50 rounded-2xl border border-[#5B21B6]/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#5B21B6]/10 to-[#F0A500]/10 pointer-events-none" />
              
              {/* Dynamic node network */}
              <div className="flex items-center gap-6 relative z-10">
                <motion.div 
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-20 h-20 rounded-full bg-[#6D28D9]/20 border border-[#F0A500] flex items-center justify-center text-[#F0A500] shadow-lg shadow-[#6D28D9]/30"
                >
                  <Brain size={36} className="animate-pulse" />
                </motion.div>
                <div className="flex flex-col gap-2">
                  <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: [-100, 150] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      className="h-full w-12 bg-gradient-to-r from-transparent via-[#F0A500] to-transparent" 
                    />
                  </div>
                  <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: [120, -100] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="h-full w-8 bg-gradient-to-r from-transparent via-[#6D28D9] to-transparent" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white font-bold text-base sm:text-lg leading-relaxed">
                A IA aprende seus processos, produtos, serviços e forma de atender, moldando-se à identidade da sua marca.
              </p>
              <div className="pt-4 border-t border-[#5B21B6]/30">
                <p className="text-[#E8C766] font-sans italic text-sm sm:text-base leading-relaxed">
                  Resultando em um atendimento rápido, padronizado e disponível 24 horas por dia para seus clientes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Interactive Checklist with High Contrast Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B9AEDD] mb-4 block">
                CONHECIMENTO MAPEADO
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#F0A500] mb-6">
                Tudo o que a IA pode memorizar e operar:
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {knowledgeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F5F3FF] rounded-xl p-4 flex items-center gap-3 shadow-md hover:scale-[1.01] transition-transform duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#6D28D9] flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-[#1a1025] font-bold text-xs sm:text-sm tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-8 pt-6 border-t border-[#5B21B6]/20 flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2 text-xs text-[#B9AEDD]">
                <ShieldCheck size={16} className="text-[#F0A500]" />
                <span>LGPD e Segurança de Dados inclusos</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#B9AEDD]">
                <Heart size={16} className="text-red-400" />
                <span>Tom de voz humanizado e amigável</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
