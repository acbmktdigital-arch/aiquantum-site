import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface ContactProps {
  onDiagnosticClick: () => void;
}

export default function Contact({ onDiagnosticClick }: ContactProps) {
  return (
    <section id="contato" className="py-20 px-6 bg-gradient-to-b from-[#120a2e] to-[#0A0118] relative overflow-hidden">
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vh] max-w-[500px] rounded-full bg-radial from-[#F0A500]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F0A500] block mb-2">
            PRÓXIMO PASSO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight">
            Vamos Instalar Essa IA na Sua Empresa?
          </h2>
          <p className="text-base sm:text-lg italic text-[#B9AEDD] mt-3 max-w-2xl mx-auto">
            O primeiro passo é um diagnóstico gratuito de 30 minutos para mapear onde a IA gera mais retorno no seu negócio.
          </p>
        </div>

        {/* Action Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" id="contact-steps-grid">
          <div className="bg-[#1E1547] border border-[#5B21B6]/40 rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-full bg-[#F0A500] text-[#0A0118] font-serif font-extrabold text-xl flex items-center justify-center mb-6">
              1
            </div>
            <h3 className="text-lg font-sans font-bold text-white mb-2">
              Diagnóstico gratuito
            </h3>
            <p className="text-[#B9AEDD] text-sm leading-relaxed">
              Mapeamos onde sua empresa mais perde tempo e dinheiro devido a processos lentos.
            </p>
          </div>

          <div className="bg-[#1E1547] border border-[#5B21B6]/40 rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-full bg-[#F0A500] text-[#0A0118] font-serif font-extrabold text-xl flex items-center justify-center mb-6">
              2
            </div>
            <h3 className="text-lg font-sans font-bold text-white mb-2">
              Plano de instalação sob medida
            </h3>
            <p className="text-[#B9AEDD] text-sm leading-relaxed">
              Você recebe um roteiro claro de prioridades de automatização e o respectivo investimento.
            </p>
          </div>

          <div className="bg-[#1E1547] border border-[#5B21B6]/40 rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-full bg-[#F0A500] text-[#0A0118] font-serif font-extrabold text-xl flex items-center justify-center mb-6">
              3
            </div>
            <h3 className="text-lg font-sans font-bold text-white mb-2">
              IA instalada em semanas
            </h3>
            <p className="text-[#B9AEDD] text-sm leading-relaxed">
              Não meses. Começa a gerar resultado operacional e economia ainda no primeiro ciclo de teste.
            </p>
          </div>
        </div>

        {/* Centered CTA Button Card */}
        <div className="max-w-xl mx-auto" id="contact-diagnostic-form">
          <div className="bg-[#1E1547]/80 border border-[#5B21B6]/50 rounded-3xl p-8 sm:p-10 shadow-2xl relative text-center">
            <div className="absolute inset-0 bg-radial from-[#F0A500]/5 to-transparent blur-xl pointer-events-none rounded-3xl" />
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10"
            >
              <button
                onClick={onDiagnosticClick}
                id="btn-open-raiox"
                className="w-full inline-flex py-5 px-8 bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0A0118] text-base font-extrabold tracking-widest rounded-2xl transition-all shadow-xl hover:shadow-[#F0A500]/20 cursor-pointer items-center justify-center gap-3 uppercase"
              >
                FAZER DIAGNÓSTICO GRATUITO
                <ChevronRight size={20} className="animate-pulse" />
              </button>
            </motion.div>

            <p className="text-xs text-[#B9AEDD] mt-4 relative z-10">
              ⏱️ 3 minutos • 15 perguntas • Resultado na hora, 100% gratuito e sem compromisso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
