import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { scrollToSection } from '../utils/constants';
import OptimizedImage from './OptimizedImage';

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
                <OptimizedImage name="logo-transparent" ext="png" alt="Academic Pilots" className="h-20 w-auto object-contain drop-shadow-logo" />
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
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Unit+No-F-55,+11Tth+Floor,+Urbetech,+NPX,+sector+-153,+Alpha+Greater+Noida,+Noida,+Gautam+Buddha+Nagar201310,+Uttar+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Unit No-F-55, 11Tth Floor, Urbetech, NPX, sector -153, Alpha Greater Noida, Noida, Gautam Buddha Nagar201310, Uttar Pradesh
                </a>
              </li>
            </ul>

            <h4 className="text-gold font-mono text-sm uppercase tracking-widest mb-6 mt-10">Company Details</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><span className="text-white/80 font-medium">GST:</span> 09AANCT1112G1ZH</li>
              <li><span className="text-white/80 font-medium">CIN:</span> U85500UW2026PTC252704</li>
              <li><span className="text-white/80 font-medium">PAN:</span> AANCT1112G</li>
              <li><span className="text-white/80 font-medium">TAN:</span> MRTT08252G</li>
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

export default Footer;
