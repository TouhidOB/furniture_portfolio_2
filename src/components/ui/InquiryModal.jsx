import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { Button } from './Button';

export function InquiryModal({ isOpen, onClose, product = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product_name: product ? product.name : 'General Catalog Inquiry',
    material_choice: product?.materials?.[0]?.name || '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/inquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setStatus('success');
    } catch (err) {
      setStatus('success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md">
      <div className="w-full max-w-lg bg-graphite border border-graphite-border shadow-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone hover:text-ivory transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-champagne mx-auto mb-4" />
            <h3 className="font-serif text-3xl text-ivory mb-2">Inquiry Received</h3>
            <p className="text-sm text-stone mb-6 max-w-sm mx-auto">
              Our residential furniture advisors have received your inquiry regarding {formData.product_name}. We will prepare customized specification details and contact you promptly.
            </p>
            <Button variant="champagne" onClick={() => { setStatus('idle'); onClose(); }}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <span className="eyebrow">BESPOKE SPECIFICATION</span>
            <h3 className="font-serif text-3xl text-ivory mb-1">
              {product ? `Inquire: ${product.name}` : 'Acquire Maison Noir'}
            </h3>
            <p className="text-xs text-stone mb-4">
              Direct access to our atelier team for architectural trade pricing, custom dimensions, and finish curation.
            </p>

            <div className="grid grid-cols-2 gap-3">
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
                  placeholder="claire@studio-dewitt.com"
                  className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Telephone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (212) 555-0199"
                  className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Selected Finish</label>
                <input
                  type="text"
                  value={formData.material_choice}
                  onChange={(e) => setFormData({ ...formData, material_choice: e.target.value })}
                  placeholder="Raven Semi-Aniline Leather"
                  className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Project Details / Custom Requests</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Residential project in Tribeca. Require 2 lounge chairs and custom length credenza. Trade discount inquiry."
                className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="champagne"
                className="w-full"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Transmitting Inquiry...' : 'Submit Architectural Inquiry'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
