import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as ScrollLink, Events } from 'react-scroll';

const navLinks = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Journey', to: 'journey' },
  { label: 'Contact', to: 'contact' }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    Events.scrollEvent.register('begin', () => setMenuOpen(false));
    return () => Events.scrollEvent.remove('begin');
  }, []);

  return (
    <header className="relative sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl bg-black/80 shadow-black/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="#home" className="inline-flex items-center gap-3 text-xl font-semibold tracking-[0.24em] text-white sm:text-2xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand shadow-glow">
            UA
          </span>
          <span className="hidden sm:inline">Uttam Aryal</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              duration={600}
              offset={-88}
              className={`cursor-pointer text-lg font-semibold transition ${activeSection === link.to ? 'text-brand' : 'text-slate-300 hover:text-brand'}`}
              onSetActive={() => setActiveSection(link.to)}
            >
              {link.label}
            </ScrollLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:border-brand hover:text-brand"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-6 shadow-xl lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                duration={600}
                offset={-88}
                className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-brand hover:text-brand"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
