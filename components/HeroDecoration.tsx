const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1731758996406-72978f8be659?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626470689809-02c891ac18bb?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/flagged/photo-1562616382-b884d7188d8a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481980235850-66e47651e431?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1786719245177-939f5dc3da63?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1731994710373-849feb905390?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1729100401676-e521e1baff78?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1731512703726-c8dc1fba2d28?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1775126964899-ae7b573d77e9?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1715691900389-253f3d44b13f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1648494957603-ae9f0ed2110b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1777312378788-9cf26cdf4e7a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568673818056-c70e27d25691?q=80&w=600&auto=format&fit=crop",
];

// Overlapping pairs hugging the far left/right, same layout at every
// breakpoint — only the tile size scales down on narrower screens.
const TILES = [
  { img: 9, top: "1%", left: "1%", w: 210, rotate: -9, opacity: 0.85, z: 2 },
  { img: 1, top: "15%", left: "10%", w: 160, rotate: 7, opacity: 0.5, z: 1 },
  { img: 11, top: "66%", left: "0%", w: 200, rotate: -6, opacity: 0.75, z: 2 },
  { img: 10, top: "82%", left: "10%", w: 155, rotate: 10, opacity: 0.45, z: 1 },
  { img: 4, top: "0%", left: "76%", w: 200, rotate: 8, opacity: 0.85, z: 2 },
  { img: 12, top: "13%", left: "89%", w: 155, rotate: -11, opacity: 0.5, z: 1 },
  { img: 14, top: "66%", left: "86%", w: 220, rotate: 7, opacity: 0.8, z: 2 },
  { img: 7, top: "82%", left: "80%", w: 155, rotate: -9, opacity: 0.45, z: 1 },
];

export default function HeroDecoration() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
      {TILES.map((tile, i) => (
        <div
          key={i}
          className="absolute rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
          style={{
            top: tile.top,
            left: tile.left,
            width: `clamp(64px, 15vw, ${tile.w}px)`,
            zIndex: tile.z,
            aspectRatio: "4 / 5",
            transform: `rotate(${tile.rotate}deg)`,
            opacity: tile.opacity,
            filter: "blur(1px)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_IMAGES[tile.img]} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
