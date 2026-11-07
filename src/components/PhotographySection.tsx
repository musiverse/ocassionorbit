import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const images = [
  { file: "event-camera", label: "Capture the conversation", alt: "Professional video camera recording a panel conversation at an event" },
  { file: "stage-camera", label: "Every angle of the stage", alt: "Video camera on a tripod facing a brightly lit event stage" },
  { file: "event-videographer", label: "Behind every memorable moment", alt: "Videographer operating a professional camera under blue event lighting" },
];

export function PhotographySection() {
  return (
    <section className="section wrap photography-section" id="photography-videography" aria-labelledby="photography-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow gold">Keep the memories</p>
          <h2 id="photography-heading">Photography &amp;<br /><em>Videography</em></h2>
        </div>
        <p>From the energy on stage to the moments in between. Tell us about your event and the photography or video coverage you have in mind.</p>
      </div>
      <div className="photography-grid">
        {images.map(image => (
          <figure key={image.file}>
            <div className="photography-image">
              <Image src={`/photos/${image.file}.webp`} alt={image.alt} fill sizes="(max-width: 700px) 92vw, 33vw" />
            </div>
            <figcaption><span>Photography &amp; Videography</span><h3>{image.label}</h3></figcaption>
          </figure>
        ))}
      </div>
      <div className="photography-enquiry">
        <p>Discuss coverage, availability, and a quote with our team.</p>
        <Link href="/booking?style=Photography%20%26%20Videography" className="action action-outline">Enquire about coverage <ArrowUpRight size={18} /></Link>
      </div>
    </section>
  );
}
