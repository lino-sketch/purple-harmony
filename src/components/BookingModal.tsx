import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  CheckCircle2,
  Calendar as CalendarIcon,
  Sparkles,
  Clock,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  fetchCalendarFreeSlots,
  submitCalendarBooking,
  getBrowserTimezone,
  localDateKey,
  splitName,
  PHG_LOCATION_ID,
  PHG_CALENDAR_ID,
  FIELD_REQUESTED_PERFORMER,
  FIELD_PROGRAM_TYPE,
  type FreeSlotsResponse,
} from "@/lib/phg-booking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedEntertainer?: string | undefined;
}

const PERFORMER_OPTIONS = [
  "Lino Ettia (Founder & Lead Crooner)",
  "Kim Montalto (Acoustic Folk / Guitar)",
  "Marcus Delaney (Swing & Jazz Pianist)",
  "Harmony Melodic Duo (European Accordion & Vocals)",
  "General Consultation / Best Match",
];

const PROGRAM_OPTIONS = [
  "Regular Lifestyle Concert",
  "Special Calendar Celebration",
  "Sensory & High-Care Session",
];

function normalizePerformer(value?: string): string {
  if (!value) return "General Consultation / Best Match";
  const match = PERFORMER_OPTIONS.find(
    (opt) =>
      opt.toLowerCase().startsWith(value.toLowerCase()) ||
      opt.toLowerCase().includes(value.toLowerCase()),
  );
  return match ?? "General Consultation / Best Match";
}

function monthRange(month: Date): { startMs: number; endMs: number } {
  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const end = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59);
  return { startMs: start.getTime(), endMs: end.getTime() };
}

