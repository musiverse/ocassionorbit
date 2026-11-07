import { PerformanceCategories } from "@/components/PerformanceCategories";
import Link from "next/link";
export const metadata = { title: "Find your sound | OccasionOrbit" };
export default function EventsPage() {
  return (
    <main id="main-content" className="wrap page-main">
      <p className="eyebrow gold">Explore performances</p>
      <h1>
        Find your
        <br />
        <em>kind of live.</em>
      </h1>
      <p className="page-intro">
        An intimate acoustic set or a full dance floor? Choose a performance
        style, then ask us for artists and samples that fit your event.
      </p>
      <PerformanceCategories extended />
      <div className="info-panel">
        <h2>Real options for your event.</h2>
        <p>
          These are performance categories, not individual artist listings.
          Contact us for current availability, performance clips, and a tailored
          quote.
        </p>
        <Link href="/booking" className="text-link">
          Not sure where to start? Tell us your plans →
        </Link>
      </div>
    </main>
  );
}
