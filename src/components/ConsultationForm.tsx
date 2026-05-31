import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Send,
  MessageSquare,
  BookOpen,
  User,
  ChevronDown,
  MapPin,
} from 'lucide-react';

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    'United Kingdom',
    'United States',
    'Canada',
    'Australia',
    'Dubai / UAE',
    'Spain',
    'Germany',
    'France',
    'Other Europe',
    'Not Sure Yet'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(formData.phone)) newErrors.phone = 'Enter a valid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = `📋 *New Consultation Request* 🎓\n\n━━━━━━━━━━━━━━━━━━\n\n*👤 Name:* ${formData.name}\n*📧 Email:* ${formData.email}\n*📞 Phone:* ${formData.phone}\n*🌍 Destination:* ${formData.country || 'Not specified'}\n\n━━━━━━━━━━━━━━━━━━\n\n*💬 Message:*\n${formData.message || 'No message provided'}\n\n━━━━━━━━━━━━━━━━━━\n_Submitted via Academic Pilots Website_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917292022912?text=${encoded}`, '_blank', 'noopener,noreferrer');
    
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', country: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const inputClass = (field: string) => `
    w-full bg-transparent border-b-2 px-1 pb-3 pt-6 text-white placeholder:text-white/25 
    outline-none transition-all duration-300 text-lg
    ${errors[field] ? 'border-red-400/70' : 'border-white/15 focus:border-gold hover:border-white/30'}
  `;

  return (
    <section id="consultation" className="relative py-20 md:py-32 overflow-hidden bg-navy scroll-mt-28">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gold/3 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/3 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/6 to-transparent" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="form-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#form-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold font-mono uppercase tracking-[0.28em] text-sm mb-5 block">Get Started</span>
            <h2 className="text-5xl md:text-7xl text-white font-heading mb-6">
              Book Your Free<br className="md:hidden" /> <i className="font-hero italic text-gold">Consultation</i>
            </h2>
            <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
              Tell us about yourself and we'll map out your global education pathway — no commitment, just clarity.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 xl:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative bg-white/[0.04] backdrop-blur-xl rounded-[32px] p-8 md:p-12 border border-white/10 shadow-2xl shadow-black/20">
                <div className="absolute -top-px left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mb-8">
                      <CheckCircle2 className="w-10 h-10 text-gold" />
                    </div>
                    <h3 className="text-3xl text-white font-heading mb-4">Thank You!</h3>
                    <p className="text-white/50 max-w-sm leading-relaxed">
                      Your request has been submitted. We'll connect with you on WhatsApp shortly to discuss your study abroad journey.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-1">
                    <div className="grid md:grid-cols-2 gap-x-8">
                      <div className="relative">
                        <label htmlFor="consult-name" className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Full Name *</label>
                        <input
                          id="consult-name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="Your full name"
                          autoComplete="name"
                          className={inputClass('name')}
                        />
                        {errors.name && <p className="text-red-400/80 text-xs mt-2 font-mono">{errors.name}</p>}
                      </div>

                      <div className="relative">
                        <label htmlFor="consult-email" className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Email Address *</label>
                        <input
                          id="consult-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="you@example.com"
                          autoComplete="email"
                          className={inputClass('email')}
                        />
                        {errors.email && <p className="text-red-400/80 text-xs mt-2 font-mono">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-8">
                      <div className="relative">
                        <label htmlFor="consult-phone" className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Phone Number *</label>
                        <input
                          id="consult-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          autoComplete="tel"
                          className={inputClass('phone')}
                        />
                        {errors.phone && <p className="text-red-400/80 text-xs mt-2 font-mono">{errors.phone}</p>}
                      </div>

                      <div className="relative">
                        <label htmlFor="consult-country" className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Target Destination</label>
                        <div className="relative">
                          <select
                            id="consult-country"
                            name="country"
                            value={formData.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            autoComplete="country-name"
                            className={`w-full bg-transparent border-b-2 px-1 pb-3 pt-6 text-white outline-none appearance-none transition-all duration-300 text-lg cursor-pointer ${
                              formData.country ? 'text-white' : 'text-white/25'
                            } border-white/15 focus:border-gold hover:border-white/30`}
                          >
                            <option value="" disabled className="bg-navy text-white/40">Select a country</option>
                            {countries.map((c) => (
                              <option key={c} value={c} className="bg-navy text-white">{c}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-1 bottom-3 w-4 h-4 text-white/30 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="relative pt-2">
                      <label htmlFor="consult-message" className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Your Message</label>
                      <textarea
                        id="consult-message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Tell us about your academic background, preferred countries, or any specific questions..."
                        rows={4}
                        autoComplete="off"
                        className={`w-full bg-transparent border-b-2 px-1 pb-3 pt-6 text-white placeholder:text-white/25 outline-none transition-all duration-300 text-lg resize-none ${
                          errors.message ? 'border-red-400/70' : 'border-white/15 focus:border-gold hover:border-white/30'
                        }`}
                      />
                    </div>

                    <div className="pt-10">
                      <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-full bg-gold px-8 py-5 font-bold text-navy text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          Send via WhatsApp
                          <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-gold via-amber-300 to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </button>
                      <p className="text-white/25 text-xs text-center mt-4 font-mono">
                        Your details are sent securely via WhatsApp · No spam, ever.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="bg-white/[0.04] backdrop-blur-xl rounded-[24px] p-8 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-white text-xl font-heading mb-3">Prefer to text us directly?</h4>
                <p className="text-white/40 leading-relaxed mb-6 text-sm">
                  Reach out on WhatsApp right now — no forms, no waiting.
                </p>
                <a
                  href="https://wa.me/917292022912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-gold hover:text-white transition-colors group font-medium"
                >
                  <span className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741 1.205 1.2-3.645-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 21.75l3.99-1.296a11.838 11.838 0 005.674 1.447h.005c6.554 0 11.89-5.335 11.893-11.892a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  +91 72920 22912
                </a>
              </div>

              <div className="bg-white/[0.04] backdrop-blur-xl rounded-[24px] p-8 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-white text-xl font-heading mb-3">What to expect</h4>
                <ul className="space-y-4">
                  {[
                    'Personalized university shortlist based on your profile',
                    'Transparent fee structure & scholarship opportunities',
                    'Step-by-step application & visa roadmap',
                    'Direct connect with our senior consultants'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span className="text-white/40">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.04] backdrop-blur-xl rounded-[24px] p-8 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-white text-xl font-heading mb-3">Visit Our Office</h4>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Unit+No-F-55,+11Tth+Floor,+Urbetech,+NPX,+sector+-153,+Alpha+Greater+Noida,+Noida,+Gautam+Buddha+Nagar201310,+Uttar+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 leading-relaxed text-sm hover:text-gold transition-colors block"
                >
                  Unit No-F-55, 11Tth Floor, Urbetech, NPX, sector -153, Alpha Greater Noida, Noida, Gautam Buddha Nagar201310, Uttar Pradesh
                </a>
              </div>

              <div className="bg-white/[0.04] backdrop-blur-xl rounded-[24px] p-8 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-6">
                  <User className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-white text-xl font-heading mb-3">Speak to Pooja</h4>
                <p className="text-white/40 leading-relaxed text-sm">
                  Book a 1-on-1 session with our founder for a deep-dive into your global education strategy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
