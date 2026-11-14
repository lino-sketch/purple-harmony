import React from "react";
import { PHG_IMAGES } from "@/lib/phg-data";
import { Heart, ShieldCheck, Volume2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AboutSectionProps {
  onBookLino: () => void;
}

export function AboutSection({ onBookLino }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border bg-card">
              <img
                src={PHG_IMAGES.linoPortrait1}
                alt="Lino Ettia, Founder of Purple Harmony Group"
                className="w-full h-[460px] object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-background/90 backdrop-blur-md border border-border shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-foreground">
                      Lino Ettia
                    </h4>
                    <p className="text-xs text-primary font-medium">
                      Founder & Artistic Director
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    20+ Yrs Performance
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              <Heart className="w-3.5 h-3.5" />
              Our Story & Philosophy
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              Music, personality, and genuine human connection.
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              Founded by acclaimed performer <strong className="text-foreground">Lino Ettia</strong>, Purple Harmony Group was born from a deep understanding of the transformative power of music in aged care. Music bypasses cognitive barriers, reawakens long-lost memories, and creates moments of sparkling joy for residents and their families.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              We bridge the gap between world-class live entertainment and the nuanced, sensitive needs of residential aged care and memory support units. Every performer on our roster is handpicked for their vocal mastery, empathy, respectful engagement, and joyful spirit.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h5 className="font-semibold text-sm text-foreground">NDIS & Aged Care Ready</h5>
                  <p className="text-xs text-muted-foreground mt-0.5">Police check, flu & covid vaccinated, fully insured public liability.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h5 className="font-semibold text-sm text-foreground">All Equipment Supplied</h5>
                  <p className="text-xs text-muted-foreground mt-0.5">State-of-the-art wireless microphones and acoustic sound tailored for sensitive ears.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={onBookLino}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Book Lino for Your Facility
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
