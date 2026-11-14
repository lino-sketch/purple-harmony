import React, { useState } from "react";
import { ENTERTAINERS_DATA } from "@/lib/phg-data";
import { Mic2, Music, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EntertainersSectionProps {
  onBookEntertainer: (name: string) => void;
}

export function EntertainersSection({ onBookEntertainer }: EntertainersSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredEntertainers =
    activeCategory === "all"
      ? ENTERTAINERS_DATA
      : ENTERTAINERS_DATA.filter((e) => e.category === activeCategory);

  return (
    <section id="entertainers" className="py-20 bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            <Mic2 className="w-3.5 h-3.5" />
            Talent Roster
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
            Meet the Voices Behind the Joy
          </h2>
          <p className="text-muted-foreground text-base">
            Singers, instrumentalists, and variety acts who understand how to captivate aged care
            audiences and bring timeless songbooks to life.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
              className="rounded-full text-xs"
            >
              All Performers
            </Button>
            <Button
              variant={activeCategory === "vocalist" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("vocalist")}
              className="rounded-full text-xs"
            >
              Vocalists & Crooners
            </Button>
            <Button
              variant={activeCategory === "instrumentalist" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("instrumentalist")}
              className="rounded-full text-xs"
            >
              Piano & Instrumental
            </Button>
            <Button
              variant={activeCategory === "duo" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("duo")}
              className="rounded-full text-xs"
            >
              Duos & Themed Shows
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEntertainers.map((entertainer) => (
            <Card
              key={entertainer.id}
              className="overflow-hidden border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                <div className="sm:col-span-5 relative h-64 sm:h-full bg-muted">
                  <img
                    src={entertainer.image}
                    alt={entertainer.name}
                    className="w-full h-full object-cover object-center"
                  />
                  {entertainer.badge && (
                    <span className="absolute top-3 left-3 bg-purple-900/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md border border-purple-400/20">
                      {entertainer.badge}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-xl text-foreground">
                        {entertainer.name}
                      </h3>
                      <span className="text-xs text-muted-foreground font-medium">
                        {entertainer.experienceYears}+ yrs exp
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-primary">{entertainer.role}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {entertainer.bio}
                    </p>

                    <div className="pt-2">
                      <p className="text-[11px] font-bold text-foreground uppercase tracking-wider mb-1.5">
                        Signature Sing-alongs:
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {entertainer.popularSongs.slice(0, 3).map((song, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Music className="w-3 h-3 text-primary shrink-0" />
                            <span className="truncate">{song}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {entertainer.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium bg-muted px-2 py-0.5 rounded text-foreground/80 border border-border"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => onBookEntertainer(entertainer.name)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs"
                    >
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      Inquire & Book {entertainer.name}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
