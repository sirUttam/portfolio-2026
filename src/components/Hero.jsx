import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import CatPointer from './CatPointer';

function Hero() {
  return (
    <section id="home" className="bg-black">
      <div className="section-container min-h-[calc(100vh-88px)] grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-brand/20 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.24em] text-brand shadow-glow">
            <span className="h-2.5 w-2.5 rounded-full bg-brand" />
            Data Analyst Portfolio
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Hi, I’m Uttam Aryal
            </h1>
            <p className="text-xl font-semibold text-brand sm:text-2xl">
              Data Analyst | Machine Learning Enthusiast | Python Developer
            </p>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I build data-driven solutions using Python, SQL, and Machine Learning.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <ScrollLink
              to="projects"
              smooth={true}
              duration={700}
              offset={-88}
              className="inline-flex items-center justify-center rounded-3xl bg-brand px-7 py-3 text-base font-semibold text-slate-950 transition hover:bg-lime-400"
            >
              View Projects
            </ScrollLink>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-7 py-3 text-base font-semibold text-white transition hover:border-brand hover:text-brand"
              download
            >
              Download Resume
            </a>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={700}
              offset={-88}
              className="inline-flex items-center justify-center rounded-3xl border border-brand/30 bg-black/60 px-7 py-3 text-base font-semibold text-brand transition hover:bg-brand hover:text-slate-950"
            >
              Contact
            </ScrollLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <CatPointer />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
