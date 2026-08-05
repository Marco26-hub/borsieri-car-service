const socialProfiles = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/carrozzeriaborsieri/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/borsiericar/",
  },
];

export default function SocialLinks() {
  return (
    <div className="footer-social" aria-label="Profili social Borsieri Car Service">
      <strong>Seguici sui social</strong>
      <div>
        {socialProfiles.map((profile) => (
          <a href={profile.href} key={profile.label} rel="noreferrer" target="_blank">
            {profile.label}
          </a>
        ))}
      </div>
    </div>
  );
}
