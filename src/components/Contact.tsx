import React, { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 4 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="brutalist-section">
        {/* Brutalist Header */}
        <div className="text-center mb-16">
          <p className="text-sm italic text-gray-500 mb-2">(05 GET IN TOUCH)</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-black mb-4">
            CONTACT <span className="text-yellow-300">ME</span>
          </h2>
          <div className="brutalist-accent-line mx-auto mb-8"></div>
          <p className="text-xl font-mono text-black max-w-3xl mx-auto">
            Let's discuss opportunities, collaborations, or technology conversations.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="brutalist-grid mb-16">
          {/* Contact Information */}
          <div className="md:col-span-6">
            <div className="brutalist-block brutalist-hover">
              <h3 className="brutalist-subheading text-yellow-300">CONTACT INFO</h3>
              <div className="brutalist-accent-line-sm mb-6"></div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold uppercase mb-2">EMAIL</h4>
                  <a
                    href="mailto:faiqhilman97@gmail.com"
                    className="font-mono hover:text-yellow-300 transition-colors border-2 border-black px-3 py-1 inline-block"
                  >
                    faiqhilman97@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="text-lg font-bold uppercase mb-2">PHONE</h4>
                  <a
                    href="tel:+60192713447"
                    className="font-mono hover:text-yellow-300 transition-colors border-2 border-black px-3 py-1 inline-block"
                  >
                    +60 19-271 3447
                  </a>
                </div>

                <div>
                  <h4 className="text-lg font-bold uppercase mb-2">LOCATION</h4>
                  <p className="font-mono border-2 border-black px-3 py-1 inline-block">
                    Kuala Lumpur, Malaysia
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-bold uppercase mb-3">CONNECT ONLINE</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/faiqhilman13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-button-secondary"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                    GITHUB
                  </a>
                  <a
                    href="https://www.linkedin.com/in/faiqhilman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-button-secondary"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={16} />
                    LINKEDIN
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-6">
            <div className="brutalist-block brutalist-hover-reverse">
              <h3 className="brutalist-subheading text-yellow-300">SEND MESSAGE</h3>
              <div className="brutalist-accent-line-sm mb-6"></div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-black font-mono focus:outline-none focus:bg-yellow-300 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-black font-mono focus:outline-none focus:bg-yellow-300 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-black font-mono focus:outline-none focus:bg-yellow-300 transition-colors resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full brutalist-button disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>

                {submitSuccess && (
                  <div className="border-2 border-black bg-yellow-300 text-black p-4">
                    <p className="font-bold text-center uppercase">
                      ✓ MESSAGE SENT SUCCESSFULLY
                    </p>
                    <p className="font-mono text-sm text-center mt-1">
                      I'll get back to you soon!
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer Contact Grid */}
        <div className="brutalist-grid-3">
          <div className="brutalist-block brutalist-hover">
            <h4 className="text-lg font-bold uppercase mb-2">BUSINESS</h4>
            <p className="font-mono text-sm mb-3">Enterprise AI consulting</p>
            <p className="font-mono text-sm mb-3">Partnership opportunities</p>
            <p className="font-mono text-sm mb-3">Technical collaboration</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>

          <div className="brutalist-block brutalist-hover-reverse">
            <h4 className="text-lg font-bold uppercase mb-2">COLLABORATION</h4>
            <p className="font-mono text-sm mb-3">Open source projects</p>
            <p className="font-mono text-sm mb-3">Technical discussions</p>
            <p className="font-mono text-sm mb-3">Knowledge sharing</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>

          <div className="brutalist-block brutalist-hover">
            <h4 className="text-lg font-bold uppercase mb-2">AVAILABILITY</h4>
            <p className="font-mono text-sm mb-3">Consulting projects</p>
            <p className="font-mono text-sm mb-3">Speaking engagements</p>
            <p className="font-mono text-sm mb-3">Mentorship opportunities</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};