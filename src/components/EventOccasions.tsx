import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
const occasions = [
  {
    name: "Weddings",
    photo: "wedding-celebration",
    alt: "Wedding celebration beneath a flower-covered canopy",
    text: "From the first welcome to the last dance.",
    type: "Wedding / reception",
  },
  {
    name: "Private celebrations",
    photo: "celebration-toast",
    alt: "Guests raising glasses in a warm-lit toast",
    text: "Good company. A soundtrack to match.",
    type: "Private party",
  },
  {
    name: "Birthdays",
    photo: "birthday-celebration",
    alt: "Birthday cake with lit candles at a celebration",
    text: "Another year. An occasion worth singing about.",
    type: "Private party",
  },
  {
    name: "Concerts & festivals",
    photo: "concert-lights",
    alt: "Audience raising their hands at a red-lit concert",
    text: "Big crowds and bigger moments.",
    type: "Other",
  },
  {
    name: "College events",
    photo: "rock-band",
    alt: "Rock band with guitars and drums performing on stage",
    text: "Bring the campus together with live music.",
    type: "Other",
  },
];
export function EventOccasions() {
  return (
    <section
      className="section wrap occasion-section"
      aria-labelledby="occasions-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow gold">Whatever you’re celebrating</p>
          <h2 id="occasions-heading">
            Your people.
            <br />
            <em>Your occasion.</em>
          </h2>
        </div>
        <p>
          Choose the kind of gathering you have in mind. We’ll help you think
          through the music.
        </p>
      </div>
      <div className="occasion-grid">
        {occasions.map((o) => (
          <Link
            className="occasion-card"
            key={o.name}
            href={`/booking?event=${encodeURIComponent(o.type)}&occasion=${encodeURIComponent(o.name)}`}
          >
            <Image
              src={`/photos/${o.photo}.webp`}
              alt={o.alt}
              fill
              sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 33vw"
            />
            <div>
              <h3>
                {o.name}
                <ArrowUpRight size={20} />
              </h3>
              <p>{o.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
