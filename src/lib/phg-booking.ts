export const BOOKING_API_URL = "https://backend.leadconnectorhq.com";
export const VIBE_API_URL = "https://backend.leadconnectorhq.com/vibe-ai";

export const PHG_LOCATION_ID = "OkU7w9DjzNoGizch5eup";
export const PHG_CALENDAR_ID = "mAFngzDV5khlD4WrfQ0q";

// Registered custom field IDs for non-standard booking values.
export const FIELD_REQUESTED_PERFORMER = "JZotCKVgsIgS248MDnml";
export const FIELD_PROGRAM_TYPE = "xPKQs4wh4VU6MKKJHMhJ";

export type CustomFieldValue = { id: string; field_value: string };

export type BookingPayload = {
  locationId: string;
  calendarId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedSlot: string;
  selectedTimezone?: string;
  sessionId?: string;
  customFields?: CustomFieldValue[];
} & Partial<
  Record<
    | "notes"
    | "address1"
    | "city"
    | "state"
    | "postalCode"
    | "country"
    | "companyName"
    | "website"
    | "gender"
    | "dateOfBirth"
    | "timezone",
    string
  >
>;

export const getBrowserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const clampAvailabilityRange = (startMs: number, endMs: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = Math.max(startMs, today.getTime());
  const maxEndDate = startDate + 31 * 24 * 60 * 60 * 1000;
  const endDate = Math.min(Math.max(endMs, startDate), maxEndDate);

  return { startDate, endDate };
};

/** Response: { "YYYY-MM-DD": { slots: ["ISO", ...] } } */
export type FreeSlotsResponse = Record<string, { slots: string[] }>;

export async function fetchCalendarFreeSlots(
  calendarId: string,
  startMs: number,
  endMs: number,
): Promise<FreeSlotsResponse> {
  const { startDate, endDate } = clampAvailabilityRange(startMs, endMs);
  const params = new URLSearchParams({
    startDate: String(startDate),
    endDate: String(endDate),
    timezone: getBrowserTimezone(),
  });

  const response = await fetch(`${BOOKING_API_URL}/calendars/${calendarId}/free-slots?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch calendar availability");
  }
  return response.json() as Promise<FreeSlotsResponse>;
}

export async function submitCalendarBooking(payload: BookingPayload): Promise<unknown> {
  const response = await fetch(`${VIBE_API_URL}/booking/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      selectedTimezone: payload.selectedTimezone ?? getBrowserTimezone(),
      sessionId: payload.sessionId ?? crypto.randomUUID(),
      customFields: payload.customFields ?? [],
    }),
  });

  if (!response.ok) {
    throw new Error("Booking submission failed");
  }
  return response.json();
}

/** Build a YYYY-MM-DD key in the browser's local timezone from a Date. */
export function localDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Split a full name into first/last for the booking payload. */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  if (!trimmed) return { firstName: "", lastName: "" };
  const parts = trimmed.split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName: lastName || firstName };
}
