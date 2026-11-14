import React from "react";
import { PHG_IMAGES } from "@/lib/phg-data";
import { Sparkles, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onBookClick: () => void;
}

export function HeroSection({ onBookClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-background text-white pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/20 border border-purple-400/30 text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-300" />
              Live Entertainment for Aged Care Communities
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
              Entertainment that brings{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-200 to-purple-100">
                aged care communities
              </span>{" "}
              to life.
            </h1>

            <p className="text-lg sm:text-xl text-purple-100/90 font-light max-w-2xl leading-relaxed">
              Purple Harmony Group connects aged-care lifestyle coordinators with professional
              singers, musicians, and performers who deliver warmth, nostalgia, dignity, and radiant
              smiles.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onBookClick}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white font-semibold text-base px-8 py-6 rounded-xl shadow-xl shadow-purple-950/50"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Check Dates & Book Now
              </Button>
              <a
                href="#entertainers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-base px-6 py-3.5 rounded-xl border border-white/20 backdrop-blur-sm transition-all"
              >
                <Users className="w-4 h-4" />
                Browse Entertainers
              </a>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-purple-800/60 max-w-xl mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl font-serif font-bold text-white">500+</p>
                <p className="text-xs text-purple-200">Aged Care Concerts</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-white">100%</p>
                <p className="text-xs text-purple-200">Police Checked & NDIS Aware</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-white">10/10</p>
                <p className="text-xs text-purple-200">Resident Delight</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl blur-lg opacity-40" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-400/20 bg-purple-950">
                <img
                  src={PHG_IMAGES.heroSingingAgedCare}
                  alt="Lino Ettia singing with aged care residents"
                  className="w-full h-[400px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block px-2.5 py-1 rounded bg-purple-600/80 text-[11px] font-semibold tracking-wider uppercase mb-2">
                    Live in Performance
                  </span>
                  <h3 className="text-xl font-serif font-bold">Pure Joy, Memory & Connection</h3>
                  <p className="text-sm text-purple-200 mt-1">
                    Lino Ettia leading an interactive sing-along with residents, family members &
                    care staff.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
