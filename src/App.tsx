import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Challenge from './components/Challenge';
import Ecosystem from './components/Ecosystem';
import Tools from './components/Tools';
import AILearns from './components/AILearns';
import Automations from './components/Automations';
import ResultsArea from './components/ResultsArea';
import Benefits from './components/Benefits';
import FinalResult from './components/FinalResult';
import Contact from './components/Contact';
import RaioXQuiz from './raiox/RaioXQuiz';
import quantumIaLogo from './assets/images/quantum_ia_logo_1783476802894.jpg';

export default function App() {
  const [showRaioX, setShowRaioX] = useState(false);

  const sections = [
    { id: 'inicio', label: 'Início' },
    { id: 'desafio', label: 'Desafio' },
    { id: 'ecossistema', label: 'Ecossistema' },
    { id: 'ferramentas', label: 'Ferramentas' },
    { id: 'ia', label: 'IA que Aprende' },
    { id: 'automacoes', label: 'Menos Trabalho Manual' },
    { id: 'resultados', label: 'Resultados' },
    { id: 'beneficios', label: 'Benefícios' },
    { id: 'final', label: 'Resultado Final' },
    { id: 'contato', label: 'Contato' }
  ];

  // O CTA de diagnóstico abre o quiz Raio-X em tela cheia
  const handleCtaClick = () => {
    setShowRaioX(true);
  };

  return (
    <div className="bg-[#0A0118] min-h-screen text-white selection:bg-[#F0A500] selection:text-[#0A0118]">
      {/* Navigation */}
      <Navbar sections={sections} />

      {/* Main Sections */}
      <main>
        <Hero onCtaClick={handleCtaClick} />
        <Challenge />
        <Ecosystem />
        <Tools />
        <AILearns />
        <Automations />
        <ResultsArea />
        <Benefits />
        <FinalResult />
        <Contact onDiagnosticClick={handleCtaClick} />
      </main>

      {/* Overlay do Diagnóstico Raio-X */}
      <AnimatePresence>
        {showRaioX && <RaioXQuiz onClose={() => setShowRaioX(false)} />}
      </AnimatePresence>

      {/* Premium styled Footer */}
      <footer className="border-t border-[#5B21B6]/30 bg-[#0d0620] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#5B21B6]/40 shadow-md shadow-[#5B21B6]/10 bg-black flex items-center justify-center">
                <img 
                  src={quantumIaLogo} 
                  alt="Q" 
                  className="w-full h-full object-cover scale-[1.6] -translate-y-[4%]" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-serif font-extrabold tracking-wider text-[#F0A500] text-base">AI QUANTUM</span>
            </div>
            <p className="text-xs text-[#B9AEDD]">
              &copy; {new Date().getFullYear()} AI QUANTUM. Todos os direitos reservados.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-1">
            <span className="text-sm font-sans font-bold text-[#E8C766]">
              Inteligência que trabalha por você
            </span>
            <span className="text-xs text-[#B9AEDD] tracking-wide">
              Mapeamento, Modelagem e Integração de Sistemas de IA
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
