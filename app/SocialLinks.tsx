import { ArrowUpRight } from "lucide-react";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

const socialProfiles = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/carrozzeriaborsieri/",
    icon: FaFacebookF,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/borsiericar/",
    icon: FaInstagram,
  },
] satisfies Array<{ id: string; label: string; href: string; icon: IconType }>;

export default function SocialLinks() {
  return (
    <div className="footer-social" aria-label="Profili social Borsieri Car Service">
      <div className="footer-social-heading">
        <span>Community Borsieri</span>
        <strong>Seguici sui social</strong>
      </div>
      <div className="footer-social-links">
        {socialProfiles.map(({ href, icon: Icon, id, label }) => (
          <a
            className={`footer-social-link is-${id}`}
            href={href}
            key={label}
            rel="noreferrer"
            target="_blank"
          >
            <span className="footer-social-icon" aria-hidden="true">
              <Icon size={18} />
            </span>
            <span className="footer-social-copy">
              <small>Seguici su</small>
              <strong>{label}</strong>
            </span>
            <ArrowUpRight className="footer-social-arrow" size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
