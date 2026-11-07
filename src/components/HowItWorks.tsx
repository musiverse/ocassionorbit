import Link from "next/link";
import {
  UserRound,
  Video,
  ShieldCheck,
  CircleDollarSign,
  ArrowUpRight,
} from "lucide-react";
const steps = [
  {
    icon: UserRound,
    title: "Identity",
    description:
      "Create your artist profile with your name, stage name, category, and contact details.",
  },
  {
    icon: Video,
    title: "Portfolio",
    description:
      "Share your best photographs, performance videos, and links to your work.",
  },
  {
    icon: ShieldCheck,
    title: "Verification",
    description:
      "Our team reviews your profile and discusses verification and listing details with you.",
  },
  {
    icon: CircleDollarSign,
    title: "Potential",
    description:
      "Set your rate, explore performance opportunities, and grow your earning potential.",
  },
];
export function HowItWorks() {
  return (
    <section
      className="section artist-journey"
      id="artist-journey"
      aria-labelledby="artist-journey-heading"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow gold">From sign-up to your next stage</p>
            <h2 id="artist-journey-heading">
              How the app
              <br />
              <em>will work.</em>
            </h2>
          </div>
          <p>
            The original four-step artist journey: identity, portfolio,
            verification, and potential. App registration is coming soon;
            introduce yourself on the website in the meantime.
          </p>
        </div>
        <ol className="artist-journey-grid">
          {steps.map(({ icon: Icon, title, description }, i) => (
            <li key={title}>
              <div className="journey-top">
                <Icon size={24} />
                <span>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
        <Link className="text-link" href="/artists">
          Perform & earn — introduce yourself <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
