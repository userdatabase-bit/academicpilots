import React from 'react';
import { CheckCircle2, Globe2, FileCheck } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const Differentiators = () => {
  const blocks = [
    { num: "01", title: "Risk Mitigation", body: "Our zero-error philosophy means we catch issues before the embassy does. Your peace of mind is our priority.", icon: <CheckCircle2 className="w-8 h-8" />, img: 'risk-mitigation' },
    { num: "02", title: "Direct Connections", body: "Direct relations with university admissions and embassy liaison offices ensure faster turnaround and accurate info.", icon: <Globe2 className="w-8 h-8" />, img: 'direct-connections' },
    { num: "03", title: "Zero-Error Philosophy", body: "Every application undergoes a 3-tier audit process by our senior consultants to ensure perfection.", icon: <FileCheck className="w-8 h-8" />, img: 'zero-error' }
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
                <div className="text-gold mb-6">{React.cloneElement(block.icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8' })}</div>
                <h3 className="text-4xl md:text-5xl text-navy mb-6">{block.title}</h3>
                <p className="text-navy/60 text-xl leading-relaxed max-w-lg">{block.body}</p>
              </div>
            </div>
            <div className="flex-1 w-full h-[250px] md:h-[400px] bg-navy/5 rounded-3xl overflow-hidden relative group">
               <OptimizedImage name={block.img} ext="jpg" alt={block.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-br from-navy/70 via-navy/20 to-gold/20" />
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy shadow-lg shadow-gold/20">
                    {React.cloneElement(block.icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Differentiators;
