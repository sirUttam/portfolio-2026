import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <section id="contact" className="section-container">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="section-heading">Contact</span>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Let’s build something impactful together.</h2>
          <p className="mt-6 max-w-xl text-slate-300 leading-7">
            Whether you have a project idea, career opportunity, or curious question, I’m ready to connect and collaborate.
          </p>
          <div className="mt-10 space-y-4 text-slate-300">
            <a href="https://github.com/sirUttam" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm transition hover:border-brand hover:text-brand">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/uttam-aryal-78a6bb324/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm transition hover:border-brand hover:text-brand">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="mailto:uttam.info006@gmail.com" className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm transition hover:border-brand hover:text-brand">
              <FaEnvelope /> Email
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="card-panel rounded-[2rem] p-8"
        >
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">Message</label>
            <textarea
              rows="5"
              placeholder="Tell me about your project or idea"
              className="w-full rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-3xl bg-brand px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-lime-400"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
