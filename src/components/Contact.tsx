import { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: 'email',
      label: 'Email',
      value: 'faiqhilman97@gmail.com',
      href: 'mailto:faiqhilman97@gmail.com',
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+60 19-271 3447',
      href: 'tel:+60192713447',
    },
    {
      icon: 'location_on',
      label: 'Location',
      value: 'Kuala Lumpur, Malaysia',
      href: null,
    },
  ];

  const socials = [
    {
      icon: 'code',
      label: 'GitHub',
      href: 'https://github.com/faiqhilman13',
    },
    {
      icon: 'work',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/faiqhilman/',
    },
  ];

  return (
    <section id="contact" className="relative">
      <div className="container">
        <div className="reveal">
          <span className="section-tag">// Contact</span>
          <h2 className="section-title">
            Let's
            <br />
            <span className="text-[var(--accent-crimson)]">Connect</span>
          </h2>
          <p className="section-desc">
            Open to opportunities, collaborations, and technical conversations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          {/* Left - Contact Info */}
          <div className="reveal delay-100">
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-8">Contact Information</h3>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--accent-crimson)]">
                      <span className="material-icons">{item.icon}</span>
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[var(--text-primary)] hover:text-[var(--accent-crimson)] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-[var(--text-primary)]">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] block mb-4">
                  Connect Online
                </span>
                <div className="flex gap-4">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-crimson)] hover:text-[var(--accent-crimson)] transition-all"
                    >
                      <span className="material-icons text-lg">{social.icon}</span>
                      <span className="font-mono text-sm">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="reveal delay-200">
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-8">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] block mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] block mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] block mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Your message..."
                    required
                    className="resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <span className="material-icons text-base">send</span>
                    </>
                  )}
                </button>

                {submitSuccess && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 text-center">
                    <span className="font-mono text-sm">Message sent successfully!</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
