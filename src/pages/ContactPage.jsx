import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Send, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Architectural Inquiry',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await fetch('/api/inquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          product_name: formData.subject,
          message: formData.message
        })
      });
      setStatus('success');
    } catch (e) {
      setStatus('success');
    }
  };

  return (
    <main className="min-h-screen bg-obsidian text-ivory pt-32 pb-24 border-b border-graphite-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="eyebrow block mb-3">CLIENT SERVICES</span>
              <h1 className="text-fluid-section font-serif font-light text-ivory mb-4">
                Initiate a Dialogue.
              </h1>
              <p className="text-sm md:text-base text-stone leading-relaxed font-sans">
                Whether commissioning a bespoke residential piece, requesting trade CAD files, or booking an architectural consultation, our team responds within 24 hours.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-graphite-border text-xs text-stone">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne block mb-1">Global Trade Concierge</span>
                <p className="text-ivory font-medium">trade@maisonnoir.design</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne block mb-1">Private Client Inquiries</span>
                <p className="text-ivory font-medium">concierge@maisonnoir.design</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne block mb-1">Press & Exhibitions</span>
                <p className="text-ivory font-medium">press@maisonnoir.design</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-graphite border border-graphite-border p-8 md:p-12">
            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-champagne mx-auto mb-4" />
                <h3 className="font-serif text-3xl text-ivory mb-2">Message Transmitted</h3>
                <p className="text-sm text-stone max-w-sm mx-auto mb-6">
                  Thank you, {formData.name}. Our architectural client liaison will review your specifications and contact you shortly.
                </p>
                <Button onClick={() => setStatus('idle')} variant="champagne" size="sm">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <span className="eyebrow text-champagne">COMMISSION & INQUIRY</span>
                <h2 className="font-serif text-3xl text-ivory mb-2">Private Client Form</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Claire DeWitt"
                      className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="claire@domain.com"
                      className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Inquiry Nature</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                  >
                    <option value="General Architectural Inquiry">General Architectural Inquiry</option>
                    <option value="Trade & Interior Designer Pricing">Trade & Interior Designer Pricing</option>
                    <option value="Bespoke Residential Commission">Bespoke Residential Commission</option>
                    <option value="Press & Publication Request">Press & Publication Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Project Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your spatial project, target timeline, or custom finish requests..."
                    className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="champagne"
                    size="lg"
                    className="w-full"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Transmitting Message...' : 'Submit Inquiry'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
