export const Footer: React.FC = () => {
  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  const socials = [
    { href: 'https://github.com/faiqhilman13', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/faiqhilman/', label: 'LinkedIn' },
    { href: 'mailto:faiqhilman97@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-void)] relative z-20">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-[var(--accent-crimson)]" />
              <span className="font-mono text-sm font-semibold tracking-[0.15em] uppercase">
                Faiq Hilman
              </span>
            </a>
            <p className="text-[var(--text-secondary)] max-w-sm">
              Applied AI Engineer shipping production LLM systems. Building the future of
              software, one orchestration at a time.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-crimson)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-crimson)] transition-colors"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Faiq Hilman. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            SYSTEM_v1.0 // INITIALIZED
          </p>
        </div>
      </div>
    </footer>
  );
};
