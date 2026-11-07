import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export const performanceCategories = [
  {
    name: "Acoustic & unplugged",
    tag: "Intimate. Warm. Personal.",
    description:
      "Stripped-back sets for smaller gatherings and relaxed evenings.",
    photo: "acoustic-gathering",
    alt: "Friends listening to an acoustic guitar performance under string lights",
  },
  {
    name: "Live bands",
    tag: "A room full of energy.",
    description:
      "A full-band sound for celebrations and events with a bigger stage.",
    photo: "outdoor-band",
    alt: "Guitarists and a drummer performing on an outdoor stage",
  },
  {
    name: "Singers & vocalists",
    tag: "A voice for your occasion.",
    description: "Find the right vocal style and repertoire for your guests.",
    photo: "ghazal",
    alt: "A vocalist with harmonium and accompanying musicians on stage",
  },
  {
    name: "DJs & electronic",
    tag: "Keep the night moving.",
    description: "Dance-floor sets for parties and after-hours moments.",
    photo: "festival-crowd",
    alt: "Festival crowd silhouetted against a bright pink stage",
  },
  {
    name: "Sufi & qawwali",
    tag: "Soulful. Stirring. Together.",
    description:
      "Expressive vocals and ensemble performances for a soulful evening.",
    photo: "qawwali",
    alt: "Qawwali singers performing together with harmoniums",
  },
  {
    name: "Indian classical",
    tag: "Timeless by tradition.",
    description:
      "Classical vocal and instrumental performances for attentive listening.",
    photo: "classical-vocals",
    alt: "Classical vocalists accompanied by string instruments and harmonium",
  },
  {
    name: "Folk music",
    tag: "Stories in every song.",
    description:
      "Regional sounds and traditional ensembles for vibrant celebrations.",
    photo: "folk-vocals",
    alt: "Folk vocalist wearing a colourful turban and singing into a microphone",
  },
  {
    name: "Devotional music",
    tag: "Music that brings us together.",
    description:
      "Devotional singing and live accompaniment for shared gatherings.",
    photo: "devotional",
    alt: "Devotional singers and listeners gathered around a harmonium",
  },
];
export function PerformanceCategories({
  extended = false,
}: {
  extended?: boolean;
}) {
  return (
    <div className="category-grid">
      {(extended
        ? performanceCategories
        : performanceCategories.slice(0, 4)
      ).map(({ name, tag, description, photo, alt }) => (
        <article className="category-card" key={name}>
          <Link
            className="category-photo"
            href={`/booking?style=${encodeURIComponent(name)}`}
            aria-label={`Explore ${name}`}
          >
            <Image
              src={`/photos/${photo}.webp`}
              alt={alt}
              fill
              sizes="(max-width: 520px) 90vw, (max-width: 1100px) 45vw, 25vw"
            />
          </Link>
          <div className="category-copy">
            <p className="eyebrow">{tag}</p>
            <h3>{name}</h3>
            <p>{description}</p>
            <Link
              className="text-link"
              href={`/booking?style=${encodeURIComponent(name)}`}
            >
              Request options <ArrowUpRight size={17} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
