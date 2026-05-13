import { motion } from 'framer-motion';
import { projects } from '../data/projects';

function Projects() {
  return (
    <section id="projects" className="section-container">
      <div className="mb-12">
        <span className="section-heading">Featured Projects</span>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">High-impact work built for performance and clarity.</h2>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-glow"
          >
            <div className="mb-6 h-52 rounded-[1.75rem] bg-slate-900/80 p-6 text-white shadow-inner">
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-5">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-sm uppercase tracking-[0.24em] text-brand">Featured</span>
                  <h3 className="text-3xl font-semibold">{project.title}</h3>
                </div>
                <p className="text-base leading-7 text-slate-300">{project.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-slate-300">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{tag}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.github}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-base text-slate-200 transition hover:border-brand hover:text-brand"
              >
                GitHub
              </a>
              <a
                href={project.demo}
                className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-lime-400"
              >
                Live Demo
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
