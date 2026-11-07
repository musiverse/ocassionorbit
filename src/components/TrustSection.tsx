const network = [
  "Sonic Orbit",
  "Bass Energy",
  "Orbital Flux",
  "Beat Nexus",
  "Pulse Collective",
  "Cloud Arena",
];
export function TrustSection() {
  return (
    <section
      className="section wrap platform-vision"
      aria-labelledby="vision-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow gold">The platform vision</p>
          <h2 id="vision-heading">
            A bigger stage.
            <br />
            <em>A connected orbit.</em>
          </h2>
        </div>
        <p>
          Artists, venues, and performance technology in one connected
          ecosystem. These are the ambitions behind the original OccasionOrbit
          platform.
        </p>
      </div>
      <div className="vision-grid">
        {[
          {
            value: "<5ms",
            title: "Streaming latency target",
            detail: "The original performance technology goal.",
          },
          {
            value: "1M+",
            title: "Artist network ambition",
            detail: "A long-term vision for a connected artist community.",
          },
          {
            value: "4K+",
            title: "Venue network ambition",
            detail: "A long-term vision for virtual and physical stages.",
          },
        ].map((s) => (
          <article key={s.title}>
            <strong>{s.value}</strong>
            <h3>{s.title}</h3>
            <p>{s.detail}</p>
          </article>
        ))}
      </div>
      <p className="section-note">
        Platform targets and concepts, rather than current operating results.
      </p>
      <div className="network-preview">
        <p className="eyebrow">
          Partner network concept · affiliations to be confirmed
        </p>
        <div>
          {network.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
