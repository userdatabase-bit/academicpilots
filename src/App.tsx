import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  GraduationCap, 
  MapPin, 
  Users, 
  Globe2, 
  PlaneTakeoff, 
  FileCheck, 
  Compass, 
  MessageSquare, 
  ArrowRight,
  ArrowUp,
  Star,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  CheckCircle2,
  Send,
  User,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

gsap.registerPlugin(ScrollTrigger);

const logoSrc = `${import.meta.env.BASE_URL}images/logo-transparent.png`;
const imageSrc = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`;

// --- Components ---

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  
  let targetPosition;
  
  if (id === 'process') {
    // Get all sections before Process
    const hero = document.querySelector('section.h-dvh, section.h-screen');
    const stats = hero?.nextElementSibling;
    
    if (stats) {
      targetPosition = (stats as HTMLElement).offsetTop + (stats as HTMLElement).offsetHeight;
    } else {
      targetPosition = element.offsetTop;
    }
    
    // Reset horizontal scroll
    const scrollContainer = element.querySelector('[class*="flex h-full items-center"]');
    if (scrollContainer) {
      gsap.set(scrollContainer, { x: 0 });
    }
  } else {
    targetPosition = element.offsetTop;
  }
  
  const navbarHeight = 100;
  const offsetPosition = targetPosition - navbarHeight;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

const navItems = [
  { label: 'Destinations', id: 'destinations' },
  { label: 'Process', id: 'process' },
  { label: 'Services', id: 'services' },
  { label: 'Founder', id: 'founder' },
];

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

  // Close mobile menu on route/scroll
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled || mobileOpen ? 'bg-navy/95 backdrop-blur-xl py-4 shadow-xl' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 logo-glow">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer"
            aria-label="Scroll to top"
          >
            <img src={logoSrc} alt="Academic Pilots" className="h-12 md:h-16 w-auto object-contain drop-shadow-logo" />
          </button>
        </div>
        
        {/* Desktop Nav */}
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

        {/* Hamburger Button */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-x-0 top-0 transition-all duration-400 overflow-hidden ${
          mobileOpen ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
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

const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!h1Ref.current) return;
    
    const words = h1Ref.current.innerText.split(' ');
    h1Ref.current.innerHTML = words.map(word => 
      `<span class="inline-block opacity-0 translate-y-10">${word === 'Global' ? `<i class="text-gold not-italic font-hero italic">${word}</i>` : word}</span>`
    ).join(' ');

    gsap.to(h1Ref.current.querySelectorAll('span'), {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.5
    });

    // Floating particles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx && containerRef.current) {
      containerRef.current.appendChild(canvas);
      canvas.className = "absolute inset-0 pointer-events-none opacity-40";
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resize);
      resize();

      const particles: any[] = [];
      for(let i=0; i<40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#C89438';
        particles.forEach(p => {
          p.x += p.speedX;
          p.y += p.speedY;
          if(p.x < 0 || p.x > canvas.width) p.speedX *= -1;
          if(p.y < 0 || p.y > canvas.height) p.speedY *= -1;
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
    <section ref={containerRef} className="relative h-dvh md:h-screen flex items-center overflow-hidden">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${import.meta.env.BASE_URL}videos/temphero.mp4`} type="video/mp4" />
      </video>        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-[10px] md:text-xs font-mono tracking-widest uppercase">✈ Tailored Paths to Global Careers</span>
        </div>
        
        <h1 
          ref={h1Ref}
          className="text-white font-hero text-4xl sm:text-5xl md:text-8xl leading-tight mb-6 md:mb-8 max-w-5xl"
        >
          Your Flight Path to a Global Career Starts Here.
        </h1>          <p className="text-white/70 text-base md:text-xl max-w-2xl mb-10 md:mb-12 font-body font-light leading-relaxed">
          Expert career-first guidance to top universities — UK, USA, Europe, UAE. We don't just process applications, we architect futures.
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

