import { motion } from 'framer-motion';
import { journeyItems } from '../data/journey';

function Journey() {
  return (
    <section id="journey" className="section-container">
      <div className="mb-12">
        <span className="section-heading">Journey</span>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Progress, struggles, and learning.</h2>
      </div>

      <div className="relative border-l border-white/10 pl-8">
        {journeyItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
            className="mb-12 last:mb-0"
          >
            <div className="absolute -left-6 top-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xs font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-glow">
              {item.year}
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-panel">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-slate-300 leading-7">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Journey;
