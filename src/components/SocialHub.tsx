import { InstagramIcon, XIcon, DiscordIcon, YoutubeIcon } from "./SocialIcons";
const channels = [
  {
    name: "Instagram",
    handle: "@OccasionOrbit",
    icon: InstagramIcon,
    description: "Performance highlights and moments from the stage.",
  },
  {
    name: "Discord",
    handle: "Orbit HQ",
    icon: DiscordIcon,
    description: "A greenroom for artists and the event community.",
  },
  {
    name: "YouTube",
    handle: "Orbit Originals",
    icon: YoutubeIcon,
    description: "Live captures, artist stories, and performance inspiration.",
  },
  {
    name: "X",
    handle: "@Occasion_Orbit",
    icon: XIcon,
    description: "Updates from the OccasionOrbit community.",
  },
];
export function SocialHub() {
  return (
    <section
      className="section wrap community-section"
      id="community"
      aria-labelledby="community-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow gold">Connected circuit</p>
          <h2 id="community-heading">
            The orbit
            <br />
            <em>never sleeps.</em>
          </h2>
        </div>
        <p>
          A place for artists, audiences, and event hosts to connect beyond the
          performance.
        </p>
      </div>
      <div className="community-grid">
        {channels.map(({ name, handle, icon: Icon, description }) => (
          <article key={name}>
            <Icon className="community-icon" />
            <h3>{name}</h3>
            <p className="community-handle">{handle}</p>
            <p>{description}</p>
            <span className="channel-status">Channel link coming soon</span>
          </article>
        ))}
      </div>
    </section>
  );
}
