import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PHG_IMAGES } from "@/lib/phg-data";
import { BookingModal } from "@/components/BookingModal";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { EntertainersSection } from "@/components/EntertainersSection";
import { ProgramAndTestimonials } from "@/components/ProgramAndTestimonials";
import { Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Purple Harmony Group | Live Entertainment for Aged Care" },
      {
        name: "description",
        content:
          "Purple Harmony Group connects aged-care lifestyle teams across Australia with exceptional professional singers, musicians, and performers led by Lino Ettia.",
      },
      {
        property: "og:title",
        content: "Purple Harmony Group | Live Entertainment for Aged Care",
      },
      {
        property: "og:description",
        content:
          "High-energy, heart-warming live musical entertainment tailored specifically for aged care communities and lifestyle programs.",
      },
      {
        property: "og:image",
        content: PHG_IMAGES.heroSingingAgedCare,
      },
      {
        name: "twitter:image",
        content: PHG_IMAGES.heroSingingAgedCare,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedEntertainer, setSelectedEntertainer] = useState<string | undefined>();

  const openBookingFor = (entertainerName?: string) => {
    setSelectedEntertainer(entertainerName);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-purple-500/20 selection:text-purple-900">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white text-xs py-2 px-4 border-b border-purple-800/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-purple-100">
              Trusted by leading Aged Care Lifestyle teams throughout Victoria & across Australia
            </span>
          </div>
          <div className="flex items-center gap-4 text-purple-200">
            <a
              href="tel:1300000000"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-purple-400" />
              <span>Direct Bookings & Inquiries</span>
            </a>
            <span>•</span>
            <a
              href="mailto:info@purpleharmonygroup.com.au"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-purple-400" />
              <span>info@purpleharmonygroup.com.au</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src={PHG_IMAGES.logo}
              alt="Purple Harmony Group"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <a
              href="#about"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              About PHG
            </a>
            <a
              href="#entertainers"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Our Entertainers
            </a>
            <a
              href="#services"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Programs & Packages
            </a>
            <a
              href="#testimonials"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#benefits"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Why Music Matters
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => openBookingFor()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 shadow-lg shadow-purple-900/25 transition-all hover:shadow-purple-900/40"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Entertainment
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection onBookClick={() => openBookingFor()} />

      {/* About Section */}
      <AboutSection onBookLino={() => openBookingFor("Lino Ettia")} />

      {/* Entertainers Section */}
      <EntertainersSection onBookEntertainer={(name) => openBookingFor(name)} />

      {/* Program Packages & Testimonials */}
      <ProgramAndTestimonials onSelectProgram={(title) => openBookingFor(title)} />

      {/* Booking CTA Banner */}
      <section className="py-16 bg-muted/50 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
            Bring the Magic of Live Music to Your Facility
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Inquire now to check available dates for Lino Ettia and our professional entertainer roster across Melbourne and regional Victoria.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              onClick={() => openBookingFor()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-xl shadow-lg shadow-purple-900/20"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Check Availability & Get Quote
            </Button>
            <a
              href="mailto:info@purpleharmonygroup.com.au"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors px-4 py-2"
            >
              <Mail className="w-4 h-4" />
              Email Us Directly
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-950 text-white py-12 border-t border-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4 md:col-span-2">
              <img
                src={PHG_IMAGES.logo}
                alt="Purple Harmony Group"
                className="h-10 w-auto object-contain brightness-110"
              />
              <p className="text-xs text-purple-200/90 max-w-sm leading-relaxed">
                Purple Harmony Group connects residential aged-care facilities and retirement communities with top-tier live entertainment, master singers, and uplifting music programs.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-purple-300">Quick Links</h5>
              <ul className="text-xs text-purple-200 space-y-1.5">
                <li><a href="#about" className="hover:text-white transition-colors">About Lino Ettia</a></li>
                <li><a href="#entertainers" className="hover:text-white transition-colors">Our Entertainers</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Programs & Packages</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Client Testimonials</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-purple-300">Contact & Booking</h5>
              <p className="text-xs text-purple-200">Melbourne & Regional Victoria, Australia</p>
              <p className="text-xs text-purple-200">Email: info@purpleharmonygroup.com.au</p>
              <div className="pt-2">
                <Button
                  size="sm"
                  onClick={() => openBookingFor()}
                  className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                >
                  Send Inquiry
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-purple-900/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-purple-300/80 gap-2">
            <p>© {new Date().getFullYear()} Purple Harmony Group Pty Ltd. All rights reserved.</p>
            <p>Aged Care Live Entertainment Specialists • NDIS & Police Checked</p>
          </div>
        </div>
      </footer>

      {/* Booking Dialog */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedEntertainer={selectedEntertainer}
      />
    </div>
  );
}
