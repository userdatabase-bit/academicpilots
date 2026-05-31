import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';

// Eager-loaded — above the fold, needed immediately
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import FloatingButtons from './components/FloatingButtons';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';

// Lazy-loaded — below the fold, code-split into separate chunks
const ProcessSection = React.lazy(() => import('./components/ProcessSection'));
const DestinationSection = React.lazy(() => import('./components/DestinationSection'));
const FounderSpotlight = React.lazy(() => import('./components/FounderSpotlight'));
const ServicesGrid = React.lazy(() => import('./components/ServicesGrid'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Differentiators = React.lazy(() => import('./components/Differentiators'));
const ConsultationForm = React.lazy(() => import('./components/ConsultationForm'));
const Footer = React.lazy(() => import('./components/Footer'));

// Simple minimal placeholder shown while a section loads
const SectionFallback = () => (
  <div className="flex items-center justify-center py-32 bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      <span className="text-navy/30 text-xs font-mono uppercase tracking-widest">Loading…</span>
    </div>
  </div>
);

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
          <Suspense fallback={<SectionFallback />}>
            <ProcessSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <DestinationSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <FounderSpotlight />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ServicesGrid />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Differentiators />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ConsultationForm />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Footer />
          </Suspense>
        </div>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
