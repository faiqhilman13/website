export const HeroVoid: React.FC = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center">
      <div className="container relative z-20 pt-28 pb-16">
        <div className="max-w-4xl">
          <div className="hero-pill reveal visible mb-10">The Observer // Precision Calibrated</div>
          <h1 className="hero-title-void reveal visible">
            Precision
            <br />
            <span>In Emptiness</span>
          </h1>
          <div className="void-divider reveal visible" />
          <p className="hero-sub-void reveal visible max-w-2xl">
            The most elegant systems leave no trace. Every interface, model, and pipeline
            refined until only what matters remains — deployed in the quiet certainty of
            something that works.
          </p>
          <div className="reveal visible flex flex-wrap gap-5 mt-12">
            <a href="#projects" className="btn-primary">
              Enter the Work
            </a>
            <a href="#contact" className="btn-secondary">
              Open Inquiry
            </a>
          </div>
          <div className="void-data-row reveal visible">
            <div>
              <strong>30K+</strong>
              <span>Lives Reached</span>
            </div>
            <div>
              <strong>RM10M+</strong>
              <span>Program Scale</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Core Systems</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
