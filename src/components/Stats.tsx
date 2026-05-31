import React, { useEffect, useRef, useState } from 'react';

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}</span>;
};

const Stats = () => {
  const stats = [
    { value: 99, suffix: '+', label: 'Universities' },
    { value: 15, suffix: '+', label: 'Years' },
    { value: 5, suffix: '', label: 'Destinations' },
  ];

  return (
    <section className="bg-navy py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16 text-center mb-10 md:mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-gold font-mono text-5xl md:text-8xl font-bold mb-2 md:mb-4">
                <Counter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-white/60 text-lg uppercase tracking-widest font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white/40 font-hero italic text-2xl md:text-3xl">
            &ldquo;Every number represents a future we shaped.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
