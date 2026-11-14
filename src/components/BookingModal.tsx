import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Calendar, Music, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedEntertainer?: string;
}

export function BookingModal({ isOpen, onClose, preselectedEntertainer }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    facilityName: "",
    contactPerson: "",
    email: "",
    phone: "",
    preferredDate: "",
    entertainer: preselectedEntertainer || "Any / Recommended",
    eventType: "Regular Lifestyle Concert",
    residentsCount: "30-50",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden bg-card border-border/80 shadow-2xl">
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-fuchsia-950 p-6 text-white relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 border border-purple-400/30 text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              Live Aged Care Entertainment
            </span>
          </div>
          <DialogTitle className="text-2xl font-serif font-bold text-white tracking-tight">
            Book an Entertainer or Check Availability
          </DialogTitle>
          <DialogDescription className="text-purple-200/90 text-sm mt-1">
            Connect with Purple Harmony Group. We will confirm entertainer availability, repertoire options and tailored pricing within 24 hours.
          </DialogDescription>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 px-4 space-y-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground">
                Inquiry Received!
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Thank you for contacting Purple Harmony Group, <strong className="text-foreground">{formData.contactPerson}</strong>. Our lifestyle booking coordinator will contact you at <strong className="text-foreground">{formData.phone || formData.email}</strong> shortly.
              </p>
              <div className="bg-muted/50 p-4 rounded-xl text-left text-xs space-y-1.5 border border-border">
                <p><strong>Facility:</strong> {formData.facilityName || "Aged Care Facility"}</p>
                <p><strong>Preferred Entertainer:</strong> {formData.entertainer}</p>
                <p><strong>Program Type:</strong> {formData.eventType}</p>
                {formData.preferredDate && <p><strong>Target Date:</strong> {formData.preferredDate}</p>}
              </div>
              <Button
                onClick={resetForm}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg mt-4"
              >
                Close & Return to Website
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="facilityName" className="text-xs font-semibold">
                    Aged Care Facility / Organization *
                  </Label>
                  <Input
                    id="facilityName"
                    required
                    placeholder="e.g. Arcare Malvern East"
                    value={formData.facilityName}
                    onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contactPerson" className="text-xs font-semibold">
                    Your Name (Lifestyle / Admin) *
                  </Label>
                  <Input
                    id="contactPerson"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Work Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="lifestyle@agedcare.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-semibold">
                    Contact Phone *
                  </Label>
                  <Input
                    id="phone"
                    required
                    placeholder="0400 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="entertainer" className="text-xs font-semibold">
                    Requested Performer
                  </Label>
                  <select
                    id="entertainer"
                    className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={formData.entertainer}
                    onChange={(e) => setFormData({ ...formData, entertainer: e.target.value })}
                  >
                    <option value="Lino Ettia (Founder & Lead Crooner)">Lino Ettia (Founder & Lead Crooner)</option>
                    <option value="Kim Montalto (Acoustic Folk / Guitar)">Kim Montalto (Acoustic Folk / Guitar)</option>
                    <option value="Marcus Delaney (Swing & Jazz Pianist)">Marcus Delaney (Swing & Jazz Pianist)</option>
                    <option value="Harmony Melodic Duo (European Accordion & Vocals)">Harmony Melodic Duo (European & Vocals)</option>
                    <option value="General Consultation / Best Match">General Consultation / Best Match</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="preferredDate" className="text-xs font-semibold">
                    Target Date / Frequency
                  </Label>
                  <Input
                    id="preferredDate"
                    placeholder="e.g. Next month or Weekly Tuesday"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-xs font-semibold">
                  Special Notes or Resident Musical Preferences (optional)
                </Label>
                <Textarea
                  id="notes"
                  rows={2}
                  placeholder="e.g. Looking for classic 1950s sing-alongs, resident birthday celebration, or memory-support lounge session..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="pt-2 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-purple-900/20"
                >
                  Submit Inquiry
                </Button>
              </div>

              <p className="text-[11px] text-muted-foreground text-center">
                Strict privacy guarantee: Your details are only used to coordinate your entertainment booking.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
