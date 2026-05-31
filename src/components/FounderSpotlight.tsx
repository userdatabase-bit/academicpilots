import OptimizedImage from './OptimizedImage';

const FounderSpotlight = () => {
  return (
    <section id="founder" className="py-16 md:py-32 bg-white overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-10 border-2 border-gold/20 rounded-full scale-110 -z-10" />
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              <OptimizedImage name="founder" ext="jpeg" alt="Pooja Solanki" className="w-full h-full object-cover" />
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

export default FounderSpotlight;
