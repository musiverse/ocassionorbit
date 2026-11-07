export function validPhone(value: string) {
  if (!/^\+?[\d\s()-]+$/.test(value.trim())) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}
export function enquiryPrefills(params: {get: (key: string) => string | null}) {
  return {
    initialStyle: (params.get("style") || params.get("category") || params.get("service") || "").slice(0,120),
    initialEvent: (params.get("event") || "").slice(0,100),
    initialOccasion: (params.get("occasion") || "").slice(0,100),
  };
}
export function enquiryMessage(artist: boolean, entries: Iterable<[string, FormDataEntryValue]>) {
  return [artist ? "Hi OccasionOrbit! I’d like to introduce myself as an artist." : "Hi OccasionOrbit! I’m planning an event.",
    ...Array.from(entries).filter(([,v]) => String(v).trim()).map(([k,v]) => `${k}: ${String(v).trim()}`)].join("\n");
}
