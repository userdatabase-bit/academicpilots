import {
  GraduationCap,
  FileCheck,
  Globe2,
  Compass,
  PlaneTakeoff,
  Users,
} from 'lucide-react';

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

export default ServicesGrid;
