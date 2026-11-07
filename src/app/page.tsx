import Link from "next/link";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import { PerformanceCategories } from "@/components/PerformanceCategories";
import { GalleryLoader } from "@/components/GalleryLoader";
import { EventOccasions } from "@/components/EventOccasions";
import { AppExperience } from "@/components/AppExperience";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { SocialHub } from "@/components/SocialHub";
import { PhotographySection } from "@/components/PhotographySection";
export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="hero-photo" aria-hidden="true" />
        <div className="wrap hero-content">
          <p className="eyebrow gold">
            <span className="live-dot" /> Live music. Lasting memories.
          </p>
          <h1>
            Your occasion
            <br />
            Our artists
            <br />
            <em>One great night</em>
          </h1>
          <p className="hero-description">
            Book live musicians for your next event. Tell us the date, the
            place, and the feeling you’re after. We’ll help you find your sound.
          </p>
          <div className="action-row">
            <Link href="/events" className="action action-gold">
              Explore performances <ArrowUpRight size={18} />
            </Link>
            <Link href="/booking" className="action action-outline">
              Plan an event <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-notes">
            <span>
              <Check size={15} /> Weddings & celebrations
            </span>
            <span>
              <Check size={15} /> Corporate & private events
            </span>
          </div>
        </div>
        <div className="hero-bottom wrap">
          <span>A little music changes everything.</span>
          <span>SCROLL TO FIND YOUR SOUND ↓</span>
        </div>
      </section>
      <GalleryLoader />
      <section className="section wrap" id="performances">
        <div className="section-heading">
          <div>
            <p className="eyebrow gold">Find your sound</p>
            <h2>
              Every occasion has
              <br />
              <em>its own rhythm.</em>
            </h2>
          </div>
          <p>
            Start with a style you love. Ask our team for artist options,
            performance samples, and a quote for your event.
          </p>
        </div>
        <PerformanceCategories />
        <p className="section-note">
          Explore performance categories. Artist availability and pricing are
          confirmed individually by our team.
        </p>
      </section>
      <EventOccasions />
      <PhotographySection />
      <AppExperience />
      <HowItWorks />
      <TrustSection />
      <SocialHub />
      <section className="section process-section" id="how-it-works">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow gold">From first idea to final encore</p>
              <h2>
                Less planning.
                <br />
                <em>More celebrating.</em>
              </h2>
            </div>
            <Link href="/booking" className="text-link">
              Tell us about your event <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="steps-grid">
            {[
              {
                title: "Tell us your plans",
                text: "Share your date, city, event type, and budget. Still exploring? That’s a good place to start, too.",
              },
              {
                title: "Find the right fit",
                text: "Talk through artist options, repertoire, and performance samples with our team.",
              },
              {
                title: "Confirm the details",
                text: "Agree availability, pricing, timings, and setup needs with the team before you book.",
              },
            ].map((s, i) => (
              <article key={s.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="care-panel">
          <div>
            <p className="eyebrow gold">Good events start with clear details</p>
            <h2>
              Your questions.
              <br />
              <em>Answered upfront.</em>
            </h2>
            <p>
              Before confirming a performance, ask for the information that
              matters to your event.
            </p>
          </div>
          <ul>
            {[
              "Performance videos and repertoire",
              "Artist availability and a tailored quote",
              "Set length, breaks, and arrival time",
              "Sound equipment and venue requirements",
            ].map((t) => (
              <li key={t}>
                <Check size={19} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section wrap faq-section" id="faq">
        <p className="eyebrow gold">A few things you might be wondering</p>
        <h2>
          Before the <em>first note.</em>
        </h2>
        {[
          {
            q: "Which cities do you cover?",
            a: "Share your event city with us. Our team will confirm whether suitable artists are available for your location, including any travel requirements.",
          },
          {
            q: "How much does a performance cost?",
            a: "Pricing depends on the artist, date, location, set duration, and equipment. Send an inquiry for a quote tailored to your plans.",
          },
          {
            q: "Does an inquiry confirm my booking?",
            a: "No. The website prepares a WhatsApp message for you to review and send. Availability and all booking details must be agreed with our team.",
          },
          {
            q: "Can I join as a performer?",
            a: "Yes. Visit For artists to share your category and a link to your work. Our team can discuss next steps with you.",
          },
        ].map((x) => (
          <details key={x.q}>
            <summary>
              {x.q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{x.a}</p>
          </details>
        ))}
      </section>
      <section className="wrap closing-section">
        <p className="eyebrow gold">Make it an occasion to remember</p>
        <h2>
          Let’s set <em>the stage.</em>
        </h2>
        <p>Bring your ideas. We’ll talk music.</p>
        <Link href="/booking" className="action action-gold">
          Plan your event <ArrowUpRight size={18} />
        </Link>
      </section>
      <section className="wrap artist-strip">
        <div>
          <p className="eyebrow">For the people behind the music</p>
          <h3>Got a sound worth sharing?</h3>
          <p>Introduce yourself and share a link to your work.</p>
        </div>
        <Link className="action action-outline" href="/artists">
          Join as an artist <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
