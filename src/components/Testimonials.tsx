import { Star } from 'lucide-react';

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

export default Testimonials;
