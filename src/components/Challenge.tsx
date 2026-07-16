import React from 'react';
import { motion } from 'motion/react';
import { X, TrendingUp, AlertCircle } from 'lucide-react';

export default function Challenge() {
  const problems = [
    'Atendimento lento',
    'Clientes sem retorno',
    'Processos manuais',
    'Equipe sobrecarregada',
    'Informações espalhadas',
    'Vendas perdidas',
    'Falta de indicadores',
    'Gestores apagando incêndios',
    'Crescimento desorganizado'
  ];

  return (
    <section id="desafio" className="py-20 px-6 bg-[#0d0620]/30 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9] block mb-2">
            O problema comercial comum
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight">
            O Desafio das Empresas
          </h2>
          <p className="text-base sm:text-lg italic text-[#B9AEDD] mt-3 max-w-2xl">
            A maioria das empresas perde dinheiro todos os dias sem perceber.
          </p>
        </div>

        {/* Problems Grid - Light background cards for high-contrast variation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="challenge-grid">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-[#F5F3FF] rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              <div className="w-10 h-10 min-w-[40px] rounded-full bg-[#FBE0D6] flex items-center justify-center text-[#1a1025] font-extrabold">
                <X size={18} className="text-[#E11D48]" />
              </div>
              <span className="text-[#1a1025] font-bold text-sm sm:text-base tracking-wide">
                {problem}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Result Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-[#0d0620] border border-[#5B21B6]/50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          id="challenge-result-bar"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#F0A500]/10 p-2.5 rounded-lg border border-[#F0A500]/30">
              <AlertCircle className="text-[#F0A500]" size={24} />
            </div>
            <div>
              <span className="text-[#F0A500] font-extrabold text-xs uppercase tracking-widest block">
                CONSEQUÊNCIA DIRETA
              </span>
              <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight mt-0.5 block">
                Sua empresa operando abaixo do potencial real:
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {['Mais custo.', 'Mais retrabalho.', 'Menor lucro.'].map((text, idx) => (
              <span 
                key={idx} 
                className="bg-[#1E1547] text-white font-bold text-sm sm:text-base px-5 py-2.5 rounded-xl border border-[#5B21B6]/30 shadow-md shadow-[#000]/10"
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
