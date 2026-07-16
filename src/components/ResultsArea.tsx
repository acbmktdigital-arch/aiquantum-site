import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  Headphones, 
  Megaphone, 
  DollarSign, 
  Users, 
  BarChart3, 
  Layers 
} from 'lucide-react';

export default function ResultsArea() {
  const areas = [
    {
      title: 'Comercial',
      desc: 'Mais oportunidades convertidas.',
      icon: ShoppingCart
    },
    {
      title: 'Atendimento',
      desc: 'Respostas instantâneas.',
      icon: Headphones
    },
    {
      title: 'Marketing',
      desc: 'Conteúdo e campanhas automatizadas.',
      icon: Megaphone
    },
    {
      title: 'Financeiro',
      desc: 'Cobranças, indicadores e previsões.',
      icon: DollarSign
    },
    {
      title: 'RH',
      desc: 'Recrutamento, integração e treinamento.',
      icon: Users
    },
    {
      title: 'Gestão',
      desc: 'Números do negócio organizados, sem depender de planilha.',
      icon: BarChart3
    },
    {
      title: 'Operações',
      desc: 'Processos padronizados, menos erros.',
      icon: Layers
    }
  ];

  return (
    <section id="resultados" className="py-20 px-6 bg-[#0A0118] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F0A500] block mb-2">
            Impacto por área
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight">
            Onde a IA Gera Resultados
          </h2>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6" id="results-area-grid">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="bg-[#F5F3FF] rounded-2xl p-6 text-center flex flex-col items-center justify-center shadow-md hover:scale-[1.03] hover:shadow-xl transition-all duration-350"
              >
                <div className="w-14 h-14 rounded-full border-2 border-[#5B21B6]/30 flex items-center justify-center text-[#1a1025] bg-white shadow-sm mb-4">
                  <Icon size={22} className="text-[#5B21B6]" />
                </div>
                
                <h4 className="text-[#1a1025] font-extrabold text-base tracking-tight mb-2">
                  {area.title}
                </h4>
                
                <p className="text-[#54507a] text-xs sm:text-sm font-medium leading-relaxed">
                  {area.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
