import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Compass,
  FileCheck,
  PlaneTakeoff,
  ArrowRight,
} from 'lucide-react';
import { scrollToSection } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: '01',
      icon: <Users className="w-12 h-12 text-gold" />,
      title: 'Profile Analysis',
      sub: 'We Map Your Ambitions',
      body: 'Deep dive into your academic history, career goals, and personal preferences to build a strategic profile.',
    },
    {
      num: '02',
      icon: <Compass className="w-12 h-12 text-gold" />,
      title: 'University Matching',
      sub: '99+ Unis. One Right Fit.',
      body: 'Using our proprietary matching engine to find institutions that align with your career trajectory and budget.',
    },
    {
      num: '03',
      icon: <FileCheck className="w-12 h-12 text-gold" />,
      title: 'Application & Visa',
      sub: 'Zero-Error Execution',
      body: 'Meticulous documentation and embassy-aligned processing to ensure the highest success rates in the industry.',
    },
    {
      num: '04',
      icon: <PlaneTakeoff className="w-12 h-12 text-gold" />,
      title: 'Touchdown Support',
      sub: 'From Takeoff to Landing',
      body: 'Pre-departure briefings, accommodation assistance, and on-ground network connections for your new home.',
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Reset horizontal scroll on mount
    gsap.set(scrollContainer, { x: 0 });

    const ctx = gsap.context(() => {
      const getTotalWidth = () => {
        const lastItem = scrollContainer.lastElementChild as HTMLElement | null;
        if (!lastItem) return 0;
        const finalRightEdge = lastItem.offsetLeft + lastItem.offsetWidth;
        return Math.max(
          0,
          finalRightEdge - window.innerWidth + window.innerWidth * 0.06
        );
      };

      const getHold = () => window.innerHeight * 0.6;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: 'top 8%',
          end: () => `+=${getTotalWidth() + getHold() * 2}`,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(scrollContainer, { x: 0, duration: getHold, ease: 'none' })
        .to(scrollContainer, {
          x: () => -getTotalWidth(),
          duration: getTotalWidth,
          ease: 'none',
        })
        .to(scrollContainer, {
          x: () => -getTotalWidth(),
          duration: getHold,
          ease: 'none',
        });

      gsap.fromTo(
        '.flight-line-path',
        { strokeDashoffset: 2000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 8%',
            end: () => `+=${getTotalWidth()}`,
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative min-h-screen md:h-screen bg-navy scroll-mt-28"
    >
      <div className="absolute top-8 md:top-10 left-6 md:left-10 z-20 pointer-events-none">
        <span className="text-gold font-mono uppercase tracking-[0.3em] text-xs mb-2 block">
          The Journey
        </span>
        <h2 className="text-4xl md:text-5xl text-white font-heading">
          Our Flight Path
        </h2>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex h-full items-center pl-[10vw] pr-[6vw] gap-[6vw] md:gap-[12vw] pt-20 md:pt-40 relative"
        >
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
            <div
              key={i}
              className="flex-shrink-0 w-[80vw] md:w-[400px] lg:w-[500px] relative z-10 group"
            >
              <div className="relative bg-white/12 backdrop-blur-none md:bg-white/10 md:backdrop-blur-md p-6 md:p-12 rounded-[24px] md:rounded-[40px] border border-white/10 md:border-white/20 hover:border-gold/30 transition-all duration-500 hover:-translate-y-4">
                <div className="absolute -top-5 md:-top-10 -left-4 md:-left-10 text-[60px] md:text-[120px] font-mono text-white/5 font-bold leading-none select-none group-hover:text-gold/10 transition-colors">
                  {step.num}
                </div>

                <div className="mb-6 md:mb-10 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                  {React.cloneElement(
                    step.icon as React.ReactElement<{ className?: string }>,
                    {
                      className:
                        'w-8 h-8 md:w-12 md:h-12 text-gold',
                    }
                  )}
                </div>

                <h3 className="text-white text-2xl md:text-4xl mb-2 font-heading">
                  {step.title}
                </h3>
                <div className="text-gold font-mono text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6">
                  {step.sub}
                </div>

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

          <div className="flex-shrink-0 w-[80vw] md:w-[500px] lg:w-[600px] relative z-10">
            <div className="bg-gold p-8 md:p-16 rounded-[24px] md:rounded-[40px] text-navy">
              <h3 className="text-3xl md:text-5xl font-heading mb-4 md:mb-6">
                Ready for Takeoff?
              </h3>
              <p className="text-navy/80 text-base md:text-xl mb-8 md:mb-10 leading-relaxed font-medium">
                Your global career is just one consultation away. Let's map your
                future together.
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

export default ProcessSection;
