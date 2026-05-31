import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Globe2, ChevronLeft, ChevronRight } from 'lucide-react';
import { imageSrc } from '../utils/constants';
import OptimizedImage from './OptimizedImage';
import type { Destination } from '../types';

gsap.registerPlugin(ScrollTrigger);

// --- Leaflet Map Component ---

const DestinationLeafletMap = ({
  destinations,
  activeId,
  onSelect,
  onReset,
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
      worldCopyJump: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 6,
      className: 'destination-map-tiles',
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    map.on('click', onReset);

    const allBounds = L.latLngBounds(destinations.map((d) => d.center));
    map.fitBounds(allBounds, { padding: [30, 30], maxZoom: 3 });

    destinations.forEach((dest) => {
      const marker = L.marker(dest.center, {
        icon: L.divIcon({
          className: 'destination-marker',
          html: `<span>${dest.shortName}</span>`,
          iconSize: [84, 36],
          iconAnchor: [42, 18],
        }),
      }).addTo(map);

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
      const allBounds = L.latLngBounds(destinations.map((d) => d.center));
      map.fitBounds(allBounds, {
        padding: [30, 30],
        maxZoom: 3,
        animate: true,
        duration: 1,
      });
    } else {
      map.flyTo(activeDest.center, activeDest.zoom, {
        animate: true,
        duration: 1,
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
        const selected = destinations.find(
          (dest) => marker === markersRef.current[dest.id]
        );
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

// --- Mobile Swipeable Carousel ---

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
    dragFree: true,
    dragThreshold: 5,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelectHandler = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelectHandler);
    emblaApi.on('reInit', onSelectHandler);
    onSelectHandler();
    return () => {
      emblaApi.off('select', onSelectHandler);
      emblaApi.off('reInit', onSelectHandler);
    };
  }, [emblaApi, onSelectHandler]);

  useEffect(() => {
    if (!emblaApi || !showSwipeHint) return;
    const dismiss = () => setShowSwipeHint(false);
    emblaApi.on('pointerDown', dismiss);
    emblaApi.on('select', dismiss);
    const timer = setTimeout(dismiss, 3000);
    return () => {
      emblaApi.off('pointerDown', dismiss);
      emblaApi.off('select', dismiss);
      clearTimeout(timer);
    };
  }, [emblaApi, showSwipeHint]);

  const handleSlideClick = useCallback(
    (destId: string) => {
      if (!emblaApi) return;
      onSelect(destId);
    },
    [emblaApi, onSelect]
  );

  const handleSlideKeyDown = useCallback(
    (destId: string, e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(destId);
      }
    },
    [onSelect]
  );

  return (
    <div className="md:hidden -mx-6 relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-white via-white/80 to-transparent" />

      <button
        type="button"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className={`absolute left-1 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-navy/80 text-gold backdrop-blur-sm border border-gold/30 shadow-lg shadow-black/20 transition-all duration-300 ${
          prevBtnEnabled
            ? 'opacity-100 hover:bg-gold hover:text-navy hover:scale-110'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Previous destination"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        className={`absolute right-1 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-navy/80 text-gold backdrop-blur-sm border border-gold/30 shadow-lg shadow-black/20 transition-all duration-300 ${
          nextBtnEnabled
            ? 'opacity-100 hover:bg-gold hover:text-navy hover:scale-110'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Next destination"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="overflow-hidden [touch-action:pan-y]" ref={emblaRef}>
        <div className="flex">
          {destinations.map((dest, i) => (
            <div
              key={dest.id}
              className="flex-[0_0_80%] min-w-0 pl-6 select-none"
            >
              <motion.div
                role="button"
                tabIndex={0}
                onClick={() => handleSlideClick(dest.id)}
                onKeyDown={(e) => handleSlideKeyDown(dest.id, e)}
                aria-label={`Select ${dest.name} destination`}
                animate={
                  i === 0 && showSwipeHint
                    ? {
                        x: [0, -20, 0],
                        transition: {
                          duration: 1.2,
                          ease: 'easeInOut',
                          delay: 0.8,
                          repeat: 1,
                          repeatDelay: 0.4,
                        },
                      }
                    : { x: 0 }
                }
                className={`relative w-full h-[400px] rounded-[28px] overflow-hidden cursor-pointer text-left border-2 transition-colors duration-500 ${
                  activeId === dest.id ? 'border-gold' : 'border-navy/10'
                }`}
              >
                <OptimizedImage
                  name={dest.imageName}
                  ext="jpg"
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent opacity-90 pointer-events-none" />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                    activeId === dest.id
                      ? 'bg-gold/20 opacity-100'
                      : 'opacity-0 group-hover:opacity-100 bg-gold/10'
                  }`}
                />

                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <div className="text-gold font-mono text-xs uppercase tracking-[0.22em] mb-2">
                    {dest.shortName}
                  </div>
                  <h3 className="text-white font-hero italic text-3xl mb-3">
                    {dest.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dest.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-widest text-white/70 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={
          showSwipeHint
            ? {
                opacity: [0, 1, 1, 0],
                y: [10, 0, 0, -5],
                transition: {
                  duration: 3.5,
                  ease: 'easeInOut',
                  delay: 1.5,
                  times: [0, 0.15, 0.7, 1],
                },
              }
            : { opacity: 0, y: -5 }
        }
        className="flex items-center justify-center gap-2 mt-3 text-navy/40 text-xs font-mono uppercase tracking-[0.18em]"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span>Swipe to explore</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </motion.div>

      <div className="flex items-center justify-center gap-2.5 mt-4 px-6">
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

// --- Main Destination Section ---

const destinationsData: Destination[] = [
  {
    id: 'uk',
    name: 'United Kingdom',
    shortName: 'UK',
    image: imageSrc('london.jpg'),
    imageName: 'london',
    tags: ['Career-focused', 'Shorter programs', 'Strong alumni routes'],
    center: [54.5, -3.4],
    zoom: 4,
    features: [
      'Globally understood degrees with career-ready program structures.',
      'One-year master routes can reduce living cost and time away.',
      'Strong part-time work culture and post-study career pathways.',
    ],
  },
  {
    id: 'spain',
    name: 'Spain',
    shortName: 'Spain',
    image: imageSrc('barcelona.jpg'),
    imageName: 'barcelona',
    tags: ['Schengen access', 'Affordable lifestyle', 'Warm student cities'],
    center: [40.4, -3.7],
    zoom: 5,
    features: [
      'Practical European study routes with an accessible cost of living.',
      'Schengen-region exposure helps students build wider global mobility.',
      'A strong fit for hospitality, business, design, tech, and language growth.',
    ],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    shortName: 'Dubai',
    image: imageSrc('dubai.jpg'),
    imageName: 'dubai',
    tags: ['Close to India', 'Business hub', 'Fast-growing market'],
    center: [25.2, 55.3],
    zoom: 6,
    features: [
      'A global business environment with strong internship visibility.',
      'Closer travel, familiar regional networks, and modern student facilities.',
      'Good route for students who want international exposure near home.',
    ],
  },
  {
    id: 'usa',
    name: 'United States',
    shortName: 'USA',
    image: imageSrc('nyc.jpg'),
    imageName: 'nyc',
    tags: ['Flexible pathways', 'Research culture', 'Large job market'],
    center: [39.8, -98.6],
    zoom: 3,
    features: [
      'Flexible academic pathways for students still shaping their specialization.',
      'Large professional market with exposure to innovation-led industries.',
      'Strong fit for STEM, business, healthcare, media, and entrepreneurship.',
    ],
  },
  {
    id: 'australia',
    name: 'Australia',
    shortName: 'Australia',
    image: imageSrc('australia.jpg'),
    imageName: 'australia',
    tags: ['Student-friendly', 'Work options', 'Clear pathways'],
    center: [-25.3, 133.8],
    zoom: 4,
    features: [
      'Student-friendly cities with structured work and settlement pathways.',
      'Clear application cycles and practical programs across key industries.',
      'Popular for students seeking quality of life with international exposure.',
    ],
  },
  {
    id: 'europe',
    name: 'Europe',
    shortName: 'Europe',
    image: imageSrc('europe.jpg'),
    imageName: 'europe',
    tags: ['Multiple routes', 'Cultural mobility', 'Value-led choices'],
    center: [48.5, 12.5],
    zoom: 4,
    features: [
      'Multiple country pathways for students comparing cost, language, and career goals.',
      'Excellent cultural exposure with access to varied industries and lifestyles.',
      'Good fit when students want options beyond a single destination track.',
    ],
  },
];

const DestinationSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const selectDest = (id: string) => {
    setActiveId((currentId) => currentId === id ? null : id);
  };

  const resetMap = () => {
    setActiveId(null);
  };

  const activeDest = destinationsData.find((dest) => dest.id === activeId);
  const profileDest = activeDest ?? destinationsData[0];

  const cardsSectionRef = useRef<HTMLElement>(null);
  const cardsViewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const section = cardsSectionRef.current;
    const viewport = cardsViewportRef.current;
    const rail = railRef.current;
    if (!section || !viewport || !rail) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, rail.scrollWidth - viewport.clientWidth);
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
            const index = Math.min(
              destinationsData.length - 1,
              Math.round(self.progress * (destinationsData.length - 1))
            );
            // Only update if user had already selected something
            // This is handled by the parent via selectDest
          },
        },
      });

      timeline
        .to(rail, { x: 0, duration: getHold, ease: 'none' })
        .to(rail, {
          x: () => -getDistance(),
          duration: getDistance,
          ease: 'none',
        })
        .to(rail, {
          x: () => -getDistance(),
          duration: getHold,
          ease: 'none',
        });
    }, section);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="destinations"
      className="py-24 bg-white overflow-hidden scroll-mt-28"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <span className="text-gold font-mono uppercase tracking-widest text-sm mb-4 block">
            Global Reach
          </span>
          <h2 className="text-5xl md:text-6xl text-navy mb-6">
            Choose Your Study Destination
          </h2>
          <p className="text-navy/60 text-xl leading-relaxed">
            Explore the countries and regions we guide for, then compare the
            practical advantages that matter before you apply.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-stretch mb-14">
          <div className="relative min-h-[400px] md:min-h-[560px] bg-navy overflow-hidden rounded-[32px] border border-navy/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(212,160,23,0.25),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.12),transparent_28%)]" />
            <div className="absolute top-8 left-8 right-8 z-10 flex items-center justify-between gap-6">
              <div>
                <div className="text-gold font-mono text-xs uppercase tracking-[0.24em] mb-2">
                  Interactive Leaflet Map
                </div>
                <div className="text-white text-3xl font-heading">
                  {activeDest ? activeDest.name : 'Global Overview'}
                </div>
              </div>
              <Globe2 className="w-8 h-8 text-gold" />
            </div>
            <DestinationLeafletMap
              destinations={destinationsData}
              activeId={activeId}
              onSelect={selectDest}
              onReset={resetMap}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-navy to-transparent" />
          </div>

          <motion.div
            key={activeDest?.id ?? 'overview'}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-navy text-white p-8 md:p-10 rounded-[32px] relative overflow-hidden"
          >
            <OptimizedImage
              name={profileDest.imageName}
              ext="jpg"
              alt={profileDest.name}
              className="absolute inset-0 h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/92 to-navy/70" />
            <div className="relative z-10">
              <div className="text-gold font-mono text-xs uppercase tracking-[0.24em] mb-5">
                {activeDest ? 'Destination Profile' : 'Global Coverage'}
              </div>
              <h3 className="text-4xl md:text-5xl font-heading mb-5">
                {activeDest ? activeDest.name : 'Where We Guide'}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {destinationsData.map((dest) => (
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
                    <span
                      key={tag}
                      className="border border-gold/30 bg-gold/10 text-gold px-3 py-1 rounded-full text-[11px] uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="space-y-5">
                {(activeDest
                  ? activeDest.features
                  : [
                      'Click a highlighted destination to zoom into countries and regions we support.',
                      'Click the active destination again to return to the whole-world view.',
                      'Click anywhere outside our destination markers to reset and compare the full coverage map.',
                    ]
                ).map((feature, index) => (
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

        <section
          id="destination-cards"
          ref={cardsSectionRef}
          className="min-h-screen overflow-hidden pt-10 pb-10 flex flex-col justify-center"
        >
          <div className="mb-8 flex items-end justify-between gap-8">
            <div>
              <span className="text-gold font-mono uppercase tracking-widest text-sm mb-3 block">
                Destination Cards
              </span>
              <h3 className="text-4xl md:text-5xl text-navy">
                Compare Every Country
              </h3>
            </div>
            <p className="hidden max-w-md text-right text-navy/55 lg:block">
              Scroll down here to move sideways through every country we
              support.
            </p>
          </div>

          <MobileDestinationCarousel
            destinations={destinationsData}
            activeId={activeId}
            onSelect={selectDest}
          />

          <div
            ref={cardsViewportRef}
            className="overflow-hidden hidden md:block"
          >
            <div ref={railRef} className="flex w-max gap-6 will-change-transform">
              {destinationsData.map((dest) => (
                <motion.button
                  id={`dest-${dest.id}`}
                  key={dest.id}
                  type="button"
                  onClick={() => selectDest(dest.id)}
                  whileHover={{ y: -10 }}
                  animate={{
                    scale: activeId === dest.id ? 1.02 : 1,
                    borderColor:
                      activeId === dest.id
                        ? 'rgba(212,160,23,1)'
                        : 'rgba(10,22,40,0.08)',
                  }}
                  className="flex-shrink-0 w-[280px] md:w-[360px] h-[460px] relative rounded-[28px] overflow-hidden group snap-center border-2 text-left transition-colors duration-500"
                >
                  <OptimizedImage
                    name={dest.imageName}
                    ext="jpg"
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent opacity-90" />
                  <div
                    className={`absolute inset-0 bg-gold/10 transition-opacity duration-500 ${
                      activeId === dest.id
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-gold font-mono text-xs uppercase tracking-[0.22em] mb-3">
                      {dest.shortName}
                    </div>
                    <h3 className="text-white font-hero italic text-4xl mb-4">
                      {dest.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {dest.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-widest text-white/70 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
                        >
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

export default DestinationSection;
