import React, { useState, useEffect } from 'react';
import { MATERIALS } from '../data/articles';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Box, Send, Sparkles } from 'lucide-react';

export function MaterialsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    firm: '',
    address: '',
    selected_samples: ['raven-leather', 'nero-marquina', 'charred-ash']
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSample = (id) => {
    setFormData(prev => {
      const exists = prev.selected_samples.includes(id);
      return {
        ...prev,
        selected_samples: exists
          ? prev.selected_samples.filter(s => s !== id)
          : [...prev.selected_samples, id]
      };
    });
  };

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
          product_name: 'Material Swatch Box Request',
          material_choice: formData.selected_samples.join(', '),
          message: `Firm: ${formData.firm}. Delivery Address: ${formData.address}`
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
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow block mb-3">TACTILE RIGOR</span>
          <h1 className="text-fluid-section font-serif font-light text-ivory mb-6">
            The Material Atelier.
          </h1>
          <p className="text-base md:text-lg text-stone leading-relaxed font-sans">
            Nothing synthetic. Nothing disguised. Inspect our permanent architectural materials, their geological and botanical origins, and order physical samples for your studio library.
          </p>
        </div>

        {/* 6 Materials Deep Dive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {MATERIALS.map((mat) => (
            <div key={mat.id} className="bg-graphite border border-graphite-border p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="w-8 h-8 rounded-full border border-graphite-border shadow-inner"
                    style={{ backgroundColor: mat.colorHex }}
                  />
                  <span className="text-[10px] uppercase tracking-widest text-champagne">
                    {mat.origin}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-ivory mb-2">{mat.name}</h3>
                <p className="text-xs text-stone mb-4 font-mono">{mat.composition}</p>
                <p className="text-xs text-stone leading-relaxed font-sans">{mat.description}</p>
              </div>

              <div className="pt-4 border-t border-graphite-border flex items-center justify-between">
                <span className="text-xs text-stone">Tactility: <strong className="text-ivory font-serif">{mat.tactileScore}</strong></span>
                <button
                  type="button"
                  onClick={() => toggleSample(mat.id)}
                  className={`text-xs px-3 py-1.5 border transition-all ${
                    formData.selected_samples.includes(mat.id)
                      ? 'border-champagne bg-champagne text-obsidian font-semibold'
                      : 'border-graphite-border text-stone hover:text-ivory'
                  }`}
                >
                  {formData.selected_samples.includes(mat.id) ? '✓ Included' : '+ Add to Kit'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Swatch Kit Order Form */}
        <div className="bg-graphite border border-graphite-border p-8 md:p-14 max-w-4xl mx-auto">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-champagne mx-auto mb-4" />
              <h3 className="font-serif text-3xl text-ivory mb-2">Sample Box Dispatched</h3>
              <p className="text-sm text-stone max-w-md mx-auto mb-6">
                Thank you, {formData.name}. Your curated presentation box of selected material slabs will arrive via DHL Express within 2 business days.
              </p>
              <Button onClick={() => setStatus('idle')} variant="champagne">
                Request Additional Samples
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center space-x-2 text-champagne text-xs uppercase tracking-widest">
                <Box className="w-4 h-4" />
                <span>Trade & Architectural Swatch Box</span>
              </div>
              <h2 className="font-serif text-3xl text-ivory">Order Complimentary Studio Swatches</h2>
              <p className="text-xs text-stone leading-relaxed">
                We provide full 100mm × 100mm solid timber cuts, stone slices, and leather strike-offs to licensed architects and interior professionals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Henrik Vang"
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
                    placeholder="henrik@vang-arch.com"
                    className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Design Firm / Studio</label>
                  <input
                    type="text"
                    value={formData.firm}
                    onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                    placeholder="Vang & Associates Architects"
                    className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Delivery Address & Country</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Bredgade 42, Copenhagen, Denmark"
                    className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="champagne"
                  size="lg"
                  className="w-full"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Processing Dispatch...' : 'Dispatch Presentation Box'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
