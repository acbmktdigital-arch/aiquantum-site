import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Benefits() {
  const categories = [
    {
      title: 'Pequenas empresas',
      items: [
        'Mais organização',
        'Atendimento profissional',
        'Crescimento estruturado'
      ],
      highlight: false
    },
    {
      title: 'Médias empresas',
      items: [
        'Integração entre setores',
        'Escalabilidade',
        'Mais controle operacional'
      ],
      highlight: true
    },
    {
      title: 'Grandes empresas',
      items: [
        'Padronização',
        'Inteligência operacional',
        'Redução de custos',
        'Decisões mais rápidas'
      ],
      highlight: false
    }
  ];

  return (
    <section id="beneficios" className="py-20 px-6 bg-[#0d0620]/30 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9] block mb-2">
            ESCALA SOB MEDIDA
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight">
            Benefícios para Qualquer Porte de Empresa
          </h2>
          <p className="text-base sm:text-lg italic text-[#B9AEDD] mt-3 max-w-2xl mx-auto">
            A IA é modular. Ela se adapta às dores atuais do seu negócio, seja você uma operação enxuta ou corporativa.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="benefits-grid">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-2xl p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:scale-[1.03] ${
                cat.highlight
                  ? 'bg-[#1E1547] border-2 border-[#6D28D9] relative overflow-hidden'
                  : 'bg-[#F5F3FF]'
              }`}
            >
              {/* Highlight badge tag */}
              {cat.highlight && (
                <div className="absolute top-4 right-4 bg-[#F0A500] text-[#0A0118] text-[9px] uppercase font-extrabold px-2 py-1 rounded-md tracking-wider">
                  Recomendado
                </div>
              )}

              <div>
                <h3 className={`text-xl font-sans font-extrabold mb-2 tracking-tight ${
                  cat.highlight ? 'text-white' : 'text-[#1a1025]'
                }`}>
                  {cat.title}
                </h3>
                
                {/* Decorative underline */}
                <div className="w-10 h-1 bg-[#F0A500] rounded-full mb-6" />

                <ul className="space-y-4">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        cat.highlight ? 'bg-[#6D28D9]/40 text-[#F0A500]' : 'bg-[#6D28D9] text-white'
                      }`}>
                        <Check size={14} strokeWidth={2.5} />
                      </div>
                      <span className={`text-sm sm:text-base font-bold tracking-wide ${
                        cat.highlight ? 'text-[#B9AEDD]' : 'text-[#1a1025]'
                      }`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
