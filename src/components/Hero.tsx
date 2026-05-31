import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { scrollToSection } from '../utils/constants';

const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!h1Ref.current) return;

    const words = h1Ref.current.innerText.split(' ');
    h1Ref.current.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block opacity-0 translate-y-10">${
            word === 'Global'
              ? `<i class="text-gold not-italic font-hero italic">${word}</i>`
              : word
          }</span>`
      )
      .join(' ');

    gsap.to(h1Ref.current.querySelectorAll('span'), {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.5,
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx && containerRef.current) {
      containerRef.current.appendChild(canvas);
      canvas.className = 'absolute inset-0 pointer-events-none opacity-40';
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resize);
      resize();

      const particles: any[] = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#C89438';
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-dvh md:h-screen flex items-center overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src={`${import.meta.env.BASE_URL}videos/temphero.mp4`}
          type="video/mp4"
        />
      </video>
      <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-[10px] md:text-xs font-mono tracking-widest uppercase">
            ✈ Tailored Paths to Global Careers
          </span>
        </div>

        <h1
          ref={h1Ref}
          className="text-white font-hero text-4xl sm:text-5xl md:text-8xl leading-tight mb-6 md:mb-8 max-w-5xl"
        >
          Your Flight Path to a Global Career Starts Here.
        </h1>
        <p className="text-white/70 text-base md:text-xl max-w-2xl mb-10 md:mb-12 font-body font-light leading-relaxed">
          Expert career-first guidance to top universities — UK, USA, Europe,
          UAE. We don't just process applications, we architect futures.
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
          <button
            onClick={() => scrollToSection('consultation')}
            className="group relative overflow-hidden bg-gold text-navy w-full sm:w-auto px-8 md:px-10 py-4 rounded-full font-bold text-base md:text-lg transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl hover:shadow-gold/40 shadow-lg shadow-gold/20 active:scale-[0.97] touch-target"
          >
            <span className="relative z-10 inline-flex items-center gap-3">
              Book Free Consultation
              <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1.5" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-full group-hover:translate-x-full" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold to-transparent relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 border-r-2 border-b-2 border-gold rotate-45 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