const Stats = () => {
  const stats = [
    { value: 99, suffix: '+', label: 'Universities' },
    { value: 15, suffix: '+', label: 'Years' },
    { value: 5, suffix: '', label: 'Destinations' }
  ];

  return (
    <section className="bg-navy py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16 text-center mb-10 md:mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-gold font-mono text-5xl md:text-8xl font-bold mb-2 md:mb-4">
                <Counter value={stat.value} />{stat.suffix}
              </div>
              <div className="text-white/60 text-lg uppercase tracking-widest font-body">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white/40 font-hero italic text-2xl md:text-3xl">
            "Every number represents a future we shaped."
          </p>
        </div>
      </div>
    </section>
  );
};

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          
          setCount(Math.floor(easeOutQuart * value));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}</span>;
};

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: "01",
      icon: <Users className="w-12 h-12 text-gold" />,
      title: "Profile Analysis",
      sub: "We Map Your Ambitions",
      body: "Deep dive into your academic history, career goals, and personal preferences to build a strategic profile."
    },
    {
      num: "02",
      icon: <Compass className="w-12 h-12 text-gold" />,
      title: "University Matching",
      sub: "99+ Unis. One Right Fit.",
      body: "Using our proprietary matching engine to find institutions that align with your career trajectory and budget."
    },
    {
      num: "03",
      icon: <FileCheck className="w-12 h-12 text-gold" />,
      title: "Application & Visa",
      sub: "Zero-Error Execution",
      body: "Meticulous documentation and embassy-aligned processing to ensure the highest success rates in the industry."
    },
    {
      num: "04",
      icon: <PlaneTakeoff className="w-12 h-12 text-gold" />,
      title: "Touchdown Support",
      sub: "From Takeoff to Landing",
      body: "Pre-departure briefings, accommodation assistance, and on-ground network connections for your new home."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const getTotalWidth = () => {
        const lastItem = scrollContainer.lastElementChild as HTMLElement | null;
        if (!lastItem) return 0;
        const finalRightEdge = lastItem.offsetLeft + lastItem.offsetWidth;
        return Math.max(0, finalRightEdge - window.innerWidth + window.innerWidth * 0.06);
      };

      const getHold = () => window.innerHeight * 0.6;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: "top 8%",
          end: () => `+=${getTotalWidth() + getHold() * 2}`,
          invalidateOnRefresh: true,
        }
      });

      timeline
        .to(scrollContainer, { x: 0, duration: getHold, ease: "none" })
        .to(scrollContainer, { x: () => -getTotalWidth(), duration: getTotalWidth, ease: "none" })
        .to(scrollContainer, { x: () => -getTotalWidth(), duration: getHold, ease: "none" });

      // Animate the "flight line" connecting cards
      gsap.fromTo(".flight-line-path", 
        { strokeDashoffset: 2000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 8%",
            end: () => `+=${getTotalWidth()}`,
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative min-h-screen md:h-screen bg-navy scroll-mt-28">
      <div className="absolute top-8 md:top-10 left-6 md:left-10 z-20 pointer-events-none">
        <span className="text-gold font-mono uppercase tracking-[0.3em] text-xs mb-2 block">The Journey</span>
        <h2 className="text-4xl md:text-5xl text-white font-heading">Our Flight Path</h2>
      </div>

      {/* GSAP horizontal scroll */}
      <div className="absolute inset-0 overflow-hidden">
      <div ref={scrollContainerRef} className="flex h-full items-center pl-[10vw] pr-[6vw] gap-[6vw] md:gap-[12vw] pt-20 md:pt-40 relative">
        {/* Background Flight Path SVG */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-20 z-0">
          <svg viewBox="0 0 4000 400" className="w-full h-[400px]">
            <path 
              className="flight-line-path"
              d="M 0,200 Q 500,50 1000,200 T 2000,200 T 3000,200 T 4000,200" 
              fill="none" 
              stroke="#C89438" 
              strokeWidth="2" 
              strokeDasharray="2000"
              strokeDashoffset="2000"
            />
          </svg>
        </div>
          {steps.map((step, i) => (
              <div key={i} className="flex-shrink-0 w-[80vw] md:w-[400px] lg:w-[500px] relative z-10 group">
                <div className="relative bg-white/12 backdrop-blur-none md:bg-white/10 md:backdrop-blur-md p-6 md:p-12 rounded-[24px] md:rounded-[40px] border border-white/10 md:border-white/20 hover:border-gold/30 transition-all duration-500 hover:-translate-y-4">
                  <div className="absolute -top-5 md:-top-10 -left-4 md:-left-10 text-[60px] md:text-[120px] font-mono text-white/5 font-bold leading-none select-none group-hover:text-gold/10 transition-colors">
                    {step.num}
                  </div>
                  
                  <div className="mb-6 md:mb-10 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                    {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8 md:w-12 md:h-12 text-gold' })}
                  </div>
                  
                  <h3 className="text-white text-2xl md:text-4xl mb-2 font-heading">{step.title}</h3>
                  <div className="text-gold font-mono text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6">{step.sub}</div>
                  
                  <p className="text-white/60 text-sm md:text-lg leading-relaxed">
                    {step.body}
                  </p>
                  
                  <div className="mt-6 md:mt-10 flex items-center gap-4 text-gold/40 font-mono text-xs uppercase tracking-tighter group-hover:text-gold transition-colors">
                    <span>Phase {step.num}</span>
                    <div className="flex-1 h-[1px] bg-gold/10 group-hover:bg-gold/30" />
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Final Destination Card */}
            <div className="flex-shrink-0 w-[80vw] md:w-[500px] lg:w-[600px] relative z-10">
              <div className="bg-gold p-8 md:p-16 rounded-[24px] md:rounded-[40px] text-navy">
                <h3 className="text-3xl md:text-5xl font-heading mb-4 md:mb-6">Ready for Takeoff?</h3>
                <p className="text-navy/80 text-base md:text-xl mb-8 md:mb-10 leading-relaxed font-medium">
                  Your global career is just one consultation away. Let's map your future together.
                </p>
                <button 
                  onClick={() => scrollToSection('consultation')}
                  className="bg-navy text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-navy/90 transition-all transform hover:scale-105 w-full md:w-auto"
                >
                  Start Your Journey
                </button>
              </div>
            </div>
      </div>
      </div>
    </section>
  );
};

const LegacyDestinationSection = () => {
  const destinations = [
    { id: 'london', name: 'London', img: imageSrc('london.jpg'), tags: 'UK · 9+ Years · Direct Embassy', coords: { x: 48, y: 32 } },
    { id: 'nyc', name: 'New York', img: imageSrc('nyc.jpg'), tags: 'USA · Ivy League · Top Tier', coords: { x: 25, y: 38 } },
    { id: 'dubai', name: 'Dubai', img: imageSrc('dubai.jpg'), tags: 'UAE · Career Hub · No IELTS', coords: { x: 62, y: 48 } },
    { id: 'barcelona', name: 'Barcelona', img: imageSrc('barcelona.jpg'), tags: 'Spain · Schengen · Tech Focus', coords: { x: 48, y: 40 } },
    { id: 'nairobi', name: 'Nairobi', img: imageSrc('nairobi.jpg'), tags: 'Kenya · Global Network · Rising', coords: { x: 58, y: 62 } }
  ];

  const [activeDest, setActiveDest] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToDest = (id: string) => {
    const element = document.getElementById(`dest-${id}`);
    if (element && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: element.offsetLeft - 100,
        behavior: 'smooth'
      });
    }
    setActiveDest(id);
  };

  return (
    <section id="destinations" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-12">
          <div>
            <span className="text-gold font-mono uppercase tracking-widest text-sm mb-4 block">Global Reach</span>
            <h2 className="text-5xl md:text-6xl text-navy">Premier Destinations</h2>
          </div>

          {/* Mini Interactive Map */}
          <div className="relative w-full max-w-md bg-navy/5 rounded-3xl p-6 border border-navy/10">
            <div className="text-[10px] font-mono text-navy/40 uppercase tracking-[0.2em] mb-4 flex justify-between items-center">
              <span>Interactive Flight Grid</span>
              <Globe2 className="w-3 h-3" />
            </div>
            <div className="relative aspect-[2/1] w-full opacity-80">
              {/* Simplified World Map Silhouette */}
              <svg viewBox="0 0 100 50" className="w-full h-full fill-navy/10">
                <path d="M15,15 Q25,10 35,15 T50,25 T70,20 T85,15 T95,25 T80,45 T60,40 T40,45 T20,40 Z" /> {/* Americas/Eurasia/Africa simplified */}
                <path d="M10,20 Q5,25 10,35 T20,30 Z" className="opacity-50" /> {/* Americas */}
                <path d="M80,35 Q85,40 90,35 T85,30 Z" className="opacity-50" /> {/* Australia */}
              </svg>

              {/* Destination Markers */}
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => scrollToDest(dest.id)}
                  onMouseEnter={() => setActiveDest(dest.id)}
                  onMouseLeave={() => setActiveDest(null)}
                  className="absolute group z-20"
                  style={{ left: `${dest.coords.x}%`, top: `${dest.coords.y}%` }}
                >
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeDest === dest.id ? 'bg-gold scale-150 shadow-[0_0_15px_rgba(200,148,56,0.8)]' : 'bg-navy/30'
                  }`} />
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-navy text-white text-[8px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 ${activeDest === dest.id ? 'opacity-100' : ''}`}>
                    {dest.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-12 gap-8 no-scrollbar snap-x snap-mandatory"
        >
          {destinations.map((dest, i) => (
            <motion.div 
              id={`dest-${dest.id}`}
              key={i}
              whileHover={{ y: -20 }}
              animate={{
                scale: activeDest === dest.id ? 1.02 : 1,
                borderColor: activeDest === dest.id ? 'rgba(200,148,56,1)' : 'transparent'
              }}
              className={`flex-shrink-0 w-[350px] md:w-[450px] h-[600px] relative rounded-3xl overflow-hidden group snap-center border-2 transition-colors duration-500`}
            >
              <img 
                src={dest.img} 
                alt={dest.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent opacity-80" />
              <div className={`absolute inset-0 bg-gold/10 transition-opacity duration-500 ${activeDest === dest.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              
              <div className="absolute bottom-10 left-10 right-10">
                <h3 className="text-white font-hero italic text-4xl mb-4">{dest.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {dest.tags.split(' · ').map((tag, j) => (
                    <span key={j} className="text-[10px] uppercase tracking-widest text-white/70 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

type Destination = {
  id: string;
  name: string;
  shortName: string;
  image: string;
  tags: string[];
  center: L.LatLngExpression;
  zoom: number;
  features: string[];
};

const DestinationLeafletMap = ({
  destinations,
  activeId,
  onSelect,
  onReset
}: {
  destinations: Destination[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onReset: () => void;
}) => {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return;

    const map = L.map(mapElementRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
      minZoom: 1,
      maxZoom: 6,
      worldCopyJump: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 6,
      className: 'destination-map-tiles'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    map.on('click', onReset);

    const allBounds = L.latLngBounds(destinations.map(d => d.center));
    map.fitBounds(allBounds, { padding: [30, 30], maxZoom: 3 });

    destinations.forEach((dest) => {
      const marker = L.marker(dest.center, {
        icon: L.divIcon({
          className: 'destination-marker',
          html: `<span>${dest.shortName}</span>`,
          iconSize: [84, 36],
          iconAnchor: [42, 18]
        })
      })
        .addTo(map);

      markersRef.current[dest.id] = marker;
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const activeDest = destinations.find((dest) => dest.id === activeId);
    if (!activeDest) {
      const allBounds = L.latLngBounds(destinations.map(d => d.center));
      map.fitBounds(allBounds, { padding: [30, 30], maxZoom: 3, animate: true, duration: 1 });
    } else {
      map.flyTo(activeDest.center, activeDest.zoom, {
        animate: true,
        duration: 1
      });
    }

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const element = marker.getElement();
      element?.classList.toggle('is-active', id === activeId);
    });
  }, [destinations, activeId]);

  useEffect(() => {
    Object.values(markersRef.current).forEach((marker) => {
      marker.off('click');
      marker.on('click', (event) => {
        L.DomEvent.stopPropagation(event);
        const selected = destinations.find((dest) => marker === markersRef.current[dest.id]);
        if (!selected) return;
        if (activeId === selected.id) {
          onReset();
          return;
        }
        onSelect(selected.id);
      });
    });
  }, [destinations, activeId, onReset, onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.off('click');
    map.on('click', onReset);

    return () => {
      map.off('click', onReset);
    };
  }, [onReset]);

  return <div ref={mapElementRef} className="absolute inset-0 z-0" />;
};

// --- Mobile Swipeable Destination Carousel ---

const MobileDestinationCarousel = ({
  destinations,
  activeId,
  onSelect,
}: {
  destinations: Destination[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: false,
    skipSnaps: false,
    dragFree: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelectHandler = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelectHandler);
    return () => { emblaApi.off('select', onSelectHandler); };
  }, [emblaApi]);

  return (
    <div className="md:hidden -mx-6">
      {/* Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {destinations.map((dest, i) => (
            <div key={dest.id} className="flex-[0_0_80%] min-w-0 pl-6">
              <button
                type="button"
                onClick={() => onSelect(dest.id)}
                className={`relative w-full h-[400px] rounded-[28px] overflow-hidden group text-left border-2 transition-colors duration-500 ${
                  activeId === dest.id ? 'border-gold' : 'border-navy/10'
                }`}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent opacity-90" />
                <div className={`absolute inset-0 transition-opacity duration-500 ${activeId === dest.id ? 'bg-gold/20 opacity-100' : 'opacity-0 group-hover:opacity-100 bg-gold/10'}`} />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-gold font-mono text-xs uppercase tracking-[0.22em] mb-2">{dest.shortName}</div>
                  <h3 className="text-white font-hero italic text-3xl mb-3">{dest.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {dest.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest text-white/70 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2.5 mt-6 px-6">
        {destinations.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === selectedIndex
                ? 'bg-gold w-7 h-2.5'
                : 'bg-navy/20 w-2.5 h-2.5 hover:bg-navy/40'
            }`}
            aria-label={`Go to ${destinations[i].name}`}
          />
        ))}
      </div>
    </div>
  );
};

