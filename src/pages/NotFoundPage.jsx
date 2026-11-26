import React from 'react';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <main className="min-h-screen bg-obsidian text-ivory flex items-center justify-center pt-32 pb-24 border-b border-graphite-border text-center px-6">
      <div className="max-w-md space-y-6">
        <span className="eyebrow block text-champagne">404 ERROR</span>
        <h1 className="text-fluid-section font-serif font-light text-ivory">
          Threshold Not Found.
        </h1>
        <p className="text-sm text-stone leading-relaxed font-sans">
          The architectural corridor you are seeking does not exist or has been relocated to another sanctuary.
        </p>
        <div className="pt-4">
          <Button to="/" variant="champagne" size="lg" icon={ArrowLeft}>
            Return to Entrance
          </Button>
        </div>
      </div>
    </main>
  );
}
