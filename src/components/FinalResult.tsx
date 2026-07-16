import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield } from 'lucide-react';

export default function FinalResult() {
  const outcomes = [
    'Atendimento 24 horas',
    'Processos inteligentes',
    'Clientes mais satisfeitos',
    'Equipe mais produtiva',
    'Menos retrabalho',
    'Mais controle',
    'Mais vendas',
    'Mais lucro'
  ];

  return (
    <section id="final" className="py-20 px-6 bg-[#0A0118] relative">
      <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vh] max-w-[400px] rounded-full bg-radial from-[#5B21B6]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F0A500] block mb-2">
            PANORAMA GERAL
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight">
            O Resultado Final
          </h2>
        </div>

        {/* Large Quote block */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-2xl font-sans italic text-[#B9AEDD] mb-12 max-w-4xl leading-relaxed"
          id="final-quote"
        >
          <span className="text-[#E8C766] font-extrabold not-italic block sm:inline mr-2">
            A IA não substitui pessoas.
          </span>
          Ela elimina as tarefas operacionais repetitivas e cansativas para que sua equipe foque no relacionamento estratégico, criatividade e fechamento que geram valor real para o negócio.
        </motion.p>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="final-grid">
          {outcomes.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-[#0d0620] border border-[#5B21B6]/30 hover:border-[#F0A500]/40 rounded-xl p-4 sm:p-5 flex items-center gap-3 transition-colors duration-300"
            >
              <CheckCircle2 size={18} className="text-[#F0A500] shrink-0" />
              <span className="text-white font-bold text-xs sm:text-sm tracking-wide">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Closing Line */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-[#E8C766] font-sans italic text-sm sm:text-base leading-relaxed max-w-3xl border-l-2 border-[#F0A500] pl-6"
          id="final-closing-line"
        >
          Empresas que utilizam IA trabalham de forma muito mais inteligente, crescem com maior previsibilidade financeira e operacional e constroem bases sólidas preparadas para os desafios do futuro do mercado.
        </motion.p>
      </div>
    </section>
  );
}