function formatTime(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function BookingModal({ isOpen, onClose, preselectedEntertainer }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const [facilityName, setFacilityName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [entertainer, setEntertainer] = useState(normalizePerformer(preselectedEntertainer));
  const [programType, setProgramType] = useState<string>("Regular Lifestyle Concert");
  const [notes, setNotes] = useState("");

  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [slotsByDate, setSlotsByDate] = useState<FreeSlotsResponse>({});
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  // Keep the performer in sync when the opener preselects a different one.
  useEffect(() => {
    if (preselectedEntertainer) {
      setEntertainer(normalizePerformer(preselectedEntertainer));
    }
  }, [preselectedEntertainer]);

  const loadSlots = useCallback(async (month: Date) => {
    setSlotsLoading(true);
    setSlotsError(null);
    try {
      const { startMs, endMs } = monthRange(month);
      const data = await fetchCalendarFreeSlots(PHG_CALENDAR_ID, startMs, endMs);
      setSlotsByDate(data);
    } catch (err) {
      setSlotsError(
        "We couldn't load live availability right now. You can still request a date and we'll confirm.",
      );
      setSlotsByDate({});
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  // Fetch availability whenever the modal opens or the visible month changes.
  useEffect(() => {
    if (isOpen) {
      loadSlots(calendarMonth);
    }
  }, [isOpen, calendarMonth, loadSlots]);

  const availableDates = useMemo(() => {
    const keys = new Set<string>();
    for (const [k, value] of Object.entries(slotsByDate)) {
      if (value && value.slots && value.slots.length > 0) {
        keys.add(k);
      }
    }
    return keys;
  }, [slotsByDate]);

  const daySlots = useMemo(() => {
    if (!selectedDate) return [];
    const key = localDateKey(selectedDate);
    return slotsByDate[key]?.slots ?? [];
  }, [selectedDate, slotsByDate]);

  const handleSelectDate = (date?: Date) => {
    setSelectedDate(date);
    setSelectedSlot("");
  };

  const handleMonthChange = (date: Date) => {
    setCalendarMonth(date);
    setSelectedDate(undefined);
    setSelectedSlot("");
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmissionError(null);
    setFacilityName("");
    setContactPerson("");
    setEmail("");
    setPhone("");
    setEntertainer(normalizePerformer(preselectedEntertainer));
    setProgramType("Regular Lifestyle Concert");
    setNotes("");
    setSelectedDate(undefined);
    setSelectedSlot("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !selectedDate) return;
    setSubmitting(true);
    setSubmissionError(null);
    try {
      const { firstName, lastName } = splitName(contactPerson);
      await submitCalendarBooking({
        locationId: PHG_LOCATION_ID,
        calendarId: PHG_CALENDAR_ID,
        firstName,
        lastName,
        email,
        phone,
        selectedSlot,
        selectedTimezone: getBrowserTimezone(),
        notes,
        customFields: [
          { id: FIELD_REQUESTED_PERFORMER, field_value: entertainer },
          { id: FIELD_PROGRAM_TYPE, field_value: programType },
        ],
      });
      setSubmitted(true);
    } catch (err) {
      setSubmissionError(
        "We couldn't complete your booking. Please try again or email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetForm()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden bg-card border-border/80 shadow-2xl max-h-[90vh] flex flex-col">
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
            Connect with Purple Harmony Group. We will confirm entertainer availability, repertoire
            options and tailored pricing within 24 hours.
          </DialogDescription>
        </div>

        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 px-4 space-y-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground">Inquiry Received!</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Thank you for contacting Purple Harmony Group,{" "}
                <strong className="text-foreground">{contactPerson}</strong>. Our lifestyle booking
                coordinator will contact you at{" "}
                <strong className="text-foreground">{phone || email}</strong> shortly to confirm{" "}
                <strong className="text-foreground">{entertainer}</strong> for{" "}
                {selectedDate ? formatLongDate(selectedDate) : "your preferred date"}.
              </p>
              <div className="bg-muted/50 p-4 rounded-xl text-left text-xs space-y-1.5 border border-border">
                <p>
                  <strong>Facility:</strong> {facilityName || "Aged Care Facility"}
                </p>
                <p>
                  <strong>Preferred Entertainer:</strong> {entertainer}
                </p>
                <p>
                  <strong>Program Type:</strong> {programType}
                </p>
                {selectedDate && (
                  <p>
                    <strong>Date:</strong> {formatLongDate(selectedDate)}
                  </p>
                )}
                {selectedSlot && (
                  <p>
                    <strong>Time:</strong> {formatTime(selectedSlot)}
                  </p>
                )}
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
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
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
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={entertainer}
                    onChange={(e) => setEntertainer(e.target.value)}
                  >
                    {PERFORMER_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="programType" className="text-xs font-semibold">
                    Program Type
                  </Label>
                  <select
                    id="programType"
                    className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={programType}
                    onChange={(e) => setProgramType(e.target.value)}
                  >
                    {PROGRAM_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="preferredDate" className="text-xs font-semibold">
                  Target Date *
                </Label>
                <div className="flex flex-col gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="preferredDate"
                        type="button"
                        variant="outline"
                        className="w-full justify-start text-left font-normal h-9"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                        {selectedDate ? (
                          formatLongDate(selectedDate)
                        ) : (
                          <span className="text-muted-foreground">Choose an available date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="relative">
                        {slotsLoading && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70 rounded-md">
                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                          </div>
                        )}
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleSelectDate}
                          month={calendarMonth}
                          onMonthChange={handleMonthChange}
                          disabled={[
                            { before: new Date() },
                            (date: Date) => !availableDates.has(localDateKey(date)),
                          ]}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>

                  {slotsError ? (
                    <p className="flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-md p-2.5">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {slotsError}
                    </p>
                  ) : null}

                  {selectedDate && !slotsLoading ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        Available times
                      </div>
                      {daySlots.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {daySlots.map((slot) => {
                            const active = selectedSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={
                                  "px-3 py-1.5 rounded-md text-xs font-semibold border transition-all " +
                                  (active
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                    : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary")
                                }
                              >
                                {formatTime(slot)}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          No open slots for this day — pick another date or continue and we'll
                          follow up.
                        </p>
                      )}
                    </div>
                  ) : null}
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
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {submissionError ? (
                <p className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-2.5">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  {submissionError}
                </p>
              ) : null}

              <div className="pt-2 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1"
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting || !selectedSlot}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-purple-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-[11px] text-muted-foreground text-center">
                Strict privacy guarantee: Your details are only used to coordinate your
                entertainment booking.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