const DestinationSection = () => {
  const destinations: Destination[] = [
    {
      id: 'uk',
      name: 'United Kingdom',
      shortName: 'UK',
      image: imageSrc('london.jpg'),
      tags: ['Career-focused', 'Shorter programs', 'Strong alumni routes'],
      center: [54.5, -3.4],
      zoom: 4,
      features: [
        'Globally understood degrees with career-ready program structures.',
        'One-year master routes can reduce living cost and time away.',
        'Strong part-time work culture and post-study career pathways.'
      ]
    },
    {
      id: 'spain',
      name: 'Spain',
      shortName: 'Spain',
      image: imageSrc('barcelona.jpg'),
      tags: ['Schengen access', 'Affordable lifestyle', 'Warm student cities'],
      center: [40.4, -3.7],
      zoom: 5,
      features: [
        'Practical European study routes with an accessible cost of living.',
        'Schengen-region exposure helps students build wider global mobility.',
        'A strong fit for hospitality, business, design, tech, and language growth.'
      ]
    },
    {
      id: 'dubai',
      name: 'Dubai',
      shortName: 'Dubai',
      image: imageSrc('dubai.jpg'),
      tags: ['Close to India', 'Business hub', 'Fast-growing market'],
      center: [25.2, 55.3],
      zoom: 6,
      features: [
        'A global business environment with strong internship visibility.',
        'Closer travel, familiar regional networks, and modern student facilities.',
        'Good route for students who want international exposure near home.'
      ]
    },
    {
      id: 'usa',
      name: 'United States',
      shortName: 'USA',
      image: imageSrc('nyc.jpg'),
      tags: ['Flexible pathways', 'Research culture', 'Large job market'],
      center: [39.8, -98.6],
      zoom: 3,
      features: [
        'Flexible academic pathways for students still shaping their specialization.',
        'Large professional market with exposure to innovation-led industries.',
        'Strong fit for STEM, business, healthcare, media, and entrepreneurship.'
      ]
    },
    {
      id: 'australia',
      name: 'Australia',
      shortName: 'Australia',
      image: imageSrc('australia.jpg'),
      tags: ['Student-friendly', 'Work options', 'Clear pathways'],
      center: [-25.3, 133.8],
      zoom: 4,
      features: [
        'Student-friendly cities with structured work and settlement pathways.',
        'Clear application cycles and practical programs across key industries.',
        'Popular for students seeking quality of life with international exposure.'
      ]
    },
    {
      id: 'europe',
      name: 'Europe',
      shortName: 'Europe',
      image: imageSrc('europe.jpg'),
      tags: ['Multiple routes', 'Cultural mobility', 'Value-led choices'],
      center: [48.5, 12.5],
      zoom: 4,
      features: [
        'Multiple country pathways for students comparing cost, language, and career goals.',
        'Excellent cultural exposure with access to varied industries and lifestyles.',
        'Good fit when students want options beyond a single destination track.'
      ]
    }
  ];

  const [activeId, setActiveId] = useState<string | null>(null);
  const cardsSectionRef = useRef<HTMLElement>(null);
  const cardsViewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const activeDest = destinations.find((dest) => dest.id === activeId);
  const profileDest = activeDest ?? destinations[0];

  const selectDest = (id: string) => {
    setActiveId((currentId) => currentId === id ? null : id);
  };

  const resetMap = () => {
    setActiveId(null);
  };

  useEffect(() => {
    // Skip GSAP ScrollTrigger on mobile — use Embla carousel instead
    if (window.innerWidth < 768) return;

    const section = cardsSectionRef.current;
    const viewport = cardsViewportRef.current;
    const rail = railRef.current;
    if (!section || !viewport || !rail) return;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);
      const getHold = () => window.innerHeight * 0.6;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1.5,
          start: 'top 8%',
          end: () => `+=${getDistance() + getHold() * 2}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(destinations.length - 1, Math.round(self.progress * (destinations.length - 1)));
            setActiveId((currentId) => currentId === null ? currentId : destinations[index].id);
          }
        }
      });

      timeline
        .to(rail, { x: 0, duration: getHold, ease: 'none' })
        .to(rail, { x: () => -getDistance(), duration: getDistance, ease: 'none' })
        .to(rail, { x: () => -getDistance(), duration: getHold, ease: 'none' });
    }, section);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section id="destinations" className="py-24 bg-white overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <span className="text-gold font-mono uppercase tracking-widest text-sm mb-4 block">Global Reach</span>
          <h2 className="text-5xl md:text-6xl text-navy mb-6">Choose Your Study Destination</h2>
          <p className="text-navy/60 text-xl leading-relaxed">
            Explore the countries and regions we guide for, then compare the practical advantages that matter before you apply.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-stretch mb-14">
          <div className="relative min-h-[400px] md:min-h-[560px] bg-navy overflow-hidden rounded-[32px] border border-navy/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(212,160,23,0.25),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.12),transparent_28%)]" />
            <div className="absolute top-8 left-8 right-8 z-10 flex items-center justify-between gap-6">
              <div>
                <div className="text-gold font-mono text-xs uppercase tracking-[0.24em] mb-2">Interactive Leaflet Map</div>
                <div className="text-white text-3xl font-heading">{activeDest ? activeDest.name : 'Global Overview'}</div>
              </div>
              <Globe2 className="w-8 h-8 text-gold" />
            </div>
            <DestinationLeafletMap destinations={destinations} activeId={activeId} onSelect={selectDest} onReset={resetMap} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-navy to-transparent" />
          </div>

          <motion.div
            key={activeDest?.id ?? 'overview'}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-navy text-white p-8 md:p-10 rounded-[32px] relative overflow-hidden"
          >
            <img src={profileDest.image} alt={profileDest.name} className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/92 to-navy/70" />
            <div className="relative z-10">
              <div className="text-gold font-mono text-xs uppercase tracking-[0.24em] mb-5">
                {activeDest ? 'Destination Profile' : 'Global Coverage'}
              </div>
              <h3 className="text-4xl md:text-5xl font-heading mb-5">
                {activeDest ? activeDest.name : 'Where We Guide'}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => selectDest(dest.id)}
                    className={`border px-3 py-1 rounded-full text-[11px] uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-gold/60 ${
                      activeDest?.id === dest.id
                        ? 'bg-gold text-navy border-gold'
                        : 'border-gold/30 bg-gold/10 text-gold hover:bg-gold hover:text-navy'
                    }`}
                  >
                    {dest.shortName}
                  </button>
                ))}
              </div>
              {activeDest && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeDest.tags.map((tag) => (
                    <span key={tag} className="border border-gold/30 bg-gold/10 text-gold px-3 py-1 rounded-full text-[11px] uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="space-y-5">
                {(activeDest ? activeDest.features : [
                  'Click a highlighted destination to zoom into countries and regions we support.',
                  'Click the active destination again to return to the whole-world view.',
                  'Click anywhere outside our destination markers to reset and compare the full coverage map.'
                ]).map((feature, index) => (
                  <div key={feature} className="flex gap-4">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-navy font-mono text-xs font-bold">
                      {index + 1}
                    </div>
                    <p className="text-white/72 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <section id="destination-cards" ref={cardsSectionRef} className="min-h-screen overflow-hidden pt-10 pb-10 flex flex-col justify-center">
          <div className="mb-8 flex items-end justify-between gap-8">
            <div>
              <span className="text-gold font-mono uppercase tracking-widest text-sm mb-3 block">Destination Cards</span>
              <h3 className="text-4xl md:text-5xl text-navy">Compare Every Country</h3>
            </div>
            <p className="hidden max-w-md text-right text-navy/55 lg:block">
              Scroll down here to move sideways through every country we support.
            </p>
          </div>
          
          {/* Mobile: Swipeable carousel */}
          <MobileDestinationCarousel destinations={destinations} activeId={activeId} onSelect={selectDest} />

          {/* Desktop: GSAP horizontal scroll */}
          <div ref={cardsViewportRef} className="overflow-hidden hidden md:block">
          <div 
            ref={railRef}
            className="flex w-max gap-6 will-change-transform"
          >
          {destinations.map((dest) => (
            <motion.button 
              id={`dest-${dest.id}`}
              key={dest.id}
              type="button"
              onClick={() => selectDest(dest.id)}
              whileHover={{ y: -10 }}
              animate={{
                scale: activeId === dest.id ? 1.02 : 1,
                borderColor: activeId === dest.id ? 'rgba(212,160,23,1)' : 'rgba(10,22,40,0.08)'
              }}
              className="flex-shrink-0 w-[280px] md:w-[360px] h-[460px] relative rounded-[28px] overflow-hidden group snap-center border-2 text-left transition-colors duration-500"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent opacity-90" />
              <div className={`absolute inset-0 bg-gold/10 transition-opacity duration-500 ${activeId === dest.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-gold font-mono text-xs uppercase tracking-[0.22em] mb-3">{dest.shortName}</div>
                <h3 className="text-white font-hero italic text-4xl mb-4">{dest.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {dest.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest text-white/70 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
          </div>
          </div>
        </section>
      </div>
    </section>
  );
};

const FounderSpotlight = () => {
  return (
    <section id="founder" className="py-16 md:py-32 bg-white overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-10 border-2 border-gold/20 rounded-full scale-110 -z-10" />
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              <img 
                src={imageSrc('founder.jpeg')} 
                alt="Pooja Solanki" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-[12px] border-white/20 pointer-events-none" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-gold p-8 rounded-2xl shadow-2xl hidden md:block">
              <div className="text-navy font-mono text-4xl font-bold">15+</div>
              <div className="text-navy/80 text-xs uppercase tracking-widest">Years of Excellence</div>
            </div>
          </div>
          
          <div>
            <span className="text-gold font-mono uppercase tracking-widest text-sm mb-4 block">OUR FOUNDER</span>
            <h2 className="text-5xl md:text-6xl text-navy mb-8">Meet Pooja Solanki</h2>
            
            <p className="text-navy/70 text-lg md:text-xl leading-relaxed mb-10">
              With over 15 years of experience in international education, Pooja has built Academic Pilots as a beacon for students seeking more than just an admission — she builds career legacies.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {['UK Admissions', 'Schengen Expert', 'Embassy Relations'].map((tag) => (
                <span key={tag} className="bg-navy/5 text-navy px-6 py-2 rounded-full font-medium text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <blockquote className="border-l-4 border-gold pl-8 italic">
              <p className="text-navy font-hero text-2xl md:text-3xl text-gold mb-4 leading-snug">
                "We don't just process applications. We architect futures. Every student's journey is a flight path to greatness."
              </p>
              <cite className="text-navy/60 font-mono text-sm uppercase">— Pooja Solanki, Founder</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesGrid = () => {
  const services = [
    { title: "University Selection", icon: <GraduationCap className="w-8 h-8" />, body: "Strategic matching based on career trajectory and ROI." },
    { title: "Application Management", icon: <FileCheck className="w-8 h-8" />, body: "End-to-end processing with zero-error documentation." },
    { title: "Visa Support", icon: <Globe2 className="w-8 h-8" />, body: "Expert guidance for high-stakes embassy interviews." },
    { title: "Pathway Programs", icon: <Compass className="w-8 h-8" />, body: "Bridging the gap to top-tier global institutions." },
    { title: "Pre-Departure", icon: <PlaneTakeoff className="w-8 h-8" />, body: "Full briefing on culture, law, and academic life." },
    { title: "Career Counseling", icon: <Users className="w-8 h-8" />, body: "Post-study work options and industry networking." }
  ];

  return (
    <section id="services" className="py-16 md:py-32 bg-navy/5 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold font-mono uppercase tracking-widest text-sm mb-4 block">EXPERT SERVICES</span>
          <h2 className="text-4xl md:text-5xl text-navy">Comprehensive Guidance</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-5 md:gap-8">
          {services.map((service, i) => (
            <div 
              key={i} 
              className="bg-white p-10 rounded-3xl shadow-sm border border-navy/5 hover:border-gold/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
              <h3 className="text-2xl text-navy mb-4">{service.title}</h3>
              <p className="text-navy/60 leading-relaxed">{service.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Arjun Mehta", country: "United Kingdom", quote: "The precision in my documentation was unmatched. They made a complex process feel calm, clear, and genuinely manageable.", flag: "🇬🇧" },
    { name: "Sarah Khan", country: "United States", quote: "The team helped me understand my options without pushing one path. My profile felt stronger because every step had a reason.", flag: "🇺🇸" },
    { name: "Rahul Varma", country: "Europe", quote: "From shortlisting to visa preparation, Academic Pilots stayed with me through every detail and every deadline.", flag: "🇪🇺" },
    { name: "Nisha Rao", country: "Spain", quote: "I wanted an affordable European route, and they helped me compare the real lifestyle, cost, and career fit before applying.", flag: "🇪🇸" },
    { name: "Kabir Singh", country: "Dubai", quote: "Dubai felt confusing at first, but their guidance made the route practical. I knew exactly what documents and timelines mattered.", flag: "🇦🇪" },
    { name: "Meera Iyer", country: "Australia", quote: "They explained the process in simple language and helped my family understand the bigger picture beyond just admission.", flag: "🇦🇺" },
    { name: "Ayaan Kapoor", country: "United Kingdom", quote: "The best part was how personal it felt. They did not treat my application like a template.", flag: "🇬🇧" },
    { name: "Zara Sheikh", country: "United States", quote: "My application strategy became much sharper after the profile review. It gave me confidence instead of guesswork.", flag: "🇺🇸" }
  ];
  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section className="py-16 md:py-20 bg-navy relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="text-gold font-mono uppercase tracking-widest text-sm mb-3 block">Student Stories</span>
            <h2 className="text-4xl md:text-5xl text-white">Real Journeys, Global Goals</h2>
          </div>
          <p className="text-white/50 max-w-md md:text-right">
            Country-focused guidance, clear paperwork, and steady support from profile review to departure.
          </p>
        </div>
        
        <div className="relative overflow-hidden py-3 testimonial-marquee-mask">
          <div className="testimonial-marquee-track flex w-max items-stretch gap-6">
          {marqueeReviews.map((rev, i) => (
            <div key={`${rev.name}-${i}`} className="flex min-h-[260px] w-[310px] md:w-[360px] shrink-0 flex-col justify-between bg-white/8 backdrop-blur-[2px] p-6 rounded-2xl border border-white/10">
              <div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-gold text-gold" />)}
              </div>
              <p className="text-white font-hero italic text-lg leading-relaxed">"{rev.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-xl">
                  {rev.flag}
                </div>
                <div>
                  <div className="text-white font-bold">{rev.name}</div>
                  <div className="text-gold/60 text-sm font-mono uppercase tracking-widest">{rev.country}</div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Differentiators = () => {
  const blocks = [
    { num: "01", title: "Risk Mitigation", body: "Our zero-error philosophy means we catch issues before the embassy does. Your peace of mind is our priority.", icon: <CheckCircle2 className="w-8 h-8" />, img: imageSrc('risk-mitigation.jpg') },
    { num: "02", title: "Direct Connections", body: "Direct relations with university admissions and embassy liaison offices ensure faster turnaround and accurate info.", icon: <Globe2 className="w-8 h-8" />, img: imageSrc('direct-connections.jpg') },
    { num: "03", title: "Zero-Error Philosophy", body: "Every application undergoes a 3-tier audit process by our senior consultants to ensure perfection.", icon: <FileCheck className="w-8 h-8" />, img: imageSrc('zero-error.jpg') }
  ];

  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {blocks.map((block, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-16 md:mb-32 last:mb-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1 relative">
              <div className="text-gold/10 font-mono text-[180px] absolute -top-24 -left-10 leading-none select-none">
                {block.num}
              </div>
              <div className="relative z-10">
                <div className="text-gold mb-6">{block.icon}</div>
                <h3 className="text-4xl md:text-5xl text-navy mb-6">{block.title}</h3>
                <p className="text-navy/60 text-xl leading-relaxed max-w-lg">{block.body}</p>
              </div>
            </div>
            <div className="flex-1 w-full h-[250px] md:h-[400px] bg-navy/5 rounded-3xl overflow-hidden relative group">
               <img src={block.img} alt={block.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-br from-navy/70 via-navy/20 to-gold/20" />
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy shadow-lg shadow-gold/20">
                    {block.icon}
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    'United Kingdom',
    'United States',
    'Canada',
    'Australia',
    'Dubai / UAE',
    'Spain',
    'Germany',
    'France',
    'Other Europe',
    'Not Sure Yet'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(formData.phone)) newErrors.phone = 'Enter a valid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = `📋 *New Consultation Request* 🎓

━━━━━━━━━━━━━━━━━━

*👤 Name:* ${formData.name}
*📧 Email:* ${formData.email}
*📞 Phone:* ${formData.phone}
*🌍 Destination:* ${formData.country || 'Not specified'}

━━━━━━━━━━━━━━━━━━

*💬 Message:*\n${formData.message || 'No message provided'}

━━━━━━━━━━━━━━━━━━
_Submitted via Academic Pilots Website_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917292022912?text=${encoded}`, '_blank', 'noopener,noreferrer');
    
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', country: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const inputClass = (field: string) => `
    w-full bg-transparent border-b-2 px-1 pb-3 pt-6 text-white placeholder:text-white/25 
    outline-none transition-all duration-300 text-lg
    ${errors[field] ? 'border-red-400/70' : 'border-white/15 focus:border-gold hover:border-white/30'}
  `;

  return (
    <section id="consultation" className="relative py-20 md:py-32 overflow-hidden bg-navy scroll-mt-28">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gold/3 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/3 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/6 to-transparent" />
        {/* Grid pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="form-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#form-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-gold font-mono uppercase tracking-[0.28em] text-sm mb-5 block">Get Started</span>
            <h2 className="text-5xl md:text-7xl text-white font-heading mb-6">
              Book Your Free<br className="md:hidden" /> <i className="font-hero italic text-gold">Consultation</i>
            </h2>
            <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
              Tell us about yourself and we'll map out your global education pathway — no commitment, just clarity.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 xl:gap-20 items-start">
            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative bg-white/[0.04] backdrop-blur-xl rounded-[32px] p-8 md:p-12 border border-white/10 shadow-2xl shadow-black/20">
                {/* Glow accent */}
                <div className="absolute -top-px left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mb-8">
                      <CheckCircle2 className="w-10 h-10 text-gold" />
                    </div>
                    <h3 className="text-3xl text-white font-heading mb-4">Thank You!</h3>
                    <p className="text-white/50 max-w-sm leading-relaxed">
                      Your request has been submitted. We'll connect with you on WhatsApp shortly to discuss your study abroad journey.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-1">
                    <div className="grid md:grid-cols-2 gap-x-8">
                      {/* Name */}
                      <div className="relative">
                        <label className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Full Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="Your full name"
                          className={inputClass('name')}
                        />
                        {errors.name && <p className="text-red-400/80 text-xs mt-2 font-mono">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <label className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Email Address *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="you@example.com"
                          className={inputClass('email')}
                        />
                        {errors.email && <p className="text-red-400/80 text-xs mt-2 font-mono">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-8">
                      {/* Phone */}
                      <div className="relative">
                        <label className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className={inputClass('phone')}
                        />
                        {errors.phone && <p className="text-red-400/80 text-xs mt-2 font-mono">{errors.phone}</p>}
                      </div>

                      {/* Country Dropdown */}
                      <div className="relative">
                        <label className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Target Destination</label>
                        <div className="relative">
                          <select
                            value={formData.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            className={`w-full bg-transparent border-b-2 px-1 pb-3 pt-6 text-white outline-none appearance-none transition-all duration-300 text-lg cursor-pointer ${
                              formData.country ? 'text-white' : 'text-white/25'
                            } border-white/15 focus:border-gold hover:border-white/30`}
                          >
                            <option value="" disabled className="bg-navy text-white/40">Select a country</option>
                            {countries.map((c) => (
                              <option key={c} value={c} className="bg-navy text-white">{c}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-1 bottom-3 w-4 h-4 text-white/30 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative pt-2">
                      <label className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Your Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Tell us about your academic background, preferred countries, or any specific questions..."
                        rows={4}
                        className={`w-full bg-transparent border-b-2 px-1 pb-3 pt-6 text-white placeholder:text-white/25 outline-none transition-all duration-300 text-lg resize-none ${
                          errors.message ? 'border-red-400/70' : 'border-white/15 focus:border-gold hover:border-white/30'
                        }`}
                      />
                    </div>

                    {/* Submit */}
                    <div className="pt-10">
                      <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-full bg-gold px-8 py-5 font-bold text-navy text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          Send via WhatsApp
                          <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-gold via-amber-300 to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </button>
                      <p className="text-white/25 text-xs text-center mt-4 font-mono">
                        Your details are sent securely via WhatsApp · No spam, ever.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="bg-white/[0.04] backdrop-blur-xl rounded-[24px] p-8 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-white text-xl font-heading mb-3">Prefer to text us directly?</h4>
                <p className="text-white/40 leading-relaxed mb-6 text-sm">
                  Reach out on WhatsApp right now — no forms, no waiting.
                </p>
                <a
                  href="https://wa.me/917292022912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-gold hover:text-white transition-colors group font-medium"
                >
                  <span className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741 1.205 1.2-3.645-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 21.75l3.99-1.296a11.838 11.838 0 005.674 1.447h.005c6.554 0 11.89-5.335 11.893-11.892a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  +91 72920 22912
                </a>
              </div>

              <div className="bg-white/[0.04] backdrop-blur-xl rounded-[24px] p-8 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-white text-xl font-heading mb-3">What to expect</h4>
                <ul className="space-y-4">
                  {[
                    'Personalized university shortlist based on your profile',
                    'Transparent fee structure & scholarship opportunities',
                    'Step-by-step application & visa roadmap',
                    'Direct connect with our senior consultants'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span className="text-white/40">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.04] backdrop-blur-xl rounded-[24px] p-8 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-6">
                  <User className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-white text-xl font-heading mb-3">Speak to Pooja</h4>
                <p className="text-white/40 leading-relaxed text-sm">
                  Book a 1-on-1 session with our founder for a deep-dive into your global education strategy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy/95 text-white pt-12 md:pt-24 pb-24 md:pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="cursor-pointer"
                aria-label="Scroll to top"
              >
                <img src={logoSrc} alt="Academic Pilots" className="h-20 w-auto object-contain drop-shadow-logo" />
              </button>
            </div>
            <p className="text-white/60 leading-relaxed mb-8">
              Tailored Paths to Global Careers. Architecting global futures through precision-driven education consultancy.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/academicpilots" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold transition-colors touch-target"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold transition-colors touch-target"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold transition-colors touch-target"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-gold font-mono text-sm uppercase tracking-widest mb-8">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#destinations" onClick={(e) => { e.preventDefault(); scrollToSection('destinations'); }} className="hover:text-white transition-colors touch-target inline-flex items-center">Destinations</a></li>
              <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }} className="hover:text-white transition-colors touch-target inline-flex items-center">Our Process</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="hover:text-white transition-colors touch-target inline-flex items-center">Services</a></li>
              <li><a href="#founder" onClick={(e) => { e.preventDefault(); scrollToSection('founder'); }} className="hover:text-white transition-colors touch-target inline-flex items-center">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gold font-mono text-sm uppercase tracking-widest mb-8">Destinations</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">United Kingdom</a></li>
              <li><a href="#" className="hover:text-white transition-colors">United States</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Europe / Schengen</a></li>
              <li><a href="#" className="hover:text-white transition-colors">UAE / Dubai</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gold font-mono text-sm uppercase tracking-widest mb-8">Contact</h4>
            <ul className="space-y-6 text-white/60">
              <li className="flex gap-4">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span>pooja@academicpilots.com</span>
              </li>
              <li className="flex gap-4">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span>+91 7292022912</span>
              </li>
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <span>Greater Noida, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">© 2025 Academic Pilots. All Rights Reserved.</p>
          <div className="flex gap-8 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setRingPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div 
        className="custom-cursor hidden md:block" 
        style={{ left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)' }} 
      />
      <div 
        className="custom-cursor-ring hidden md:block" 
        style={{ left: `${ringPosition.x}px`, top: `${ringPosition.y}px`, transform: 'translate(-50%, -50%)' }} 
      />
    </>
  );
};

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none">
      <div className="absolute inset-0 bg-white/10" />
      <div
        className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-100 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

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

      // Back-to-top: show after scrolling past 50% of viewport, stays visible forever
      setShowBackToTop(scrolledPastThreshold);

      // WhatsApp/Call: hide when the consultation section comes into view
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

  // Close popups when clicking outside
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
    <>        {/* Left — Call button with popup */}
      <div ref={callBtnRef} className={`fixed bottom-4 md:bottom-8 left-4 md:left-8 z-50 transition-all duration-500 ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <button
          onClick={() => { setCallPopupOpen((prev) => !prev); if (waPopupOpen) setWaPopupOpen(false); }}
          aria-label="Call us"
          className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gold text-navy shadow-xl shadow-gold/30 transition-all duration-300 hover:scale-110 hover:shadow-gold/50"
        >
          <Phone className="pointer-events-none h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:scale-110" />
        </button>

        {/* Call Popup */}
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

      {/* Right — WhatsApp popup + back to top */}
      <div ref={waBtnRef} className={`fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-3 transition-all duration-500 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="relative">
          {/* WhatsApp button and popup — same structure as call button */}
          <button
            onClick={() => { setWaPopupOpen((prev) => !prev); if (callPopupOpen) setCallPopupOpen(false); }}
            aria-label="Chat on WhatsApp"
            className={`group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/50 ${showActions ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <WhatsAppIcon />
          </button>

          {/* WhatsApp Popup */}
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
          {/* Expanding sonar rings */}
          <span className="absolute inset-0 rounded-full border border-gold/30 opacity-0 group-hover:opacity-100 group-hover:scale-[1.8] transition-all duration-700 ease-out pointer-events-none" />
          <span className="absolute inset-0 rounded-full border-2 border-gold/10 opacity-0 group-hover:opacity-60 group-hover:scale-[1.4] transition-all duration-500 delay-75 ease-out pointer-events-none" />
          {/* Shine overlay */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/15 to-white/0 opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 ease-out pointer-events-none" />
          
          <ArrowUp className="relative z-10 h-5 w-5 md:h-6 md:w-6 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-125" />
        </button>
      </div>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="relative">
          <ScrollProgressBar />
          <CustomCursor />
          <FloatingButtons />
          <Navbar />
          <Hero />
          <Stats />
          <ProcessSection />
          <DestinationSection />
          <FounderSpotlight />
          <ServicesGrid />
          <Testimonials />
          <Differentiators />
          <ConsultationForm />
          <Footer />
        </div>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
