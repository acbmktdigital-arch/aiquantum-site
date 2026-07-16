import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import quantumIaLogo from '../assets/images/quantum_ia_logo_1783476802894.jpg';

interface NavbarProps {
  sections: { id: string; label: string }[];
}

export default function Navbar({ sections }: NavbarProps) {
  const [activeSec, setActiveSec] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Offset for navbar

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSec(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSec(id);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0118]/90 backdrop-blur-md border-b border-[#5B21B6]/30 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => scrollTo('inicio')} 
          className="flex items-center gap-2.5 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#5B21B6]/40 shadow-lg shadow-[#5B21B6]/20 bg-black flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <img 
              src={quantumIaLogo} 
              alt="Q" 
              className="w-full h-full object-cover scale-[1.6] -translate-y-[4%]" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-serif font-extrabold tracking-wider text-[#F0A500] text-lg">AI QUANTUM</span>
            <span className="hidden sm:block text-[10px] uppercase text-[#B9AEDD] tracking-widest font-semibold font-sans">Empresa Inteligente</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1.5" id="nav-desktop-links">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`text-xs font-semibold px-3 py-2 rounded-full tracking-wide transition-all duration-200 cursor-pointer ${
                activeSec === sec.id
                  ? 'bg-[#F0A500] text-[#0A0118] font-bold shadow-md shadow-[#F0A500]/25'
                  : 'text-[#B9AEDD] hover:text-white hover:bg-[#5B21B6]/20'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#B9AEDD] hover:text-white transition-colors cursor-pointer"
          id="nav-mobile-toggle"
          aria-label="Alternar Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden mt-4 pt-3 pb-4 border-t border-[#5B21B6]/20 flex flex-col gap-2 bg-[#0A0118]"
          id="nav-mobile-menu"
        >
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`text-sm text-left font-semibold px-4 py-2.5 rounded-lg tracking-wide transition-all ${
                activeSec === sec.id
                  ? 'bg-[#F0A500] text-[#0A0118] font-bold'
                  : 'text-[#B9AEDD] hover:text-white hover:bg-[#5B21B6]/10'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
