import React from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles, ArrowRight } from 'lucide-react';
import quantumIaLogo from '../assets/images/quantum_ia_logo_1783476802894.jpg';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const targetIndustries = [
    'Lojistas',
    'Empresas de serviços',
    'Indústrias',
    'Distribuidoras',
    'Prestadores de serviço',
    'Pequenas, médias e grandes empresas'
  ];

  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center justify-center py-16 px-6 overflow-hidden">
      {/* Glow Blur Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[45vw] h-[45vh] max-w-[500px] rounded-full bg-radial from-[#6D28D9]/40 to-transparent blur-3xl opacity-60 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vh] max-w-[450px] rounded-full bg-radial from-[#5B21B6]/30 to-transparent blur-3xl opacity-40 pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white leading-[1.12] tracking-tight max-w-4xl mx-auto"
          id="hero-title"
        >
          A IA que trabalha na sua empresa como seu{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0A500] via-[#E8C766] to-[#F0A500] font-sans">
            melhor funcionário
          </span>{' '}
          — 24 horas por dia
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl font-sans italic text-[#E8C766] mt-6 max-w-2xl mx-auto leading-relaxed"
          id="hero-subtitle"
        >
          Da operação manual para uma empresa inteligente, automatizada e escalável.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          id="hero-cta-actions"
        >
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#F0A500] hover:bg-[#F0A500]/90 text-[#0A0118] text-base font-extrabold tracking-wide rounded-xl shadow-lg hover:shadow-[#F0A500]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            AGENDAR DIAGNÓSTICO GRATUITO
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Ideal for tag row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-[#5B21B6]/20 max-w-4xl mx-auto"
          id="hero-ideal-for"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#B9AEDD] mb-4 flex items-center justify-center gap-2">
            IDEAL PARA
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {targetIndustries.map((industry, index) => (
              <span 
                key={index} 
                className="text-xs sm:text-sm px-4 py-2 rounded-full border border-[#5B21B6]/30 bg-[#1E1547]/40 text-white font-medium hover:border-[#F0A500]/50 transition-colors"
              >
                {industry}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
