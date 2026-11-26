import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCw, MoveHorizontal, Play, Pause, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';

/**
 * Product360Viewer — Premium 360° Photographed Turntable Image Scrubber (Option B)
 * Scrubs through a sequence of photographed multi-angle frames
 * via:
 * 1. Scroll-driven progress (passed from ScrollTrigger)
 * 2. Mouse/touch drag horizontally across the image
 * 3. Range slider at the bottom
 * 4. Auto-spin play/pause showcase mode
 */
export function Product360Viewer({
  frames = [],
  fallbackImage = null,
  productName = "Architectural Piece",
  scrollProgress = null, // External 0.0 to 1.0 scroll progress from GSAP
  className = "w-full h-full min-h-[440px]",
  showControls = true,
  autoSpinSpeed = 120
}) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startFrame, setStartFrame] = useState(0);
  const containerRef = useRef(null);

  const totalFrames = Array.isArray(frames) && frames.length > 0 ? frames.length : 0;

  // Sync with external scrollProgress when provided (e.g. pinned hero scroll)
  useEffect(() => {
    if (scrollProgress !== null && typeof scrollProgress === 'number' && totalFrames > 0) {
      const targetIndex = Math.min(
        totalFrames - 1,
        Math.floor(scrollProgress * totalFrames)
      );
      setCurrentFrame(targetIndex);
    }
  }, [scrollProgress, totalFrames]);

  // Auto-spin turntable timer
  useEffect(() => {
    if (!isAutoSpinning || totalFrames <= 1 || isDragging) return;
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % totalFrames);
    }, autoSpinSpeed);
    return () => clearInterval(interval);
  }, [isAutoSpinning, totalFrames, isDragging, autoSpinSpeed]);

  // Handle Drag Interaction
  const handleMouseDown = (e) => {
    if (totalFrames <= 1) return;
    setIsDragging(true);
    setIsAutoSpinning(false);
    setStartX(e.clientX);
    setStartFrame(currentFrame);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || totalFrames <= 1) return;
    const deltaX = e.clientX - startX;
    // Advance 1 frame for every 16px of horizontal drag
    const sensitivity = 16;
    const frameDelta = Math.floor(deltaX / sensitivity);
    let newFrame = (startFrame - frameDelta) % totalFrames;
    if (newFrame < 0) newFrame += totalFrames;
    setCurrentFrame(newFrame);
  }, [isDragging, startX, startFrame, totalFrames]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Handlers for Mobile & Trackpads
  const handleTouchStart = (e) => {
    if (totalFrames <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    setIsAutoSpinning(false);
    setStartX(e.touches[0].clientX);
    setStartFrame(currentFrame);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || totalFrames <= 1 || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startX;
    const sensitivity = 14;
    const frameDelta = Math.floor(deltaX / sensitivity);
    let newFrame = (startFrame - frameDelta) % totalFrames;
    if (newFrame < 0) newFrame += totalFrames;
    setCurrentFrame(newFrame);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (totalFrames === 0) {
    if (fallbackImage) {
      return (
        <div className={`relative ${className} bg-obsidian flex items-center justify-center overflow-hidden border border-graphite-border`}>
          <img
            src={fallbackImage}
            alt={productName}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 glass-obsidian px-3 py-1.5 text-xs text-stone">
            Single Editorial Still • Upload 360° frames in CMS Dashboard
          </div>
        </div>
      );
    }
    return (
      <div className={`relative ${className} bg-obsidian flex flex-col items-center justify-center text-stone border border-graphite-border p-6 text-center`}>
        <RotateCw className="w-8 h-8 text-champagne mb-3 animate-spin-slow" />
        <p className="text-sm text-ivory font-serif">No 360° Turntable Frames Configured</p>
        <p className="text-xs text-stone mt-1 max-w-xs font-sans">
          Upload multi-angle photos in the CMS Studio Dashboard.
        </p>
      </div>
    );
  }

  const activeImage = frames[currentFrame];
  const currentAngleDegrees = Math.round((currentFrame / totalFrames) * 360);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative ${className} select-none overflow-hidden cursor-ew-resize bg-obsidian border border-graphite-border group flex flex-col justify-between`}
    >
      {/* 360 Active Frame Image with High Fidelity Presentation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-obsidian">
        <img
          key={currentFrame}
          src={activeImage}
          alt={`${productName} — Angle ${currentAngleDegrees}° (Frame ${currentFrame + 1} of ${totalFrames})`}
          className="w-full h-full object-cover transition-none"
          loading="eager"
        />
        {/* Subtle Vignette for Architectural Depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-obsidian/40 pointer-events-none" />
      </div>

      {/* Top Floating Badge & Angle Degrees Indicator */}
      <div className="relative z-10 m-4 flex items-center justify-between">
        <div className="glass-obsidian px-3 py-1.5 border border-graphite-border flex items-center space-x-2 text-xs">
          <RotateCw className={`w-3.5 h-3.5 text-champagne ${isAutoSpinning ? 'animate-spin-slow' : ''}`} />
          <span className="text-ivory font-mono font-medium">360° PHOTO TURNTABLE</span>
          <span className="text-champagne font-mono font-semibold">({currentAngleDegrees}°)</span>
        </div>

        {/* Auto-Spin Toggle Button */}
        {showControls && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsAutoSpinning(!isAutoSpinning);
            }}
            className={`glass-obsidian px-3 py-1.5 border border-graphite-border flex items-center space-x-1.5 text-xs transition-colors ${
              isAutoSpinning ? 'text-champagne border-champagne' : 'text-stone hover:text-ivory'
            }`}
          >
            {isAutoSpinning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isAutoSpinning ? 'Pause Spin' : 'Auto 360° Spin'}</span>
          </button>
        )}
      </div>

      {/* Bottom Floating Control Bar */}
      {showControls && (
        <div className="relative z-10 m-4 glass-obsidian p-3 border border-graphite-border space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-stone font-sans">
              <MoveHorizontal className="w-3.5 h-3.5 text-champagne animate-pulse" />
              <span>Drag left/right or scroll to rotate 360°</span>
            </div>

            <div className="flex items-center space-x-2 font-mono text-[11px] text-champagne">
              <span>Frame {currentFrame + 1} / {totalFrames}</span>
              <span className="text-stone">•</span>
              <span>{Math.round(((currentFrame + 1) / totalFrames) * 100)}%</span>
            </div>
          </div>

          {/* Interactive Turntable Scrubber Bar */}
          <div className="flex items-center space-x-3 pt-1">
            <button
              type="button"
              onClick={() => setCurrentFrame((prev) => (prev - 1 + totalFrames) % totalFrames)}
              className="p-1 hover:text-champagne transition-colors text-stone"
              aria-label="Previous 360 angle"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <input
              type="range"
              min="0"
              max={totalFrames - 1}
              value={currentFrame}
              onChange={(e) => {
                setIsAutoSpinning(false);
                setCurrentFrame(Number(e.target.value));
              }}
              className="w-full accent-champagne h-1 bg-graphite rounded cursor-pointer"
            />

            <button
              type="button"
              onClick={() => setCurrentFrame((prev) => (prev + 1) % totalFrames)}
              className="p-1 hover:text-champagne transition-colors text-stone"
              aria-label="Next 360 angle"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
