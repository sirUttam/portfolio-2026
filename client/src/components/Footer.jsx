import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/95 py-6 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Uttam Aryal</p>
          <p className="mt-1 text-sm text-slate-300">Data Science | Machine Learning | Python Developer</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="#" className="transition hover:text-brand">Home</a>
          <a href="#about" className="transition hover:text-brand">About</a>
          <a href="#projects" className="transition hover:text-brand">Projects</a>
          <a href="#contact" className="transition hover:text-brand">Contact</a>
        </div>
        <div className="flex items-center gap-3 text-lg text-slate-300">
          <a href="https://github.com/sirUttam" className="transition hover:text-brand"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/uttam-aryal-78a6bb324/" className="transition hover:text-brand"><FaLinkedin /></a>
          <a href="mailto:aryaluttam365@gmail.com" className="transition hover:text-brand"><FaEnvelope /></a>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-7xl border-t border-white/10 px-6 pt-4 text-center text-sm text-slate-500">
        © 2026 <a href="https://www.facebook.com/share/1EF7Hk3DoX/" className="text-white transition hover:text-brand">Uttam Aryal.</a> Made with 90% AI, 10% "it works, don't ask how"
      </div>
    </footer>
  );
}

export default Footer;
