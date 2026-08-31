"use client";

interface Industry {
  number: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

export default function IndustriesSection({ industries }: { industries: any[] }) {
  return (
    <section className="relative w-full bg-background py-16 md:py-32 overflow-hidden border-t border-secondary-container">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24">
          <span className="text-primary-container font-label-bold uppercase tracking-wider mb-2 block text-xs">
            What We Serve
          </span>
          <h2 className="font-headline-display text-3xl sm:text-5xl md:text-7xl text-on-background font-black uppercase tracking-tight leading-none mb-6">
            Industries We Serve
          </h2>
          <p className="font-body-md text-sm md:text-base text-secondary max-w-xl mx-auto">
            Tailored logistics ecosystems delivering precision, compliance, and velocity across global markets.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(industries || []).map((ind, i) => (
            <div
              key={ind.id || i}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-secondary-container bg-surface-container flex flex-col justify-end min-h-[220px] xs:min-h-[240px] md:min-h-[380px] p-5 md:p-8"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${ind.image_url || ind.image}')` }}
              ></div>

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/60 z-10 transition-opacity duration-500 group-hover:opacity-95"></div>

              {/* Large Card Number */}
              <span className="absolute top-4 left-6 text-3xl xs:text-4xl md:text-7xl font-headline-display font-black text-white/10 select-none z-20 transition-colors duration-500 group-hover:text-lime-400/20">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Content Box */}
              <div className="relative z-20 flex flex-col items-start text-white">
                {/* Category Tag */}
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-lime-400 mb-1">
                  {ind.tag}
                </span>

                {/* Title */}
                <h3 className="font-headline-md text-base xs:text-lg md:text-2xl font-bold uppercase tracking-tight mb-1.5 leading-none">
                  {ind.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] xs:text-xs md:text-sm text-white/80 leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-white mb-4">
                  {ind.description}
                </p>


              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
