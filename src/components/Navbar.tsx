import { useEffect, useState } from 'react';
import { scrollToSection, navItems } from '../utils/constants';
import OptimizedImage from './OptimizedImage';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handle = () => setMobileOpen(false);
    window.addEventListener('scroll', handle, { once: true });
    return () => window.removeEventListener('scroll', handle);
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled || mobileOpen
          ? 'bg-navy/95 backdrop-blur-xl py-4 shadow-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 logo-glow">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer"
            aria-label="Scroll to top"
          >
            <OptimizedImage name="logo-transparent" ext="png" alt="Academic Pilots" className="h-12 md:h-16 w-auto object-contain drop-shadow-logo" imgProps={{ loading: 'eager', fetchPriority: 'high' }} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className="text-white/80 hover:text-gold transition-colors text-sm font-medium tracking-wide touch-target inline-flex items-center"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => scrollToSection('consultation')}
            className="bg-gold hover:bg-gold/90 text-navy px-6 py-2.5 rounded-full font-semibold text-sm transition-all transform hover:scale-105 touch-target"
          >
            Book Consultation
          </button>
        </div>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-x-0 top-0 transition-all duration-400 overflow-hidden ${
          mobileOpen
            ? 'max-h-[100vh] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{ transitionDuration: '400ms' }}
      >
        <div className="bg-navy/98 backdrop-blur-2xl border-t border-white/5 pt-24 pb-10">
          <div className="container mx-auto px-4 flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className="text-white/70 hover:text-gold text-lg font-medium tracking-wide transition-colors touch-target inline-flex items-center"
              >
                {item.label}
              </a>
            ))}
            <div className="w-16 h-[1px] bg-gold/30 my-2" />
            <button
              onClick={() => handleNavClick('consultation')}
              className="bg-gold hover:bg-gold/90 text-navy px-10 py-3.5 rounded-full font-bold text-base transition-all transform hover:scale-105 w-full max-w-xs touch-target"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
