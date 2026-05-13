import { motion } from 'framer-motion';

const stats = [
  { label: 'Learning', value: 'Improving ML and development skills.' },
  { label: 'Interest', value: 'Applying ML to real problems.' },
  { label: 'Approach', value: 'Simple and practical problem-solving.' }
];

function About() {
  return (
    <section id="about" className="section-container">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="section-heading">About</span>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Working with data and ML… still learning, still confused sometimes.</h2>
          <p className="mt-6 max-w-xl text-lg text-slate-300 leading-8">
            A certified overthinker who enjoys data and machine learning...
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="card-panel rounded-3xl p-6">
                <p className="text-sm uppercase tracking-[0.22em] text-brand">{stat.label}</p>
                <p className="mt-4 text-base leading-7 text-slate-300">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className="relative overflow-hidden rounded-xl border border-brand/20 bg-white/5 shadow-lg"
        >
          <img
            src="/GitHub PP - Copy.png"
            alt="About profile"
            className="h-full w-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-8 flex flex-col justify-end">
            <div className="rounded-[2rem] bg-black/70 p-6 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-brand">Profile</p>
              <div className="mt-5 space-y-4 text-lg leading-8 text-slate-100">
                <p>Making data less confusing, one project at a time.</p>
                <p>Enjoys working with people and figuring things out together.</p>
                 </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
