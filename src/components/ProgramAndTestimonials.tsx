import React from "react";
import { SERVICE_PACKAGES, TESTIMONIALS, PHG_IMAGES } from "@/lib/phg-data";
import { Calendar, CheckCircle, Star, Heart, Smile, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProgramAndTestimonialsProps {
  onSelectProgram: (title: string) => void;
}

export function ProgramAndTestimonials({ onSelectProgram }: ProgramAndTestimonialsProps) {
  return (
    <>
      {/* Services & Packages */}
      <section id="services" className="py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              <Calendar className="w-3.5 h-3.5" />
              Programs & Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              Flexible Packages for Every Lifestyle Calendar
            </h2>
            <p className="text-muted-foreground text-base">
              From regular monthly concerts to themed festive celebrations, we make entertainment programming dependable and effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_PACKAGES.map((pkg, idx) => (
              <Card
                key={idx}
                className="relative flex flex-col justify-between border border-border shadow-md hover:border-primary/50 transition-all p-6 bg-card"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary px-2.5 py-1 bg-primary/10 rounded-full">
                      {pkg.tag}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-foreground">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                      What is included:
                    </p>
                    <ul className="space-y-2">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border">
                  <Button
                    onClick={() => onSelectProgram(`Package: ${pkg.title}`)}
                    className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-xs"
                  >
                    Select Program
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Music Matters */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 border border-purple-400/30 text-purple-200">
                <Heart className="w-3.5 h-3.5 text-purple-300" />
                Therapeutic Impact
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                More Than Entertainment: Music is Medicine for the Soul
              </h2>
              <p className="text-purple-100/90 leading-relaxed text-sm sm:text-base">
                Decades of neuroscience prove that musical memory remains intact even in advanced stages of dementia. A familiar chorus can dissolve agitation, spark conversation, and reignite dignity.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-200 shrink-0">
                    <Smile className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Elevates Mood & Reduces Anxiety</h4>
                    <p className="text-xs text-purple-200 mt-0.5">Live acoustic and vocal sets release dopamine and endorphins, providing deep relaxation and calm.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-200 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Memory Stimulation & Reminiscence</h4>
                    <p className="text-xs text-purple-200 mt-0.5">Songs from the 1940s, 50s, 60s and 70s reconnect residents with youthful milestones and joyful moments.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-200 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Social Connection for Quiet Residents</h4>
                    <p className="text-xs text-purple-200 mt-0.5">Shared sing-alongs bring community spirit to the lounge, encouraging smiles between residents and carers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-purple-400/20 relative">
                <img
                  src={PHG_IMAGES.linoPortrait2}
                  alt="Lino Ettia smiling"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-purple-950/80 backdrop-blur-md border border-purple-500/30">
                  <p className="text-sm italic text-purple-100 font-serif">
                    "When an 88-year-old resident with non-verbal dementia suddenly sings every word of 'Fly Me to the Moon', that is not just performance. That is life and love in action."
                  </p>
                  <p className="text-xs font-bold text-white mt-2">— Lino Ettia, Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              <Star className="w-3.5 h-3.5 fill-primary" />
              What Lifestyle Coordinators Say
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              Loved by Residents, Trusted by Staff
            </h2>
            <p className="text-muted-foreground text-base">
              Feedback from lifestyle managers and care directors who book Purple Harmony Group regularly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <Card key={idx} className="p-6 border border-border shadow-sm flex flex-col justify-between bg-card">
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border">
                  <p className="font-serif font-bold text-sm text-foreground">{t.author}</p>
                  <p className="text-xs text-primary font-medium">{t.role}</p>
                  <p className="text-[11px] text-muted-foreground">{t.facility}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
