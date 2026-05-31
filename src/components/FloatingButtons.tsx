import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Phone } from 'lucide-react';

const FloatingButtons = () => {
  const [showActions, setShowActions] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [callPopupOpen, setCallPopupOpen] = useState(false);
  const [waPopupOpen, setWaPopupOpen] = useState(false);
  const callPopupRef = useRef<HTMLDivElement>(null);
  const callBtnRef = useRef<HTMLDivElement>(null);
  const waPopupRef = useRef<HTMLDivElement>(null);
  const waBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPastThreshold = window.scrollY > window.innerHeight * 0.5;
      setShowBackToTop(scrolledPastThreshold);

      const consultationEl = document.getElementById('consultation');
      const reachedConsultation = consultationEl
        ? window.scrollY + window.innerHeight * 0.5 > consultationEl.offsetTop
        : false;
      setShowActions(scrolledPastThreshold && !reachedConsultation);

      if (callPopupOpen) setCallPopupOpen(false);
      if (waPopupOpen) setWaPopupOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callPopupOpen, waPopupOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        callPopupRef.current &&
        !callPopupRef.current.contains(e.target as Node) &&
        callBtnRef.current &&
        !callBtnRef.current.contains(e.target as Node)
      ) {
        setCallPopupOpen(false);
      }
      if (
        waPopupRef.current &&
        !waPopupRef.current.contains(e.target as Node) &&
        waBtnRef.current &&
        !waBtnRef.current.contains(e.target as Node)
      ) {
        setWaPopupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = (msg?: string) => {
    const defaultMsg = "Hi! I'm interested in learning more about Academic Pilots' study abroad services. Can you guide me through the process?";
    const text = encodeURIComponent(msg || defaultMsg);
    window.open(`https://wa.me/917292022912?text=${text}`, '_blank', 'noopener,noreferrer');
    setWaPopupOpen(false);
  };

  const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      className={`pointer-events-none h-7 w-7 transition-transform duration-300 group-hover:scale-110 ${className ?? ''}`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741 1.205 1.2-3.645-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 21.75l3.99-1.296a11.838 11.838 0 005.674 1.447h.005c6.554 0 11.89-5.335 11.893-11.892a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  const waTemplates = [
    {
      label: 'General Inquiry',
      msg: "Hi! I'm interested in learning more about Academic Pilots' study abroad services. Can you guide me through the process?",
    },
    {
      label: 'Free Consultation',
      msg: "I'd like to book a free consultation to discuss my study abroad options. Can you help me schedule one?",
    },
    {
      label: 'Visa Guidance',
      msg: "I need guidance on the visa application process for studying abroad. What documents are required and how long does it typically take?",
    },
    {
      label: 'Destinations',
      msg: "I'm exploring study destinations and would like help comparing options in the UK, USA, Europe, and UAE. Can you share some insights?",
    },
  ];

  return (
    <>
      <div ref={callBtnRef} className={`fixed bottom-4 md:bottom-8 left-4 md:left-8 z-50 transition-all duration-500 ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <button
          onClick={() => { setCallPopupOpen((prev) => !prev); if (waPopupOpen) setWaPopupOpen(false); }}
          aria-label="Call us"
          className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gold text-navy shadow-xl shadow-gold/30 transition-all duration-300 hover:scale-110 hover:shadow-gold/50"
        >
          <Phone className="pointer-events-none h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:scale-110" />
        </button>

        <div
          ref={callPopupRef}
          className={`absolute bottom-20 left-0 w-72 max-w-[85vw] origin-bottom-left transition-all duration-300 ${
            callPopupOpen
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-90 pointer-events-none'
          }`}
        >
          <div className="relative bg-navy rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
            <div className="absolute top-px left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Call us directly</p>
                  <p className="text-white/40 text-xs font-mono">Available Mon–Sat, 10AM–7PM</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mb-3">
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-1">Phone</p>
                <p className="text-white text-lg font-semibold tracking-wide">+91 72920 22912</p>
              </div>

              <a
                href="tel:+917292022912"
                className="flex w-full items-center justify-center gap-3 rounded-full bg-gold px-5 py-3.5 font-bold text-navy text-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-gold/20 active:scale-[0.97]"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            <div className="absolute -bottom-1.5 left-8 w-3 h-3 rotate-45 bg-navy border-r border-b border-white/10" />
          </div>
        </div>
      </div>

      <div ref={waBtnRef} className={`fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-3 transition-all duration-500 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="relative">
          <button
            onClick={() => { setWaPopupOpen((prev) => !prev); if (callPopupOpen) setCallPopupOpen(false); }}
            aria-label="Chat on WhatsApp"
            className={`group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/50 ${showActions ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <WhatsAppIcon />
          </button>

          <div
            ref={waPopupRef}
            className={`absolute bottom-20 right-0 w-80 max-w-[85vw] origin-bottom-right transition-all duration-300 ${
              waPopupOpen
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <div className="relative bg-navy rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
              <div className="absolute top-px left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#25D366]/60 to-transparent" />
              
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center">
                    <WhatsAppIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Chat on WhatsApp</p>
                    <p className="text-white/40 text-xs font-mono">+91 72920 22912</p>
                  </div>
                </div>

                <p className="text-white/50 text-xs mb-3 font-mono uppercase tracking-widest">Quick Messages</p>

                <div className="space-y-2 mb-3">
                  {waTemplates.map((tpl) => (
                    <button
                      key={tpl.label}
                      type="button"
                      onClick={() => openWhatsApp(tpl.msg)}
                      className="group w-full rounded-xl bg-white/5 px-4 py-3 text-left transition-all duration-200 hover:bg-[#25D366]/15 active:scale-[0.98]"
                    >
                      <p className="text-white/80 text-xs font-medium group-hover:text-white transition-colors">
                        {tpl.label}
                      </p>
                      <p className="text-white/35 text-[11px] leading-relaxed mt-1 line-clamp-2 group-hover:text-white/50 transition-colors">
                        {tpl.msg}
                      </p>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => openWhatsApp()}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 font-bold text-white text-sm transition-all duration-300 hover:bg-white hover:text-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/20 active:scale-[0.97]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Open WhatsApp
                </button>
              </div>

              <div className="absolute -bottom-1.5 right-8 w-3 h-3 rotate-45 bg-navy border-r border-b border-white/10" />
            </div>
          </div>
        </div>

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-navy text-gold shadow-xl shadow-navy/30 border border-gold/30 transition-all duration-500 ease-out hover:bg-gold hover:text-navy hover:scale-125 hover:shadow-2xl hover:shadow-gold/40 active:scale-90"
        >
          <span className="absolute inset-0 rounded-full border border-gold/30 opacity-0 group-hover:opacity-100 group-hover:scale-[1.8] transition-all duration-700 ease-out pointer-events-none" />
          <span className="absolute inset-0 rounded-full border-2 border-gold/10 opacity-0 group-hover:opacity-60 group-hover:scale-[1.4] transition-all duration-500 delay-75 ease-out pointer-events-none" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/15 to-white/0 opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 ease-out pointer-events-none" />
          
          <ArrowUp className="relative z-10 h-5 w-5 md:h-6 md:w-6 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-125" />
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;
