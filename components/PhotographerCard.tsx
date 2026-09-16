import { Photographer } from "@/lib/types";

export default function PhotographerCard({ p }: { p: Photographer }) {
  return (
    <div className="group bg-base-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-accent-500/40 transition-colors">
      <div className="relative aspect-[4/3] overflow-hidden bg-base-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.ogImage}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 right-3 bg-black/70 backdrop-blur text-xs font-medium text-white/90 rounded-full px-3 py-1">
          {p.price}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <div>
          <h3 className="font-semibold text-lg">{p.name}</h3>
          <p className="text-sm text-white/50 mt-1 leading-relaxed">
            {p.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-white/70 bg-white/10 rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-2">
          <a
            href={p.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 text-sm font-medium bg-accent-500 hover:bg-accent-400 text-base-950 rounded-xl py-2.5 transition-colors"
          >
            예약 문의 ↗
          </a>
        </div>
      </div>
    </div>
  );
}
