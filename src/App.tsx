import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  Star,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-navy/95 backdrop-blur-xl py-4 shadow-xl' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/uploads/upload_1.png" alt="Academic Pilots" className="h-14 w-auto brightness-0 invert" />
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Destinations', 'Process', 'Founder', 'Services'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-white/80 hover:text-gold transition-colors text-sm font-medium tracking-wide"
            >
              {item}
            </a>
          ))}
          <button className="bg-gold hover:bg-gold/90 text-navy px-6 py-2.5 rounded-full font-semibold text-sm transition-all transform hover:scale-105">
            Book Consultation
          </button>
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
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/temphero.mp4" type="video/mp4" />
      </video>
      
      <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-xs font-mono tracking-widest uppercase">✈ Tailored Paths to Global Careers</span>
        </div>
        
        <h1 
          ref={h1Ref}
          className="text-white font-hero text-5xl md:text-8xl leading-tight mb-8 max-w-5xl"
        >
          Your Flight Path to a Global Career Starts Here.
        </h1>
        
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-12 font-body font-light leading-relaxed">
          Expert career-first guidance to top universities — UK, USA, Europe, UAE. We don't just process applications, we architect futures.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6">
          <button className="bg-gold text-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg shadow-gold/20">
            Book Free Consultation
          </button>
          <button className="border border-gold text-gold px-10 py-4 rounded-full font-bold text-lg hover:bg-gold/10 transition-all flex items-center justify-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
              <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-gold border-b-4 border-b-transparent ml-1" />
            </span>
            Watch Story
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
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
    <section className="bg-navy py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16 text-center mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-gold font-mono text-7xl md:text-8xl font-bold mb-4">
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

      const totalWidth = scrollContainer.scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        }
      });

      // Animate the "flight line" connecting cards
      gsap.fromTo(".flight-line-path", 
        { strokeDashoffset: 2000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative h-screen bg-navy overflow-hidden">
      <div className="absolute top-20 left-10 z-20">
        <span className="text-gold font-mono uppercase tracking-[0.3em] text-xs mb-2 block">The Journey</span>
        <h2 className="text-5xl text-white font-heading">Our Flight Path</h2>
      </div>

      <div ref={scrollContainerRef} className="flex h-full items-center px-[10vw] gap-[15vw] relative">
        {/* Background Flight Path SVG */}
        <div className="absolute top-1/2 left-0 w-[400vw] -translate-y-1/2 pointer-events-none opacity-20 z-0">
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
          <div key={i} className="flex-shrink-0 w-[400px] md:w-[500px] relative z-10 group">
            <div className="relative glass p-12 rounded-[40px] border border-white/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-4">
              <div className="absolute -top-10 -left-10 text-[120px] font-mono text-white/5 font-bold leading-none select-none group-hover:text-gold/10 transition-colors">
                {step.num}
              </div>
              
              <div className="mb-10 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                {step.icon}
              </div>
              
              <h3 className="text-white text-4xl mb-2 font-heading">{step.title}</h3>
              <div className="text-gold font-mono text-sm uppercase tracking-widest mb-6">{step.sub}</div>
              
              <p className="text-white/60 text-lg leading-relaxed">
                {step.body}
              </p>
              
              <div className="mt-10 flex items-center gap-4 text-gold/40 font-mono text-xs uppercase tracking-tighter group-hover:text-gold transition-colors">
                <span>Phase {step.num}</span>
                <div className="flex-1 h-[1px] bg-gold/10 group-hover:bg-gold/30" />
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
        
        {/* Final Destination Card */}
        <div className="flex-shrink-0 w-[400px] md:w-[600px] relative z-10">
          <div className="bg-gold p-16 rounded-[40px] text-navy">
            <h3 className="text-5xl font-heading mb-6">Ready for Takeoff?</h3>
            <p className="text-navy/80 text-xl mb-10 leading-relaxed font-medium">
              Your global career is just one consultation away. Let's map your future together.
            </p>
            <button className="bg-navy text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-navy/90 transition-all transform hover:scale-105">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const DestinationSection = () => {
  const destinations = [
    { id: 'london', name: 'London', img: '/images/london.jpg', tags: 'UK · 9+ Years · Direct Embassy', coords: { x: 48, y: 32 } },
    { id: 'nyc', name: 'New York', img: '/images/nyc.jpg', tags: 'USA · Ivy League · Top Tier', coords: { x: 25, y: 38 } },
    { id: 'dubai', name: 'Dubai', img: '/images/dubai.jpg', tags: 'UAE · Career Hub · No IELTS', coords: { x: 62, y: 48 } },
    { id: 'barcelona', name: 'Barcelona', img: '/images/barcelona.jpg', tags: 'Spain · Schengen · Tech Focus', coords: { x: 48, y: 40 } },
    { id: 'nairobi', name: 'Nairobi', img: '/images/nairobi.jpg', tags: 'Kenya · Global Network · Rising', coords: { x: 58, y: 62 } }
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

const FounderSpotlight = () => {
  return (
    <section id="founder" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-10 border-2 border-gold/20 rounded-full scale-110 -z-10" />
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              <img 
                src="/images/founder.jpeg" 
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
            
            <p className="text-navy/70 text-xl leading-relaxed mb-10">
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
              <p className="text-navy font-hero text-3xl text-gold mb-4 leading-snug">
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
    <section id="services" className="py-32 bg-navy/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold font-mono uppercase tracking-widest text-sm mb-4 block">EXPERT SERVICES</span>
          <h2 className="text-5xl text-navy">Comprehensive Guidance</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
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
    { name: "Arjun Mehta", uni: "LSE, London", quote: "The precision in my visa documentation was unmatched. They made a complex process feel like a breeze.", flag: "🇬🇧" },
    { name: "Sarah Khan", uni: "Columbia, NY", quote: "Pooja's insights into US admissions changed my entire strategy. I landed my dream Ivy League spot.", flag: "🇺🇸" },
    { name: "Rahul Varma", uni: "INSEAD, France", quote: "From profile building to post-landing support, Academic Pilots were with me every step of the way.", flag: "🇫🇷" }
  ];

  return (
    <section className="py-32 bg-navy relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl text-white">Student Stories</h2>
        </div>
        
        <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar">
          {reviews.map((rev, i) => (
            <div key={i} className="min-w-[400px] glass p-10 rounded-3xl border border-white/10">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-gold text-gold" />)}
              </div>
              <p className="text-white font-hero italic text-2xl mb-8 leading-relaxed">"{rev.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-2xl">
                  {rev.flag}
                </div>
                <div>
                  <div className="text-white font-bold">{rev.name}</div>
                  <div className="text-gold/60 text-sm font-mono">{rev.uni}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Differentiators = () => {
  const blocks = [
    { num: "01", title: "Risk Mitigation", body: "Our zero-error philosophy means we catch issues before the embassy does. Your peace of mind is our priority.", icon: <CheckCircle2 className="w-8 h-8" /> },
    { num: "02", title: "Direct Connections", body: "Direct relations with university admissions and embassy liaison offices ensure faster turnaround and accurate info.", icon: <Globe2 className="w-8 h-8" /> },
    { num: "03", title: "Zero-Error Philosophy", body: "Every application undergoes a 3-tier audit process by our senior consultants to ensure perfection.", icon: <FileCheck className="w-8 h-8" /> }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        {blocks.map((block, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-center gap-20 mb-32 last:mb-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
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
            <div className="flex-1 w-full h-[400px] bg-navy/5 rounded-3xl overflow-hidden relative group">
               <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-navy/5 transition-colors group-hover:from-gold/10 group-hover:to-navy/10" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border border-gold/20 rounded-full animate-ping" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CTABanner = () => {
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-white text-5xl md:text-8xl mb-12 font-heading">
          Ready to Chart Your <i className="font-hero italic text-gold">Course?</i>
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button className="bg-gold text-navy px-12 py-5 rounded-full font-bold text-xl hover:bg-white transition-all transform hover:scale-105 shadow-2xl shadow-gold/30">
            Book Free Consultation
          </button>
          <button className="border border-white/30 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
             <MessageSquare className="w-6 h-6" />
             WhatsApp Us
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <img src="/uploads/upload_1.png" alt="Academic Pilots" className="h-16 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/60 leading-relaxed mb-8">
              Tailored Paths to Global Careers. Architecting global futures through precision-driven education consultancy.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/academicpilots" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-gold font-mono text-sm uppercase tracking-widest mb-8">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Our Process</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#founder" className="hover:text-white transition-colors">About Us</a></li>
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

function App() {
  return (
    <div className="relative">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Stats />
      <ProcessSection />
      <DestinationSection />
      <FounderSpotlight />
      <ServicesGrid />
      <Testimonials />
      <Differentiators />
      <CTABanner />
      <Footer />
    </div>
  );
}

export default App;
