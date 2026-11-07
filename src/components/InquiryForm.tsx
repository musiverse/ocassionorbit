"use client";
import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight } from "lucide-react";
import { validPhone, localDate, enquiryMessage } from "@/lib/enquiry";
import { whatsappLink } from "@/lib/contact";
const subscribeDate = () => () => {};
export function InquiryForm({
  kind,
  initialStyle = "",
  initialEvent = "",
  initialOccasion = "",
}: {
  kind: "event" | "artist";
  initialStyle?: string;
  initialEvent?: string;
  initialOccasion?: string;
}) {
  const [preview, setPreview] = useState("");
  const [prepared, setPrepared] = useState(false);
  const artist = kind === "artist";
  function prepare(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const form = e.currentTarget;
    const phone = form.elements.namedItem("Phone") as HTMLInputElement;
    phone.setCustomValidity(validPhone(phone.value) ? "" : "Enter a phone number containing 7 to 15 digits, with an optional country prefix.");
    const date = form.elements.namedItem("Event date") as HTMLInputElement | null;
    if (date) {
      date.min = localDate();
      date.setCustomValidity(date.value && date.value < localDate() ? "Choose today or a future date." : "");
    }
    for (const name of ["Name", "City"]) {
      const input = form.elements.namedItem(name) as HTMLInputElement;
      input.setCustomValidity(input.value.trim() ? "" : "Please enter a value.");
    }
    if (!form.reportValidity()) return;
    setPreview(enquiryMessage(artist, data.entries()));
    setPrepared(true);
  }
  const minDate = useSyncExternalStore(subscribeDate, localDate, () => "");
  return (
    <form
      className="inquiry-form"
      onSubmit={prepare}
      onChange={(event) => {
        const input = event.target;
        if (input instanceof HTMLInputElement) input.setCustomValidity("");
        setPrepared(false);
        setPreview("");
      }}
    >
      <div className="form-heading">
        <span className="eyebrow gold">
          {artist ? "Artist introduction" : "Event inquiry"}
        </span>
        <h2>
          {artist ? "Let’s hear about you." : "Tell us what you’re planning."}
        </h2>
        <p>
          {artist
            ? "Share a little about your work. No uploads or account needed."
            : "A few details will help us recommend suitable services."}
        </p>
        <p className="form-hint">Fields marked * are required.</p>
      </div>
      <div className="form-grid">
        <label htmlFor="inquiry-name">
          {artist ? "Your name" : "Contact name"} *
          <input
            id="inquiry-name"
            name="Name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your name"
          />
        </label>
        <label htmlFor="inquiry-phone">
          Phone number *
          <input
            id="inquiry-phone"
            name="Phone"
            type="tel"
            autoComplete="tel"
            required
            title="Enter 7 to 15 digits, with an optional country prefix."
            placeholder="+91 98765 43210"
          />
        </label>
        {artist ? (
          <>
            <label htmlFor="inquiry-stage">
              Stage name
              <input
                id="inquiry-stage"
                name="Stage name"
                maxLength={100}
                placeholder="If different from your name"
              />
            </label>
            <label htmlFor="inquiry-category">
              Performance category *
              <select
                id="inquiry-category"
                name="Category"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option>Singer / vocalist</option>
                <option>Live band</option>
                <option>Instrumentalist</option>
                <option>DJ / electronic</option>
                <option>Anchor / MC</option>
                <option>Other</option>
              </select>
            </label>
            <label className="full-field" htmlFor="inquiry-portfolio">
              Portfolio or performance link *
              <input
                id="inquiry-portfolio"
                name="Portfolio"
                type="url"
                required
                maxLength={500}
                placeholder="https://youtube.com/…"
              />
              <span className="form-hint">
                A public video, website, or social profile showcasing your work.
              </span>
            </label>
          </>
        ) : (
          <>
            <label htmlFor="inquiry-date">
              Event date
              <input
                id="inquiry-date"
                name="Event date"
                type="date"
                min={minDate}
              />
              <span className="form-hint">
                Leave blank if your date is flexible.
              </span>
            </label>
            <label htmlFor="inquiry-type">
              Event type *
              <select
                id="inquiry-type"
                name="Event type"
                required
                defaultValue={
                  [
                    "Wedding / reception",
                    "Corporate event",
                    "Private party",
                    "Venue performance",
                    "Other",
                  ].includes(initialEvent)
                    ? initialEvent
                    : ""
                }
              >
                <option value="" disabled>
                  Select an event type
                </option>
                <option>Wedding / reception</option>
                <option>Corporate event</option>
                <option>Private party</option>
                <option>Venue performance</option>
                <option>Other</option>
              </select>
            </label>
            <label htmlFor="inquiry-city">
              Event city *
              <input
                id="inquiry-city"
                name="City"
                autoComplete="address-level2"
                required
                maxLength={100}
                placeholder="City and venue, if known"
              />
            </label>
            <label htmlFor="inquiry-budget">
              Event budget
              <select
                id="inquiry-budget"
                name="Budget"
                defaultValue="Not decided yet"
              >
                <option>Not decided yet</option>
                <option>Under ₹15,000</option>
                <option>₹15,000–₹30,000</option>
                <option>₹30,000–₹60,000</option>
                <option>₹60,000+</option>
              </select>
            </label>
            <label className="full-field" htmlFor="inquiry-style">
              Preferred service / performance
              <input
                id="inquiry-style"
                name="Service / performance"
                defaultValue={initialStyle}
                maxLength={120}
                placeholder="Acoustic, live band, DJ, or help me choose"
              />
            </label>
          </>
        )}
        {artist && (
          <label className="full-field" htmlFor="artist-city">
            Your city *
            <input
              id="artist-city"
              name="City"
              required
              maxLength={100}
              autoComplete="address-level2"
              placeholder="Where are you based?"
            />
          </label>
        )}
        <label className="full-field" htmlFor="inquiry-notes">
          {artist
            ? "Anything else about your work?"
            : "Anything else we should know?"}
          <textarea
            id="inquiry-notes"
            name="Notes"
            defaultValue={
              initialOccasion
                ? `Occasion: ${initialOccasion.slice(0, 100)}`
                : ""
            }
            rows={3}
            maxLength={1000}
            placeholder={
              artist
                ? "Languages, genres, and performance experience"
                : "Guest count, coverage needs, preferred music, or venue details"
            }
          />
        </label>
      </div>
      <p className="privacy-note">
        Your details stay in this form until you choose to open WhatsApp. Review
        the prepared message, then press Send in WhatsApp to contact our team.{" "}
        {artist
          ? "This is an introduction, not a confirmed listing."
          : "An inquiry does not confirm a booking."}
      </p>
      <button type="submit" className="action action-gold">
        Review inquiry <ArrowUpRight size={18} />
      </button>
      {prepared && (
        <div className="message-preview" role="status">
          <h3>Your message is ready to review</h3>
          <pre>{preview}</pre>
          <a
            className="action action-gold"
            href={whatsappLink(preview)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open WhatsApp to send <ArrowUpRight size={18} />
          </a>
          <p>
            Nothing has been sent yet. If WhatsApp doesn’t open, call us using
            the number below.
          </p>
        </div>
      )}
    </form>
  );
}
