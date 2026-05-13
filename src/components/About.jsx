import { motion } from 'framer-motion';

const stats = [
  { label: 'Experience Growth', value: 'Strong analytical and production-grade skill development.' },
  { label: 'Passion for ML', value: 'Dedicated to practical machine learning that powers decisions.' },
  { label: 'Problem Solving', value: 'Focused on real problems and data-driven solutions.' }
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
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">A developer focused on data analytics and machine learning.</h2>
          <p className="mt-6 max-w-xl text-lg text-slate-300 leading-8">
            I’m a developer focused on data analytics and machine learning. I enjoy building practical solutions that solve real-world problems and continuously improve my technical depth.
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
          className="relative card-panel rounded-[2.75rem] border-brand/10 p-0 shadow-panel overflow-hidden"
        >
          <img
            src="/GitHub PP.png"
            alt="About profile"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-8 flex flex-col justify-end">
            <div className="rounded-[2rem] bg-black/70 p-6 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-brand">Profile</p>
              <div className="mt-5 space-y-4 text-lg leading-8 text-slate-100">
                <p>Experienced in designing polished analytics experiences with an emphasis on clarity, reliability, and scalable data architecture.</p>
                <p>Strong communicator who enjoys collaborating across product, engineering, and data teams to deliver measurable impact.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
